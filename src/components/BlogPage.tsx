import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  MessageCircle,
  TrendingUp,
  FileText,
  ShieldCheck,
  Check,
  Flame,
  ArrowRight
} from 'lucide-react';
import { BLOG_POSTS, ALL_SEO_KEYWORDS, KEYWORD_CATEGORY_GROUPS } from '../data/blogPosts';
import { SALES_AGENT_INFO } from '../data/packages';
import { BlogPost, BlogSection } from '../types';
import { createWhatsAppCustomUrl } from '../utils/helpers';

interface BlogPageProps {
  initialSlug?: string;
  onBackToHome: () => void;
  onOpenRegister: (packageId?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  initialSlug,
  onBackToHome,
  onOpenRegister,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeKeywordGroupIdx, setActiveKeywordGroupIdx] = useState<number>(0);
  const [showAllKeywords, setShowAllKeywords] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Sync when initialSlug or URL pathname (/blog/:slug) changes
  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog/')) {
      const pathSlug = window.location.pathname.replace('/blog/', '').trim();
      if (pathSlug) {
        setSelectedSlug(pathSlug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialSlug]);

  const activeArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return BLOG_POSTS.find((p) => p.slug === selectedSlug || p.id === selectedSlug) || null;
  }, [selectedSlug]);

  // Dynamic SEO Title & Schema.org JSON-LD structured data injection for articles
  useEffect(() => {
    if (activeArticle) {
      const originalTitle = document.title;
      document.title = `${activeArticle.title} | Vicky IndiHome Blog`;

      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      const originalDesc = metaDesc?.getAttribute('content') || '';
      if (metaDesc) {
        metaDesc.setAttribute('content', activeArticle.excerpt);
      }

      // Inject Schema.org Article structured data
      const scriptId = 'blog-post-jsonld';
      let existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: activeArticle.title,
        description: activeArticle.excerpt,
        keywords: activeArticle.keywords.join(', '),
        author: {
          '@type': 'Person',
          name: activeArticle.author.name,
          jobTitle: activeArticle.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vicky IndiHome Pusat',
          logo: {
            '@type': 'ImageObject',
            url: SALES_AGENT_INFO.photoUrl,
          },
        },
        datePublished: '2026-10-15',
        inLanguage: 'id-ID',
      });
      document.head.appendChild(script);

      return () => {
        document.title = originalTitle;
        if (metaDesc && originalDesc) {
          metaDesc.setAttribute('content', originalDesc);
        }
        const s = document.getElementById(scriptId);
        if (s) s.remove();
      };
    } else {
      document.title = 'Blog & Panduan Edukasi IndiHome 2026 | Vicky IndiHome Pusat';
    }
  }, [activeArticle]);

  // Extract all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((post) => set.add(post.category));
    return ['Semua', ...Array.from(set)];
  }, []);

  // Extract all unique keywords for tag cloud
  const allKeywords = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => {
      p.keywords.forEach((k) => set.add(k));
    });
    return Array.from(set).slice(0, 10);
  }, []);

  // Filtered posts for catalog view
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
      const matchTag =
        !selectedTag ||
        post.keywords.some((k) =>
          k.toLowerCase().includes(selectedTag.toLowerCase()) ||
          selectedTag.toLowerCase().includes(k.toLowerCase())
        );
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchTag && matchSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  }, []);

  const handleSelectArticle = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/blog/${slug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedSlug(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/blog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = (article: BlogPost) => {
    const text = `Baca artikel bermanfaat ini: "${article.title}" seputar info pasang IndiHome & Telkomsel One terbaru di https://vickyindihomepusat.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ------------------------------------------------------------------
  // RENDER: SINGLE ARTICLE READER VIEW
  // ------------------------------------------------------------------
  if (activeArticle) {
    const relatedArticles = BLOG_POSTS.filter((p) => p.slug !== activeArticle.slug).slice(0, 3);
    const consultMsg = `Halo Mas Vicky, saya baru saja membaca artikel "${activeArticle.title}" di blog website Anda. Saya ingin konsultasi ketersediaan promo dan pasang baru di alamat saya.`;
    const waArticleUrl = createWhatsAppCustomUrl(consultMsg, SALES_AGENT_INFO.whatsappNumber);

    return (
      <div className="min-h-screen bg-slate-50 pb-20 pt-24 sm:pt-28">
        {/* Article Breadcrumbs & Top Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              onClick={handleBackToCatalog}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Semua Artikel
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Salin tautan artikel"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleShareWhatsApp(activeArticle)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bagikan WA</span>
              </button>
            </div>
          </div>

          {/* Article Header Card */}
          <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200/60 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.publishDate}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {activeArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 pb-6 border-b border-slate-100">
              {activeArticle.excerpt}
            </p>

            {/* Author Byline Box */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 mb-8">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar || SALES_AGENT_INFO.photoUrl}
                  alt={activeArticle.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      Ditulis oleh {activeArticle.author.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                  </div>
                  <p className="text-xs text-slate-500">
                    {activeArticle.author.role} • Mitra Resmi PT Telkom Indonesia
                  </p>
                </div>
              </div>

              <a
                href={waArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-transform active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Tanya Penulis via WA
              </a>
            </div>

            {/* Table of Contents if available */}
            {activeArticle.content.tableOfContents && (
              <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Daftar Isi Panduan:</span>
                </div>
                <ul className="space-y-2">
                  {activeArticle.content.tableOfContents.map((item, idx) => (
                    <li key={item.id} className="text-xs sm:text-sm">
                      <a
                        href={`#${item.id}`}
                        className="text-slate-700 hover:text-red-600 font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Article Body Sections */}
            <div className="prose prose-slate max-w-none text-slate-700 space-y-8 leading-relaxed">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
                {activeArticle.content.intro}
              </p>

              {activeArticle.content.sections.map((section: BlogSection, idx: number) => (
                <section key={idx} id={section.id} className="scroll-mt-28 space-y-4 pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span className="w-2 h-6 bg-red-600 rounded-full shrink-0"></span>
                    <span>{section.title}</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {section.content}
                  </p>

                  {/* Optional Highlight Box */}
                  {section.highlightBox && (
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border ${
                        section.highlightBox.type === 'promo'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : section.highlightBox.type === 'tip'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-blue-50 border-blue-200 text-blue-900'
                      }`}
                    >
                      <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2">
                        {section.highlightBox.type === 'promo' ? (
                          <Flame className="w-4 h-4 text-rose-600" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                        )}
                        {section.highlightBox.title}
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                        {section.highlightBox.text}
                      </p>
                    </div>
                  )}

                  {/* Optional Comparison Table */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-900 text-white font-bold">
                          <tr>
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="p-3 sm:p-4">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 sm:p-4 text-slate-800 font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Optional Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* In-Article FAQ Accordion */}
              {activeArticle.content.faq && activeArticle.content.faq.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-200 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-red-600" />
                    Pertanyaan yang Sering Diajukan (FAQ)
                  </h3>
                  <div className="space-y-3">
                    {activeArticle.content.faq.map((item, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-2xl border border-slate-200 overflow-hidden bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqIndex(expandedFaqIndex === fIdx ? null : fIdx)}
                          className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 cursor-pointer"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${
                              expandedFaqIndex === fIdx ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFaqIndex === fIdx && (
                          <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conclusion */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <h3 className="font-bold text-base mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Kesimpulan & Ringkasan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {activeArticle.content.conclusion}
                </p>
                {activeArticle.content.ctaNote && (
                  <p className="text-xs font-semibold text-amber-300">
                    💡 {activeArticle.content.ctaNote}
                  </p>
                )}
              </div>
            </div>

            {/* Keyword SEO Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-red-500" />
                  Kata Kunci SEO Terkait Artikel Ini:
                </span>
                <span className="text-[11px] text-slate-400">
                  Klik tag untuk melihat artikel terkait
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeArticle.keywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTag(kw);
                      setSelectedSlug(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-300 transition-all cursor-pointer"
                    title={`Cari artikel dengan kata kunci "${kw}"`}
                  >
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    <span>#{kw}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion CTA Box inside Article */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Promo Pasang Baru 1x24 Jam Aktif</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Tertarik Pasang Paket Internet IndiHome / Telkomsel One?
                </h3>
                <p className="text-xs sm:text-sm text-red-100 max-w-xl leading-relaxed">
                  Dapatkan diskon biaya pasang Rp 99.000 atau paket 148K Bebas Biaya PSB. Konsultasikan alamat rumah Anda bersama Sales Resmi Vicky sekarang.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenRegister(activeArticle.recommendedPackageId)}
                    className="px-6 py-3 rounded-xl bg-white text-red-600 font-extrabold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <span>Daftar Pasang Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={waArticleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp Mas Vicky</span>
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              Artikel Edukasi Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => handleSelectArticle(rel.slug)}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{rel.readTime}</span>
                    <span className="font-semibold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDER: BLOG CATALOG / OVERVIEW VIEW
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda Utama
          </button>

          <span className="text-xs font-medium text-slate-500">
            Total {BLOG_POSTS.length} Artikel Resmi
          </span>
        </div>

        {/* Hero Section of the Blog */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white p-8 sm:p-12 mb-10 overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Pusat Informasi, Edukasi & SEO IndiHome 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Blog & Panduan Pasang Baru <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">IndiHome Telkomsel</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Informasi terlengkap seputar biaya pasang baru, promo diskon PSB 99K, review paket Telkomsel One hemat Rp 148K, serta tips mengoptimalkan sinyal WiFi fiber optik di rumah Anda.
            </p>

            {/* Instant Search Bar */}
            <div className="pt-2">
              <div className="relative max-w-lg">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata kunci: biaya pasang, 148K, telkomsel one, wifi lemot..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/15 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-300 bg-white/20 px-2 py-1 rounded-md hover:bg-white/30 cursor-pointer"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat && !selectedTag
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}

            {(selectedTag || searchQuery || selectedCategory !== 'Semua') && (
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSelectedTag(null);
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer ml-auto"
              >
                Reset Semua Filter
              </button>
            )}
          </div>

          {/* Active Filter Indicator */}
          {selectedTag && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xs">
              <Tag className="w-3.5 h-3.5 text-red-400" />
              <span>Filter Kata Kunci: <strong>#{selectedTag}</strong></span>
              <button
                onClick={() => setSelectedTag(null)}
                className="ml-2 bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded text-[10px] cursor-pointer"
              >
                ✕ Hapus
              </button>
            </div>
          )}

          {/* Direktori Kata Kunci Populer (Google SEO Index) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Indeks Kata Kunci SEO Terbanyak Dicari:
                </span>
              </div>

              {/* Group selection tabs */}
              <div className="flex flex-wrap gap-1">
                {KEYWORD_CATEGORY_GROUPS.map((grp, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => {
                      setActiveKeywordGroupIdx(gIdx);
                      setShowAllKeywords(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeKeywordGroupIdx === gIdx && !showAllKeywords
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {grp.name.split(',')[0]}
                  </button>
                ))}
                <button
                  onClick={() => setShowAllKeywords(!showAllKeywords)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    showAllKeywords
                      ? 'bg-red-600 text-white'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  {showAllKeywords ? 'Tutup Semua' : `Lihat Semua (${ALL_SEO_KEYWORDS.length})`}
                </button>
              </div>
            </div>

            {/* Keyword chips for active group or all */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(showAllKeywords
                ? ALL_SEO_KEYWORDS
                : KEYWORD_CATEGORY_GROUPS[activeKeywordGroupIdx].keywords
              ).map((kw, kwIdx) => {
                const isActive = selectedTag === kw;
                return (
                  <button
                    key={kwIdx}
                    onClick={() => {
                      if (selectedTag === kw) {
                        setSelectedTag(null);
                      } else {
                        setSelectedTag(kw);
                        setSelectedCategory('Semua');
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60 hover:border-slate-300'
                    }`}
                  >
                    <span>#{kw}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Spotlight Article Card (if on 'Semua' and no search/tag) */}
        {selectedCategory === 'Semua' && !selectedTag && !searchQuery && featuredPost && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Artikel Unggulan Pilihan Editor
              </span>
            </div>

            <div
              onClick={() => handleSelectArticle(featuredPost.slug)}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm hover:shadow-lg transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-slate-500">{featuredPost.publishDate}</span>
                  <span className="text-xs text-slate-500">• {featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors tracking-tight leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={featuredPost.author.avatar || SALES_AGENT_INFO.photoUrl}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {featuredPost.author.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {featuredPost.author.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                <div className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">
                    Keyword Pencarian:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredPost.keywords.slice(0, 4).map((kw, idx) => (
                      <span key={idx} className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 group-hover:translate-x-1 transition-transform">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              <span>Daftar Artikel & Panduan Edukasi</span>
            </h2>
            <span className="text-xs text-slate-500">
              Menampilkan {filteredPosts.length} artikel
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                Tidak ada artikel yang cocok dengan pencarian
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba gunakan kata kunci lain seperti "biaya pasang", "148K", atau pilih kategori "Semua".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSelectedTag(null);
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectArticle(post.slug)}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-lg hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 uppercase">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
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
                      Baca <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Directory of SEO Keywords for Crawlers and Users */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-red-600" />
              Direktori Lengkap Kata Kunci Pencarian Resmi (SEO Index)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Jelajahi seluruh topik pencarian terpopuler untuk paket IndiHome Telkomsel resmi 2026:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KEYWORD_CATEGORY_GROUPS.map((grp, gIdx) => (
              <div key={gIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {grp.name}
                </h4>
                <p className="text-[11px] text-slate-500">{grp.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {grp.keywords.map((kw, kwIdx) => (
                    <button
                      key={kwIdx}
                      onClick={() => {
                        setSelectedTag(kw);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className="text-[10px] bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 px-2 py-0.5 rounded border border-slate-200 hover:border-red-300 transition-colors cursor-pointer"
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Consultation Banner at the bottom of the blog */}
        <div className="mt-10 p-8 rounded-3xl bg-white border border-slate-200 text-center shadow-xs space-y-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Punya Pertanyaan Spesifik Seputar Jaringan di Alamat Anda?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Sales Mas Vicky siap membantu pengecekan titik tiang ODP dan memberikan rekomendasi paket terbaik sesuai budget keluarga.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenRegister()}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              Formulir Pasang Baru Cepat
            </button>
            <a
              href={`https://wa.me/${SALES_AGENT_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Halo Mas Vicky, saya membaca artikel di blog vickyindihomepusat. Mau tanya ketersediaan jaringan internet di daerah saya.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp Langsung
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
