import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, ChevronRight, Sparkles, Tag, Search } from 'lucide-react';
import { BLOG_POSTS, KEYWORD_CATEGORY_GROUPS } from '../data/blogPosts';
import { SALES_AGENT_INFO } from '../data/packages';

interface BlogPreviewSectionProps {
  onOpenBlog: (slug?: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ onOpenBlog }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  // Take top 3 articles for homepage showcase
  const previewPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog-preview" className="py-20 bg-transparent border-t border-slate-200/60">
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
              Pelajari rincian tarif pasang baru promo 99K, review paket hemat Telkomsel One 148K, paket EZnet 20 Mbps 100 ribuan, daftar harga internet only 50-300 Mbps, dan panduan registrasi online resmi.
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
              className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
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
                  {post.keywords.slice(0, 3).map((kw, kwIdx) => (
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

        {/* Rich SEO Keyword Cloud & Directory Box */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-red-600" />
                Indeks Kata Kunci Pencarian Populer (Google SEO)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih topik di bawah untuk membaca artikel panduan resmi & cek promo paket:
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {KEYWORD_CATEGORY_GROUPS.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategoryIndex === idx
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword tags chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {KEYWORD_CATEGORY_GROUPS[activeCategoryIndex].keywords.map((kw, kwIdx) => (
              <button
                key={kwIdx}
                onClick={() => onOpenBlog()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:border-red-400 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer"
                title={`Cari artikel: ${kw}`}
              >
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{kw}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan kata kunci pencarian terverifikasi Google seputar IndiHome & Telkomsel.</span>
            <button
              onClick={() => onOpenBlog()}
              className="font-bold text-red-600 hover:text-red-700 transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              Buka Semua di Blog <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
