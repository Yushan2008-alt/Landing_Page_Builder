# LP Builder — Landing Page Sales Builder

Aplikasi web untuk membangun, mengelola, dan men-generate landing page secara visual maupun berbasis AI. Dibangun dengan React 18 + Vite + TypeScript + Tailwind CSS v4.

**Live:** [landing-page-builder-git-master-mlyus6471-9432s-projects.vercel.app](https://landing-page-builder-git-master-mlyus6471-9432s-projects.vercel.app)
**Repo:** [github.com/Yushan2008-alt/Landing_Page_Builder](https://github.com/Yushan2008-alt/Landing_Page_Builder)

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| State | Zustand v5 |
| Routing | React Router v6 |
| Drag & Drop | dnd-kit |
| Auth | Supabase Auth *(opsional)* + localStorage fallback |
| Persistence | localStorage (`lp_projects_{userId}`) |
| Deploy | Vercel |

---

## Fitur

### Autentikasi
- **Register & Login** tanpa konfigurasi Supabase — menggunakan localStorage auth dengan hashing SHA-256 via Web Crypto API
- Setelah login, pengguna langsung diarahkan ke halaman **AI Landing Page Generator**
- Jika Supabase dikonfigurasi (`VITE_SUPABASE_URL`), otomatis beralih ke Supabase Auth

### Dashboard
- Daftar semua project landing page milik pengguna
- Buat project baru, edit, atau hapus
- Banner shortcut ke AI Generator

### Visual Builder (`/builder/:id`)
- Drag & drop section (Hero, Features, Pricing, FAQ, CTA, About, Contact, Testimonials, Logo Strip)
- Panel kanan: editor konten tiap section
- **Preset Selector** di setiap section — pilih template siap pakai berdasarkan kategori (Produk Digital, SaaS, Jasa, E-Commerce, dll.) yang langsung mengisi semua field editor
- Preview real-time

### AI Landing Page Generator (`/ai-generator`)
Multi-step form untuk generate prompt AI yang detail:

| Step | Isi |
|---|---|
| 1 | Framework penulisan & tone of voice |
| 2 | Info produk (nama, deskripsi, harga, USP) |
| 3 | Target market & avatar pelanggan |
| 4 | Pain point & desire |
| 5 | Preferensi visual & warna |
| 6 | Platform & integrasi |

Setelah form diisi dan klik **Generate Prompt**:
- Output prompt ~60 baris muncul di panel kanan
- Tombol **"Generate di Blackbox AI"** → prompt otomatis tersalin ke clipboard → tab relay terbuka → redirect ke Blackbox AI → tinggal paste & Enter

### Import HTML sebagai Project
Setelah mendapat kode HTML dari AI, pengguna dapat:
1. Paste HTML ke textarea di bagian bawah AI Generator
2. Beri nama project
3. Klik **Simpan Project** → tersimpan ke dashboard

---

## Desain

- **Tema:** Dark-only, Electric Violet (`oklch(0.62 0.27 285)`)
- **Background:** Dot grid pattern + ambient radial glow
- **Card:** Glassmorphism (`backdrop-blur`, `bg-white/5`, `border-white/10`)
- **Tipografi:** Gradient text (`oklch` violet → cyan)
- **Responsif:** Mobile-friendly di semua halaman

---

## Struktur Folder

```
src/
├── components/
│   ├── right-panel/
│   │   ├── shared/
│   │   │   └── PresetSelector.tsx     # Dropdown preset per section
│   │   └── editors/                   # 9 editor (Hero, Features, dll.)
│   └── ui/                            # shadcn/ui components
├── constants/
│   └── sectionPresets.ts              # Konten preset untuk semua section
├── hooks/
│   └── useAuth.ts                     # Auth hook (Supabase + localStorage)
├── lib/
│   ├── localAuth.ts                   # SHA-256 localStorage auth
│   └── supabase.ts                    # Supabase client
├── pages/
│   ├── LandingPage.tsx                # Halaman publik
│   ├── LoginPage.tsx                  # Login → redirect ke /ai-generator
│   ├── RegisterPage.tsx               # Register → redirect ke /ai-generator
│   ├── DashboardPage.tsx              # Daftar project
│   ├── BuilderPage.tsx                # Visual editor
│   └── AiGeneratorPage.tsx            # AI prompt generator + import HTML
├── store/
│   ├── authStore.ts                   # AppUser { id, email }
│   ├── builderStore.ts                # State visual builder
│   └── themeStore.ts                  # Theme state
└── router/
    └── index.tsx                      # Routes (termasuk /ai-generator)
```

---

## Konfigurasi Vercel

```json
{
  "framework": "vite",
  "installCommand": "npm ci",
  "buildCommand": "node ./node_modules/vite/bin/vite.js build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

> `npm ci` digunakan untuk menghindari permission error pada cached `node_modules/.bin/` di Vercel.

---

## Environment Variables (Opsional)

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

Jika tidak diset, aplikasi otomatis menggunakan localStorage auth.

---

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```
