/**
 * Utility untuk mengompres dan mengonversi gambar dari HP/Laptop menjadi format WebP berukuran ringan (WebP)
 * sebelum dikirimkan ke server / GitHub API.
 */
export async function convertAndCompressToWebP(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<{ base64: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Hitung rasio resize jika lebih besar dari maxWidth/maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Gambar ulang di Canvas HTML5
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Gagal memproses canvas gambar"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Konversi ke WebP DataURL
        const webpBase64 = canvas.toDataURL("image/webp", quality);
        const originalNameName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
        const webpFileName = `${originalNameName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.webp`;

        resolve({
          base64: webpBase64,
          fileName: webpFileName,
        });
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
}
