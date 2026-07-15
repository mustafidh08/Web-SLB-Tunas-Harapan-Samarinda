import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKegiatanBySlug, getAllKegiatanSlugs, formatTanggalID } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, ArrowLeft, Tag, Share2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params agar semua halaman detail di-pre-render (SSG)
export async function generateStaticParams() {
  const slugs = getAllKegiatanSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getKegiatanBySlug(slug);
  if (!post) return {};
  
  return {
    title: post.judul,
    description: post.ringkasan,
  };
}

export default async function DetailKegiatanPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getKegiatanBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gray-100 pt-40 pb-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-3">
            <Link 
              href="/kegiatan" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-mid)] hover:text-[var(--color-primary)] transition-colors self-start"
            >
              <ArrowLeft size={12} /> Kembali ke Berita
            </Link>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="badge badge-red">{post.kategori}</span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-light)]">
                <Calendar size={12} />
                <span>{formatTanggalID(post.tanggal)}</span>
              </div>
            </div>
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-dark)] leading-tight mt-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.judul}
            </h1>
          </div>
        </div>
      </section>

      {/* DETAIL CONTENT */}
      <section className="section-py bg-white">
        <div className="container-custom max-w-3xl">
          {/* Main Cover Image */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md mb-8 bg-gray-50">
            <Image
              src={post.foto}
              alt={post.judul}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          </div>

          {/* Article Body */}
          <article className="prose-slb prose max-w-none" role="main">
            <MDXRemote source={post.konten} />
          </article>

          {/* Share/Actions bar */}
          <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--color-text-mid)]">
            <div className="flex items-center gap-2 text-xs">
              <Tag size={12} className="text-[var(--color-text-light)]" />
              <span className="font-semibold">Kategori:</span>
              <span className="text-[var(--color-primary)] font-medium">{post.kategori}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Bagikan artikel ini"
              >
                <Share2 size={12} />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          {/* CTA di bawah berita */}
          <div className="bg-[var(--color-accent-tint)] border border-amber-100 rounded-2xl p-6 mt-12 text-center space-y-4">
            <h2 className="font-bold text-base text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Ingin berkunjung atau menanyakan pendaftaran?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-mid)]">
              Hubungi tim pengajar dan pihak administrasi SLB Tunas Harapan melalui kontak WhatsApp kami.
            </p>
            <div className="pt-2">
              <Button variant="primary" href="/kontak" className="text-xs py-2 px-4">
                Hubungi Kontak Kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
