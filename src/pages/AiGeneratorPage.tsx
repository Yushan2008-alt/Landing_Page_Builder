import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useThemeStore } from '../store/themeStore'
import { useProjects } from '../hooks/useProjects'
import {
  ArrowLeft, Wand2, Copy, Check, ExternalLink, Moon, Sun,
  Layers, AlertCircle, Zap, RotateCcw, FolderPlus, Sparkles,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Form {
  framework: string; tone: string
  productType: string; goal: string; productName: string; productDesc: string; productPrice: string
  awarenessLevel: string; targetAudience: string
  bonus: string; usp: string
  painPoint: string; desiredOutcome: string
  brandColor: string; bgTheme: string; designStyle: string; heroType: string; stickyButton: boolean
  platform: string
}

const EMPTY: Form = {
  framework: '', tone: '',
  productType: '', goal: '', productName: '', productDesc: '', productPrice: '',
  awarenessLevel: '', targetAudience: '',
  bonus: '', usp: '',
  painPoint: '', desiredOutcome: '',
  brandColor: '', bgTheme: '', designStyle: '', heroType: '', stickyButton: false,
  platform: '',
}

// ─── Options ──────────────────────────────────────────────────────────────────
const FRAMEWORKS = [
  'AIDA (Attention-Interest-Desire-Action)',
  'AIDCA (+ Conviction)',
  'PAS (Problem-Agitate-Solution)',
  'PASTOR (Problem-Amplify-Story-Testimony-Offer-Response)',
  'StoryBrand (Clarify Your Message)',
  'Before-After-Bridge',
  'Feature-Advantage-Benefit (FAB)',
]

const TONES = {
  'Populer & Efektif': ['Friendly & Conversational', 'Professional & Formal', 'Witty & Humorous', 'Bold & Disruptive'],
  'Emosional & Story': ['Empathetic', 'Storytelling Mode', 'Inspirational', 'Exciting & Energetic'],
  'Authority & Logic': ['Direct & To The Point', 'Scientific / Data-Driven', 'Trustworthy', 'Urgent / Scarcity'],
  'Vibe Khusus': ['Luxury & Exclusive', 'Minimalist & Zen', 'Youthful & Trendy', 'Spiritual & Motivational'],
}

const PRODUCT_TYPES = ['Ebook / Template', 'Kursus Online', 'Jasa / Layanan Profesional', 'SaaS / Aplikasi', 'Produk Fisik', 'Membership / Community', 'Coaching / Mentoring 1-on-1', 'Webinar / Event Online']
const GOALS = ['Lead Generation (Email/WA)', 'Direct Sales (Beli Langsung)', 'Free Trial / Freemium', 'Webinar Registration', 'Community Join', 'Consultation Booking', 'Download / Lead Magnet']
const AWARENESS = ['Unaware (Belum sadar masalah)', 'Problem Aware (Tahu masalah, belum tahu solusi)', 'Solution Aware (Tahu ada solusi, belum kenal kita)', 'Product Aware (Sudah tahu kita, belum yakin)', 'Most Aware (Hampir beli, butuh push)']
const AUDIENCES = ['Freelancer / Pekerja Lepas', 'Advertiser / Digital Marketer', 'UMKM / Pemilik Usaha Kecil', 'Pelajar / Mahasiswa', 'Ibu Rumah Tangga', 'Karyawan Kantoran', 'Wirausahawan / Entrepreneur', 'Content Creator / Influencer', 'Profesional / Eksekutif', 'Startup Founder']
const BRAND_COLORS = ['Neutral / Monokrom', 'Biru Professional', 'Merah Energik', 'Hijau Natural / Kesehatan', 'Ungu Premium / Kreatif', 'Oranye Semangat', 'Kuning Optimis', 'Hitam Luxury', 'Pink Feminin']
const BG_THEMES = ['Dark Mode (Gelap)', 'Light Mode (Terang)', 'Default (Ikuti Gaya Desain)']
const DESIGN_STYLES = ['Apple Style (Minimalis Premium)', 'Bold & Playful (Warna Kuat)', 'Corporate & Professional', 'Startup Modern', 'Indonesian Local (Familiar)', 'Luxury & High-End', 'Energetic / Youth', 'Clean & Minimal']
const HERO_TYPES = ['Standard (Image Samping/Belakang)', 'Text Only (Full Copy)', 'Video Background', 'Split Screen (Text + Image)', 'Illustrated / Cartoon', 'Product Mockup Center']
const PLATFORMS = ['Scalev', 'Berdu', 'Lynk.id', 'WordPress', 'Shopify', 'Buat.id', 'Orderhero.id', 'Mayar', 'Custom HTML (Export Mandiri)']

// ─── Prompt Generator ─────────────────────────────────────────────────────────
function buildPrompt(f: Form): string {
  return `Kamu adalah expert developer & copywriter landing page konversi tinggi. Buat kode HTML landing page sales yang LENGKAP, PROFESIONAL, dan SIAP DEPLOY berdasarkan spesifikasi ini:

══════════════════════════════════════════════════
🎯 FRAMEWORK & GAYA BAHASA
══════════════════════════════════════════════════
Framework Copywriting : ${f.framework}
Tone / Gaya Bahasa    : ${f.tone}

Susun SELURUH copy menggunakan struktur ${f.framework.split(' ')[0]} secara ketat.
Gunakan tone "${f.tone}" konsisten dari headline hingga CTA.

══════════════════════════════════════════════════
📦 DATA PRODUK
══════════════════════════════════════════════════
Tipe Produk    : ${f.productType}
Nama Produk    : ${f.productName}
Deskripsi      : ${f.productDesc}
Harga / Offer  : ${f.productPrice || '(tentukan sendiri yang masuk akal)'}
Tujuan Halaman : ${f.goal}
USP Utama      : ${f.usp || '(derivasi dari deskripsi produk)'}
Bonus / Extras : ${f.bonus || 'Tidak ada bonus'}

══════════════════════════════════════════════════
👥 TARGET MARKET
══════════════════════════════════════════════════
Target Audience : ${f.targetAudience}
Level Awareness : ${f.awarenessLevel}

Sesuaikan bahasa, angle, dan pendekatan persuasi untuk level awareness ini.
Jangan asumsikan pembaca tahu lebih dari levelnya.

══════════════════════════════════════════════════
😤 PAIN POINT & DESIRED OUTCOME
══════════════════════════════════════════════════
Pain Point Utama  : ${f.painPoint || '(derivasi dari produk & audience)'}
Desired Outcome   : ${f.desiredOutcome || '(derivasi dari produk & audience)'}

Gunakan pain point untuk agitate di awal, desired outcome sebagai aspirasi/promise.

══════════════════════════════════════════════════
🎨 DESAIN VISUAL
══════════════════════════════════════════════════
Platform Target    : ${f.platform}
Warna Brand Utama  : ${f.brandColor}
Tema Background    : ${f.bgTheme}
Gaya Desain        : ${f.designStyle}
Tipe Hero Section  : ${f.heroType}
Sticky CTA Mobile  : ${f.stickyButton ? 'YA — wajib ada sticky button di bawah khusus mobile' : 'Tidak perlu'}

══════════════════════════════════════════════════
📋 INSTRUKSI LENGKAP
══════════════════════════════════════════════════

WAJIB BUAT SEMUA SECTION INI (urutan sesuai framework ${f.framework.split(' ')[0]}):
1. 🦸 HERO SECTION
   - Tipe: ${f.heroType}
   - Headline utama (kuat, benefit-driven, sesuai framework)
   - Sub-headline pendukung
   - Social proof singkat (misal: "Sudah digunakan 5.000+ orang")
   - CTA button utama yang sesuai tujuan: ${f.goal}

2. 😫 PROBLEM / PAIN SECTION
   - Agitate pain: "${f.painPoint || 'sesuaikan dengan produk'}"
   - Buat pembaca merasa "ini masalahku!"

3. 💡 SOLUTION / PRODUK SECTION
   - Perkenalkan ${f.productName} sebagai solusi
   - Posisikan sebagai satu-satunya pilihan terbaik

4. ✅ FEATURES & BENEFITS SECTION
   - Minimal 4-6 fitur/manfaat dengan icon
   - Fokus pada benefit (dampak), bukan hanya fitur

5. ❤️ SOCIAL PROOF / TESTIMONI
   - Minimal 3 testimoni realistis & spesifik
   - Sertakan nama, role/pekerjaan, foto placeholder
   - Rating bintang

6. 💰 PRICING / OFFER SECTION
   - Tampilkan harga: ${f.productPrice || 'buat placeholder yang realistis'}
   - Bonus: ${f.bonus || 'tanpa bonus'}
   - Garansi uang kembali (jika relevan)
   - CTA beli sekarang

7. ❓ FAQ SECTION
   - Minimal 5 pertanyaan relevan (accordion/dropdown)
   - Jawab keberatan umum calon pembeli

8. 🚀 FINAL CTA SECTION
   - Ulangi offer utama
   - FOMO element (jika ada)
   - CTA button terakhir

SPESIFIKASI TEKNIS:
- Single file HTML lengkap (<!DOCTYPE html> sampai </html>)
- CSS EMBEDDED di dalam <style> tag (tidak perlu file terpisah)
- Warna utama: ${f.brandColor} — implementasikan konsisten di semua elemen brand
- Tema: ${f.bgTheme}
- Gaya visual: ${f.designStyle} — terapkan pada spacing, typography, corner radius, shadow
- Responsive mobile-first, breakpoint 768px
${f.stickyButton ? '- Sticky button di bawah layar khusus mobile (position: fixed bottom: 0)' : ''}
- JavaScript inline: smooth scroll, accordion FAQ, form validation (jika ada form)
- Platform: ${f.platform} — pastikan struktur HTML kompatibel
- Load cepat: hindari external dependencies selain Google Fonts
- Meta tags lengkap (title, description, og:tags)

OUTPUT RULES:
- Berikan HANYA kode HTML mulai dari <!DOCTYPE html> hingga </html>
- JANGAN tambahkan penjelasan, komentar di luar kode, atau markdown block
- Kode harus bisa langsung di-copy paste dan berjalan sempurna di browser
- Semua teks dalam Bahasa Indonesia yang natural`
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ num, title, subtitle, children }: {
  num: number; title: string; subtitle: string; children: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-6 mb-4"
      style={{
        background: 'oklch(0.10 0.018 285)',
        border: '1px solid oklch(0.20 0.03 285)',
      }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
        >
          {num}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

// ─── Select Field ─────────────────────────────────────────────────────────────
function SelectField({ label, value, onChange, options, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void
  options: string[]; required?: boolean; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 rounded-lg border px-3 text-sm bg-transparent text-foreground outline-none transition-colors"
        style={{
          borderColor: value ? 'oklch(0.62 0.27 285 / 0.5)' : 'oklch(0.20 0.03 285)',
          background: 'oklch(0.08 0.015 285)',
        }}
      >
        <option value="" disabled>{placeholder ?? `Pilih ${label}...`}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

// ─── Grouped Select (Tone) ────────────────────────────────────────────────────
function GroupedSelect({ label, value, onChange, groups, required }: {
  label: string; value: string; onChange: (v: string) => void
  groups: Record<string, string[]>; required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 rounded-lg border px-3 text-sm outline-none transition-colors"
        style={{
          borderColor: value ? 'oklch(0.62 0.27 285 / 0.5)' : 'oklch(0.20 0.03 285)',
          background: 'oklch(0.08 0.015 285)',
          color: 'oklch(0.96 0.01 290)',
        }}
      >
        <option value="" disabled>Pilih gaya bahasa...</option>
        {Object.entries(groups).map(([cat, opts]) => (
          <optgroup key={cat} label={`— ${cat} —`}>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

// ─── Platform Card ────────────────────────────────────────────────────────────
function PlatformCard({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl p-4 text-sm font-medium transition-all duration-200 text-center"
      style={{
        background: selected
          ? 'linear-gradient(135deg, oklch(0.62 0.27 285 / 0.25), oklch(0.62 0.27 285 / 0.10))'
          : 'oklch(0.08 0.015 285)',
        border: selected
          ? '1px solid oklch(0.62 0.27 285 / 0.6)'
          : '1px solid oklch(0.20 0.03 285)',
        color: selected ? 'oklch(0.82 0.18 285)' : 'oklch(0.60 0.02 285)',
        boxShadow: selected ? '0 0 16px oklch(0.62 0.27 285 / 0.15)' : 'none',
      }}
    >
      {name}
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function AiGeneratorPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()
  const { createHtmlProject } = useProjects()
  const [form, setForm] = useState<Form>(EMPTY)
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  // Import HTML state
  const [importHtml, setImportHtml] = useState('')
  const [importName, setImportName] = useState('')
  const [importError, setImportError] = useState('')
  const [importSaved, setImportSaved] = useState(false)
  const importRef = useRef<HTMLDivElement>(null)

  const set = (patch: Partial<Form>) => setForm(prev => ({ ...prev, ...patch }))

  const REQUIRED: (keyof Form)[] = ['framework', 'tone', 'productType', 'goal', 'productName', 'productDesc', 'awarenessLevel', 'targetAudience', 'brandColor', 'bgTheme', 'designStyle', 'heroType', 'platform']

  const handleGenerate = () => {
    const missing = REQUIRED.filter(k => !form[k])
    if (missing.length > 0) {
      setError('Mohon lengkapi semua kolom bertanda (Wajib) agar prompt akurat.')
      return
    }
    setError('')
    const p = buildPrompt(form)
    setPrompt(p)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenBlackbox = async () => {
    // Copy prompt to clipboard first, then open Blackbox AI (URL param not supported)
    try { await navigator.clipboard.writeText(prompt) } catch { /* silent */ }
    window.open('https://www.blackbox.ai/', '_blank', 'noopener,noreferrer')
  }

  const handleReset = () => {
    setForm(EMPTY)
    setPrompt('')
    setError('')
  }

  const handleImportSave = () => {
    if (!importName.trim()) { setImportError('Masukkan nama project.'); return }
    if (!importHtml.trim()) { setImportError('Paste kode HTML terlebih dahulu.'); return }
    if (!importHtml.trim().toLowerCase().includes('<!doctype html') && !importHtml.trim().toLowerCase().includes('<html')) {
      setImportError('Kode yang dimasukkan bukan HTML yang valid.')
      return
    }
    setImportError('')
    const project = createHtmlProject(importName.trim(), importHtml.trim())
    setImportSaved(true)
    setTimeout(() => navigate(`/html-preview/${project.id}`), 1200)
  }

  return (
    <div className="min-h-screen bg-background bg-grid text-foreground">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed top-[-200px] right-[-100px] w-[500px] h-[500px] opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, oklch(0.62 0.27 285) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Navbar */}
      <nav className="border-b border-border/50 glass-light sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
            <span className="text-border/60">|</span>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
              >
                <Wand2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">AI Landing Page Generator</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

          {/* ── Left: Form ── */}
          <div>
            <div className="mb-6">
              <p
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3"
                style={{ background: 'oklch(0.62 0.27 285 / 0.15)', color: 'oklch(0.72 0.18 285)', border: '1px solid oklch(0.62 0.27 285 / 0.2)' }}
              >
                <Zap className="w-3 h-3" /> AI Prompt Generator
              </p>
              <h1 className="text-2xl font-bold text-foreground mb-1">Landing Page Sales Builder</h1>
              <p className="text-sm text-muted-foreground">Isi formulir di bawah, klik Generate, lalu buka di Blackbox AI untuk mendapatkan kode landing page siap pakai.</p>
            </div>

            {/* Section 1: Framework & Tone */}
            <Section num={1} title="Framework & Tone" subtitle="Tentukan struktur psikologi dan gaya bahasa copywriting.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label="Pilih Framework" value={form.framework} onChange={v => set({ framework: v })} options={FRAMEWORKS} required placeholder="Pilih framework..." />
                <GroupedSelect label="Gaya Bahasa (Tone)" value={form.tone} onChange={v => set({ tone: v })} groups={TONES} required />
              </div>
            </Section>

            {/* Section 2: Produk & Tujuan */}
            <Section num={2} title="Produk & Tujuan" subtitle="Apa yang Anda jual dan apa goal utamanya?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Tipe Produk" value={form.productType} onChange={v => set({ productType: v })} options={PRODUCT_TYPES} required />
                <SelectField label="Tujuan Utama (Goal)" value={form.goal} onChange={v => set({ goal: v })} options={GOALS} required />
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nama Produk <span className="text-primary">*</span>
                  </Label>
                  <Input
                    value={form.productName}
                    onChange={e => set({ productName: e.target.value })}
                    placeholder="Contoh: Kursus Desain Grafis untuk Pemula"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Deskripsi Produk <span className="text-primary">*</span>
                  </Label>
                  <textarea
                    value={form.productDesc}
                    onChange={e => set({ productDesc: e.target.value })}
                    placeholder="Jelaskan produk Anda: apa itu, manfaat utamanya, apa yang membuat unik..."
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none transition-colors"
                    style={{
                      background: 'oklch(0.08 0.015 285)',
                      borderColor: form.productDesc ? 'oklch(0.62 0.27 285 / 0.5)' : 'oklch(0.20 0.03 285)',
                      color: 'oklch(0.96 0.01 290)',
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Harga / Penawaran</Label>
                    <Input value={form.productPrice} onChange={e => set({ productPrice: e.target.value })} placeholder="Contoh: Rp 299.000" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bonus / Extras (opsional)</Label>
                    <Input value={form.bonus} onChange={e => set({ bonus: e.target.value })} placeholder="Contoh: Template Canva + Sertifikat" className="h-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unique Selling Point (opsional)</Label>
                  <Input value={form.usp} onChange={e => set({ usp: e.target.value })} placeholder="Apa yang membuat produk ini berbeda dari kompetitor?" className="h-9" />
                </div>
              </div>
            </Section>

            {/* Section 3: Target Market */}
            <Section num={3} title="Target Market" subtitle="Siapa audiensnya dan seberapa tahu mereka?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label="Level Awareness" value={form.awarenessLevel} onChange={v => set({ awarenessLevel: v })} options={AWARENESS} required />
                <SelectField label="Target Audience" value={form.targetAudience} onChange={v => set({ targetAudience: v })} options={AUDIENCES} required />
              </div>
            </Section>

            {/* Section 4: Pain & Desire */}
            <Section num={4} title="Pain Point & Desired Outcome" subtitle="Apa masalah utama audiens dan hasil yang mereka inginkan?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pain Point Utama</Label>
                  <Input value={form.painPoint} onChange={e => set({ painPoint: e.target.value })} placeholder="Contoh: Susah dapat klien meski sudah aktif posting" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Desired Outcome</Label>
                  <Input value={form.desiredOutcome} onChange={e => set({ desiredOutcome: e.target.value })} placeholder="Contoh: Dapat 5 klien baru per bulan secara konsisten" className="h-9" />
                </div>
              </div>
            </Section>

            {/* Section 5: Visual & Design */}
            <Section num={5} title="Visual & Desain" subtitle="Atur tampilan visual, warna, dan layout.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Warna Brand Utama" value={form.brandColor} onChange={v => set({ brandColor: v })} options={BRAND_COLORS} required />
                <SelectField label="Tema Background (Light/Dark)" value={form.bgTheme} onChange={v => set({ bgTheme: v })} options={BG_THEMES} required />
                <SelectField label="Gaya Desain & Referensi" value={form.designStyle} onChange={v => set({ designStyle: v })} options={DESIGN_STYLES} required />
                <SelectField label="Hero Section Type" value={form.heroType} onChange={v => set({ heroType: v })} options={HERO_TYPES} required />
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.stickyButton}
                    onChange={e => set({ stickyButton: e.target.checked })}
                  />
                  <div
                    className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                    style={{
                      background: form.stickyButton ? 'oklch(0.62 0.27 285)' : 'transparent',
                      borderColor: form.stickyButton ? 'oklch(0.62 0.27 285)' : 'oklch(0.30 0.04 285)',
                    }}
                  >
                    {form.stickyButton && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Aktifkan Sticky Button di Mobile <span className="text-xs text-primary">(Wajib untuk Traffic Ads)</span>
                </span>
              </label>
            </Section>

            {/* Section 6: Platform */}
            <Section num={6} title="Platform Target" subtitle="Di mana landing page ini akan dipublish?">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {PLATFORMS.map(p => (
                  <PlatformCard
                    key={p}
                    name={p}
                    selected={form.platform === p}
                    onClick={() => set({ platform: p })}
                  />
                ))}
              </div>
            </Section>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4 text-sm"
                style={{
                  background: 'oklch(0.64 0.22 22 / 0.1)',
                  border: '1px solid oklch(0.64 0.22 22 / 0.3)',
                  color: 'oklch(0.75 0.18 22)',
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="gap-2 border-border/50 bg-transparent">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                onClick={handleGenerate}
                className="flex-1 gap-2 h-11 text-sm font-semibold tracking-wide uppercase"
                style={{ boxShadow: '0 0 30px oklch(0.62 0.27 285 / 0.35)' }}
              >
                <Wand2 className="w-4 h-4" />
                Generate Sekarang
              </Button>
            </div>
          </div>

          {/* ── Right: Result Panel ── */}
          <div ref={resultRef} className="xl:sticky xl:top-20 xl:self-start">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'oklch(0.10 0.018 285)',
                border: '1px solid oklch(0.20 0.03 285)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: 'oklch(0.20 0.03 285)' }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.72 0.18 285)' }}>RESULT</p>
                  <p className="font-bold text-foreground text-sm">AI Prompt Output</p>
                </div>
                {prompt && (
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs border-border/50 bg-transparent" onClick={handleCopy}>
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Tersalin!' : 'Salin'}
                  </Button>
                )}
              </div>

              {/* Prompt Output */}
              <div
                className="min-h-[280px] max-h-[480px] overflow-y-auto p-5 font-mono text-xs leading-relaxed"
                style={{ color: prompt ? 'oklch(0.75 0.03 285)' : 'oklch(0.40 0.03 285)' }}
              >
                {prompt
                  ? prompt
                  : 'Lengkapi formulir di sebelah kiri, lalu klik "Generate Sekarang" untuk membuat prompt AI yang siap digunakan...'}
              </div>

              {/* Generate to Blackbox Button */}
              <div
                className="p-5 border-t"
                style={{ borderColor: 'oklch(0.20 0.03 285)' }}
              >
                <Button
                  onClick={handleOpenBlackbox}
                  disabled={!prompt}
                  className="w-full gap-2 h-11 text-sm font-semibold"
                  style={{
                    boxShadow: prompt ? '0 0 25px oklch(0.62 0.27 285 / 0.3)' : 'none',
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Salin & Buka Blackbox AI
                </Button>
                {prompt && (
                  <div
                    className="mt-3 rounded-lg px-3 py-2.5 text-xs leading-relaxed"
                    style={{
                      background: 'oklch(0.62 0.27 285 / 0.08)',
                      border: '1px solid oklch(0.62 0.27 285 / 0.2)',
                      color: 'oklch(0.70 0.06 285)',
                    }}
                  >
                    <strong className="text-foreground">Cara pakai:</strong> Klik tombol di atas → prompt otomatis tersalin ke clipboard → Blackbox AI terbuka → <strong className="text-foreground">Paste (Ctrl+V)</strong> di kolom chat → kirim.
                  </div>
                )}
              </div>
            </div>

            {/* Builder shortcut */}
            <div
              className="mt-4 rounded-xl p-4 flex items-center gap-3 cursor-pointer group transition-all"
              style={{
                background: 'oklch(0.09 0.015 285)',
                border: '1px solid oklch(0.18 0.025 285)',
              }}
              onClick={() => navigate('/dashboard')}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285 / 0.2), oklch(0.62 0.27 285 / 0.08))' }}
              >
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                  Prefer Visual Builder?
                </p>
                <p className="text-xs text-muted-foreground">Drag & drop builder → Dashboard</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-muted-foreground ml-auto rotate-180" />
            </div>

            {/* ── Import HTML as Project ── */}
            <div
              ref={importRef}
              className="mt-4 rounded-2xl overflow-hidden"
              style={{
                background: 'oklch(0.10 0.018 285)',
                border: '1px solid oklch(0.62 0.27 285 / 0.25)',
                boxShadow: '0 0 30px oklch(0.62 0.27 285 / 0.06)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b"
                style={{ borderColor: 'oklch(0.20 0.03 285)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
                >
                  <FolderPlus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.72 0.18 285)' }}>
                    LANGKAH SELANJUTNYA
                  </p>
                  <p className="font-bold text-foreground text-sm">Simpan sebagai Project</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Setelah Blackbox AI selesai membuat kode, <strong className="text-foreground">copy semua kode HTML</strong> dari Blackbox AI, lalu paste di sini. Kode akan disimpan sebagai project di dashboard kamu.
                </p>

                {/* Steps */}
                <div className="flex gap-2 text-xs">
                  {['1. Generate di Blackbox AI', '2. Copy kode HTML', '3. Paste & simpan di sini'].map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-lg px-2 py-2 text-center leading-tight"
                      style={{
                        background: 'oklch(0.08 0.015 285)',
                        border: '1px solid oklch(0.18 0.025 285)',
                        color: 'oklch(0.65 0.05 285)',
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>

                {/* Project name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nama Project <span className="text-primary">*</span>
                  </Label>
                  <Input
                    value={importName}
                    onChange={e => setImportName(e.target.value)}
                    placeholder="Contoh: Landing Page Kursus Desain"
                    className="h-9"
                  />
                </div>

                {/* HTML textarea */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Kode HTML dari Blackbox AI <span className="text-primary">*</span>
                  </Label>
                  <textarea
                    value={importHtml}
                    onChange={e => { setImportHtml(e.target.value); setImportSaved(false) }}
                    placeholder={'Paste kode HTML di sini...\n\n<!DOCTYPE html>\n<html>\n  ...\n</html>'}
                    rows={8}
                    className="w-full rounded-lg border px-3 py-2 text-xs font-mono resize-none outline-none transition-colors"
                    style={{
                      background: 'oklch(0.07 0.012 285)',
                      borderColor: importHtml ? 'oklch(0.62 0.27 285 / 0.4)' : 'oklch(0.20 0.03 285)',
                      color: 'oklch(0.75 0.03 285)',
                    }}
                  />
                </div>

                {/* Error */}
                {importError && (
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
                    style={{
                      background: 'oklch(0.64 0.22 22 / 0.1)',
                      border: '1px solid oklch(0.64 0.22 22 / 0.3)',
                      color: 'oklch(0.75 0.18 22)',
                    }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {importError}
                  </div>
                )}

                {/* Save button */}
                <Button
                  onClick={handleImportSave}
                  disabled={importSaved}
                  className="w-full h-10 gap-2 font-semibold"
                  style={{ boxShadow: '0 0 20px oklch(0.62 0.27 285 / 0.25)' }}
                >
                  {importSaved
                    ? (<><Check className="w-4 h-4" /> Project Tersimpan! Membuka preview...</>)
                    : (<><Sparkles className="w-4 h-4" /> Simpan & Preview Project</>)
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
