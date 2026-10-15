import React from 'react';
import { BookOpen, ArrowRight, Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SALES_AGENT_INFO } from '../data/packages';

interface BlogPreviewSectionProps {
  onOpenBlog: (slug?: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ onOpenBlog }) => {
  // Take top 3 articles for homepage showcase
  const previewPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog-preview" className="py-20 bg-slate-100/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Pusat Edukasi & Informasi Terkini</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artikel & Panduan Pasang Baru <span className="text-red-600">IndiHome 2026</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Pelajari rincian tarif pasang baru promo 99K, review paket hemat Telkomsel One 148K, perbandingan kecepatan, dan tips optimasi WiFi rumah agar tidak lemot.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBlog()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-xs hover:border-red-500 hover:text-red-600 transition-all cursor-pointer shrink-0 self-start md:self-auto group"
          >
            <BookOpen className="w-4 h-4 text-red-600" />
            <span>Lihat Semua Artikel Blog</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-red-600 transition-all" />
          </button>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onOpenBlog(post.slug)}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {post.excerpt}
                </p>

                {/* Keyword pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.keywords.slice(0, 2).map((kw, kwIdx) => (
                    <span
                      key={kwIdx}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar || SALES_AGENT_INFO.photoUrl}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    {post.author.name}
                  </span>
                </div>

                <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Baca Panduan <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Keyword Cloud Footer Box */}
        <div className="mt-10 p-5 rounded-2xl bg-white/70 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Topik Pencarian Populer:</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:border-red-400" onClick={() => onOpenBlog('biaya-pasang-baru-indihome-2026')}>
              Biaya Pasang IndiHome 2026
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:border-red-400" onClick={() => onOpenBlog('review-paket-eznet-telkomsel-148k')}>
              Paket Telkomsel One 148 Ribu
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:border-red-400" onClick={() => onOpenBlog('perbedaan-telkomsel-one-dan-indihome-reguler')}>
              Telkomsel One vs IndiHome
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 cursor-pointer hover:border-red-400" onClick={() => onOpenBlog('tips-mengatasi-wifi-lemot-di-rumah')}>
              Cara Mengatasi WiFi Lemot
            </span>
          </div>

          <button
            onClick={() => onOpenBlog()}
            className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            Kunjungi Halaman Blog Lengkap <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
