import type {
  SectionType,
  HeroContent, FeaturesContent, PricingContent, FaqContent,
  CtaContent, AboutContent, ContactContent, TestimonialsContent, LogoStripContent,
} from '../types/section'

export interface SectionPreset<T> {
  label: string
  category: string
  content: Partial<T>
}

// ─── Hero ────────────────────────────────────────────────────────────────────
const heroPresets: SectionPreset<HeroContent>[] = [
  {
    label: 'Produk Digital / Kursus',
    category: 'Digital Product',
    content: {
      headline: 'Kuasai Skill Baru dalam 30 Hari — Tanpa Harus Keluar Rumah',
      subheadline: 'Kursus online langkah-demi-langkah yang sudah membantu 5.000+ orang memulai karier baru mereka. Bergabunglah sekarang!',
      ctaText: 'Daftar Sekarang — Mulai dari Rp 299k',
      secondaryCtaText: 'Lihat Kurikulum Lengkap',
    },
  },
  {
    label: 'Jasa / Layanan Profesional',
    category: 'Digital Product',
    content: {
      headline: 'Solusi Tepat untuk Masalah Bisnis Anda',
      subheadline: 'Kami telah membantu 500+ klien meningkatkan performa bisnis mereka dalam waktu 90 hari. Siap jadi yang berikutnya?',
      ctaText: 'Konsultasi Gratis Sekarang',
      secondaryCtaText: 'Lihat Portfolio',
    },
  },
  {
    label: 'SaaS / Aplikasi',
    category: 'Tech & Software',
    content: {
      headline: 'Otomatiskan Proses Bisnis Anda — Hemat 10 Jam per Minggu',
      subheadline: 'Platform all-in-one yang mudah digunakan. Tidak perlu keahlian teknis. Setup dalam 5 menit.',
      ctaText: 'Coba Gratis 14 Hari',
      secondaryCtaText: 'Lihat Demo Live',
    },
  },
  {
    label: 'E-Commerce / Produk Fisik',
    category: 'E-Commerce',
    content: {
      headline: 'Kualitas Premium, Harga yang Terjangkau',
      subheadline: 'Produk pilihan dari bahan terbaik. Gratis ongkir ke seluruh Indonesia. Garansi uang kembali 30 hari.',
      ctaText: 'Beli Sekarang',
      secondaryCtaText: 'Lihat Katalog',
    },
  },
  {
    label: 'Lead Generation / Webinar',
    category: 'Lead Generation',
    content: {
      headline: 'Pelajari Rahasia [Topik] dalam 1 Jam — GRATIS',
      subheadline: 'Webinar eksklusif untuk pemula yang ingin hasil nyata. Tempat terbatas — daftar sebelum penuh!',
      ctaText: 'Daftar Webinar Gratis',
      secondaryCtaText: 'Pelajari Lebih Lanjut',
    },
  },
  {
    label: 'Coaching / Mentoring',
    category: 'Lead Generation',
    content: {
      headline: 'Capai Target Anda 3x Lebih Cepat dengan Bimbingan Langsung',
      subheadline: 'Program mentoring intensif selama 8 minggu. Hanya 10 slot tersedia per batch.',
      ctaText: 'Daftar Program Mentoring',
      secondaryCtaText: 'Tanya Lebih Lanjut',
    },
  },
]

// ─── Features ────────────────────────────────────────────────────────────────
const featuresPresets: SectionPreset<FeaturesContent>[] = [
  {
    label: '3 Keunggulan Utama',
    category: 'Keunggulan',
    content: {
      title: 'Kenapa Pilih Kami?',
      subtitle: 'Dirancang untuk memberikan hasil terbaik bagi Anda',
      columns: 3,
      items: [
        { icon: '⚡', title: 'Cepat & Efisien', description: 'Proses yang dioptimalkan agar Anda bisa fokus pada hal yang paling penting.' },
        { icon: '🛡️', title: 'Aman & Terpercaya', description: 'Data Anda dilindungi dengan enkripsi terkini. Sudah dipercaya ribuan pengguna.' },
        { icon: '🎯', title: 'Hasil Terukur', description: 'Track record terbukti. Pantau perkembangan Anda secara real-time.' },
      ],
    },
  },
  {
    label: 'Cara Kerja (3 Langkah)',
    category: 'Proses',
    content: {
      title: 'Cara Kerjanya Sangat Mudah',
      subtitle: 'Mulai dalam 3 langkah sederhana — tanpa ribet',
      columns: 3,
      items: [
        { icon: '1️⃣', title: 'Daftar Akun', description: 'Buat akun gratis Anda dalam 60 detik. Tidak perlu kartu kredit.' },
        { icon: '2️⃣', title: 'Setup & Konfigurasi', description: 'Ikuti panduan setup kami yang mudah dipahami, tersedia dalam bahasa Indonesia.' },
        { icon: '3️⃣', title: 'Mulai Dapatkan Hasil', description: 'Aktifkan dan lihat hasilnya dalam waktu 24 jam pertama.' },
      ],
    },
  },
  {
    label: '4 Fitur Unggulan',
    category: 'Fitur',
    content: {
      title: 'Fitur yang Membuat Perbedaan',
      subtitle: 'Dibangun khusus untuk kebutuhan Anda',
      columns: 2,
      items: [
        { icon: '📊', title: 'Dashboard Analitik', description: 'Pantau semua metrik penting dalam satu tampilan yang mudah dipahami.' },
        { icon: '🔄', title: 'Otomatisasi Penuh', description: 'Kurangi pekerjaan manual hingga 80% dengan workflow otomatis.' },
        { icon: '💬', title: 'Dukungan 24/7', description: 'Tim support kami siap membantu kapanpun Anda membutuhkan bantuan.' },
        { icon: '📱', title: 'Mobile-Friendly', description: 'Akses dari mana saja, kapan saja melalui smartphone Anda.' },
      ],
    },
  },
  {
    label: 'Manfaat untuk Pengguna',
    category: 'Manfaat',
    content: {
      title: 'Apa yang Akan Anda Dapatkan',
      subtitle: 'Lebih dari sekedar produk — ini adalah investasi untuk masa depan Anda',
      columns: 3,
      items: [
        { icon: '💰', title: 'Hemat Biaya', description: 'Kurangi pengeluaran operasional hingga 40% di bulan pertama.' },
        { icon: '⏰', title: 'Hemat Waktu', description: 'Selesaikan pekerjaan 3x lebih cepat dengan alat yang tepat.' },
        { icon: '📈', title: 'Tingkatkan Revenue', description: 'Klien kami rata-rata melihat kenaikan revenue 35% dalam 60 hari.' },
      ],
    },
  },
]

// ─── Pricing ─────────────────────────────────────────────────────────────────
const pricingPresets: SectionPreset<PricingContent>[] = [
  {
    label: '3 Paket: Starter / Pro / Enterprise',
    category: 'Multi Paket',
    content: {
      title: 'Pilih Paket yang Sesuai',
      subtitle: 'Mulai gratis, upgrade kapanpun sesuai kebutuhan',
      plans: [
        {
          name: 'Starter',
          price: 'Rp 99k',
          period: '/bulan',
          description: 'Cocok untuk individu dan pemula',
          features: ['3 Project aktif', 'Export HTML dasar', 'Template gratis', 'Email support'],
          ctaText: 'Mulai Gratis',
          ctaUrl: '#',
          highlighted: false,
        },
        {
          name: 'Pro',
          price: 'Rp 299k',
          period: '/bulan',
          description: 'Untuk profesional dan freelancer',
          features: ['Unlimited project', 'Export HTML premium', 'Semua template', 'Priority support', 'Custom domain', 'Analytics dashboard'],
          ctaText: 'Pilih Pro',
          ctaUrl: '#',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Rp 799k',
          period: '/bulan',
          description: 'Untuk tim dan agensi',
          features: ['Unlimited segalanya', 'White label', 'Team collaboration', 'Dedicated support', 'SLA guarantee', 'Custom integration'],
          ctaText: 'Hubungi Kami',
          ctaUrl: '#',
          highlighted: false,
        },
      ],
    },
  },
  {
    label: 'Harga Tunggal (One-Time)',
    category: 'One-Time',
    content: {
      title: 'Investasi Sekali, Pakai Selamanya',
      subtitle: 'Bayar satu kali, tidak ada biaya berlangganan bulanan',
      plans: [
        {
          name: 'Lifetime Access',
          price: 'Rp 997k',
          period: 'sekali bayar',
          description: 'Akses penuh selamanya, termasuk semua update mendatang',
          features: ['Akses lifetime', 'Semua fitur premium', 'Update gratis selamanya', 'Bonus materi senilai Rp 2jt', 'Garansi uang kembali 30 hari', 'Support via WA & email'],
          ctaText: 'Beli Sekarang — Hemat 70%',
          ctaUrl: '#',
          highlighted: true,
        },
      ],
    },
  },
  {
    label: 'Gratis vs Premium',
    category: 'Multi Paket',
    content: {
      title: 'Mulai Gratis, Upgrade Saat Siap',
      subtitle: 'Tidak ada trik, tidak ada biaya tersembunyi',
      plans: [
        {
          name: 'Gratis',
          price: 'Rp 0',
          period: 'selamanya',
          description: 'Mulai tanpa risiko',
          features: ['2 project aktif', 'Template dasar', 'Export HTML', 'Email support'],
          ctaText: 'Mulai Gratis',
          ctaUrl: '#',
          highlighted: false,
        },
        {
          name: 'Premium',
          price: 'Rp 199k',
          period: '/bulan',
          description: 'Untuk yang serius menghasilkan',
          features: ['Unlimited project', 'Semua template', 'A/B testing', 'Analytics', 'Priority support', 'Custom branding'],
          ctaText: 'Upgrade ke Premium',
          ctaUrl: '#',
          highlighted: true,
        },
      ],
    },
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqPresets: SectionPreset<FaqContent>[] = [
  {
    label: 'FAQ Produk / Layanan Umum',
    category: 'Umum',
    content: {
      title: 'Pertanyaan yang Sering Ditanyakan',
      subtitle: 'Tidak menemukan jawaban yang Anda cari? Hubungi tim kami.',
      items: [
        { question: 'Apakah ada garansi uang kembali?', answer: 'Ya! Kami memberikan garansi uang kembali 30 hari tanpa syarat. Jika Anda tidak puas, cukup hubungi kami dan kami akan mengembalikan 100% pembayaran Anda.' },
        { question: 'Berapa lama saya bisa mengakses materi?', answer: 'Anda mendapatkan akses seumur hidup ke semua materi, termasuk update di masa mendatang. Tidak ada biaya tambahan.' },
        { question: 'Apakah cocok untuk pemula?', answer: 'Sangat cocok! Materi kami dirancang mulai dari tingkat dasar hingga mahir. Anda tidak memerlukan pengalaman sebelumnya.' },
        { question: 'Bagaimana cara pembayaran?', answer: 'Kami menerima transfer bank, kartu kredit/debit, QRIS, GoPay, OVO, dan Dana. Semua transaksi aman dan terenkripsi.' },
        { question: 'Apakah ada sesi tanya jawab langsung?', answer: 'Ya, setiap bulan ada sesi live Q&A dengan instruktur. Anda juga bisa bertanya kapanpun di forum komunitas kami.' },
      ],
    },
  },
  {
    label: 'FAQ Pembelian & Pembayaran',
    category: 'Pembelian',
    content: {
      title: 'Info Pembelian & Pembayaran',
      subtitle: 'Semua yang perlu Anda tahu sebelum membeli',
      items: [
        { question: 'Metode pembayaran apa saja yang tersedia?', answer: 'Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), kartu kredit/debit, QRIS, e-wallet (GoPay, OVO, Dana, ShopeePay).' },
        { question: 'Apakah ada cicilan?', answer: 'Ya, tersedia cicilan 0% menggunakan kartu kredit Visa, Mastercard, dan beberapa kartu debit pilihan.' },
        { question: 'Kapan akses diberikan setelah pembayaran?', answer: 'Akses diberikan otomatis dalam 5-15 menit setelah pembayaran dikonfirmasi. Anda akan mendapat notifikasi via email.' },
        { question: 'Bagaimana prosedur refund?', answer: 'Kirim email ke support kami dengan bukti pembelian. Refund diproses dalam 3-5 hari kerja ke metode pembayaran asal.' },
      ],
    },
  },
  {
    label: 'FAQ Teknis / Penggunaan',
    category: 'Teknis',
    content: {
      title: 'Pertanyaan Teknis',
      subtitle: 'Butuh bantuan teknis? Tim kami siap membantu 24/7',
      items: [
        { question: 'Perangkat apa yang didukung?', answer: 'Berjalan di semua browser modern (Chrome, Firefox, Safari, Edge) di komputer dan smartphone. Tidak perlu install apapun.' },
        { question: 'Apakah data saya aman?', answer: 'Ya. Semua data dienkripsi dengan standar AES-256. Server kami berlokasi di Indonesia dan mematuhi regulasi perlindungan data.' },
        { question: 'Bagaimana jika saya mengalami masalah teknis?', answer: 'Hubungi support kami via live chat (respon dalam 5 menit), email, atau WhatsApp. Tersedia 24/7 termasuk hari libur.' },
        { question: 'Apakah ada panduan penggunaan?', answer: 'Tersedia dokumentasi lengkap, video tutorial, dan panduan PDF yang bisa diunduh. Plus, onboarding 1-on-1 untuk paket premium.' },
      ],
    },
  },
]

// ─── CTA ─────────────────────────────────────────────────────────────────────
const ctaPresets: SectionPreset<CtaContent>[] = [
  {
    label: 'Beli Sekarang (FOMO)',
    category: 'Urgency',
    content: {
      headline: 'Jangan Lewatkan Penawaran Terbatas Ini!',
      subheadline: 'Harga spesial hanya berlaku untuk 50 pembeli pertama. Sudah 38 orang mendaftar — jangan sampai tertinggal.',
      ctaText: 'Dapatkan Akses Sekarang →',
      secondaryCtaText: 'Tanya Dulu via WhatsApp',
      layout: 'centered',
    },
  },
  {
    label: 'Konsultasi Gratis',
    category: 'Soft CTA',
    content: {
      headline: 'Siap Mendiskusikan Kebutuhan Anda?',
      subheadline: 'Konsultasikan bisnis Anda dengan tim ahli kami. Gratis 30 menit, tanpa komitmen apapun.',
      ctaText: 'Jadwalkan Konsultasi Gratis',
      secondaryCtaText: 'Lihat Testimoni Klien',
      layout: 'centered',
    },
  },
  {
    label: 'Coba Gratis (No Risk)',
    category: 'Soft CTA',
    content: {
      headline: 'Mulai Tanpa Risiko — Selamanya Gratis',
      subheadline: 'Coba semua fitur premium selama 14 hari penuh. Tidak perlu kartu kredit. Batalkan kapanpun.',
      ctaText: 'Mulai Uji Coba Gratis',
      secondaryCtaText: '',
      layout: 'centered',
    },
  },
  {
    label: 'Download / Lead Magnet',
    category: 'Lead Gen',
    content: {
      headline: 'Dapatkan Panduan GRATIS Senilai Rp 500k',
      subheadline: 'Masukkan email Anda dan kami kirimkan panduan langsung ke inbox. Sudah diunduh 12.000+ kali.',
      ctaText: 'Kirim Panduan ke Email Saya',
      secondaryCtaText: '',
      layout: 'centered',
    },
  },
]

// ─── About ────────────────────────────────────────────────────────────────────
const aboutPresets: SectionPreset<AboutContent>[] = [
  {
    label: 'Cerita Founder',
    category: 'Cerita',
    content: {
      title: 'Dari Frustrasi ke Solusi',
      subtitle: 'Kisah di Balik Produk Ini',
      body: 'Dulu, saya menghabiskan berjam-jam setiap minggu melakukan pekerjaan yang seharusnya bisa diotomatiskan. Setelah mencoba puluhan solusi dan tidak menemukan yang tepat, saya memutuskan untuk membuatnya sendiri.\n\nHasilnya adalah produk yang Anda lihat sekarang — lahir dari frustrasi nyata, dibangun dengan satu tujuan: membantu orang seperti Anda mendapatkan hasil yang lebih baik dengan usaha yang lebih sedikit.\n\nSampai hari ini, lebih dari 10.000 pengguna sudah mempercayakan kebutuhan mereka kepada kami.',
      imagePosition: 'right',
      ctaText: 'Pelajari Lebih Lanjut',
    },
  },
  {
    label: 'Tentang Perusahaan',
    category: 'Perusahaan',
    content: {
      title: 'Tentang Kami',
      subtitle: 'Siapa di Balik Semua Ini',
      body: 'Kami adalah tim yang berdedikasi untuk membantu bisnis Indonesia berkembang di era digital. Sejak 2019, kami telah melayani lebih dari 5.000 klien dari berbagai industri.\n\nMisi kami sederhana: membuat teknologi yang biasanya hanya bisa diakses perusahaan besar, menjadi terjangkau dan mudah digunakan oleh semua orang.\n\nBerkantor di Jakarta dengan tim 25 orang, kami berkomitmen untuk terus berinovasi demi masa depan bisnis Indonesia.',
      imagePosition: 'left',
      ctaText: 'Temui Tim Kami',
    },
  },
  {
    label: 'Misi & Nilai',
    category: 'Perusahaan',
    content: {
      title: 'Kami Ada untuk Membuat Perbedaan',
      subtitle: 'Driven by purpose, not just profit',
      body: 'Kami percaya bahwa setiap orang berhak mendapatkan akses ke alat terbaik untuk mengembangkan bisnis mereka — tidak peduli seberapa besar atau kecil bisnis tersebut.\n\nItulah mengapa kami terus berinovasi untuk membuat produk yang powerful namun tetap mudah digunakan dan terjangkau.\n\nNilai inti kami: Transparansi, Inovasi, dan Dampak Nyata.',
      imagePosition: 'right',
      ctaText: 'Bergabung dengan Kami',
    },
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────
const contactPresets: SectionPreset<ContactContent>[] = [
  {
    label: 'Konsultasi Gratis',
    category: 'Lead Gen',
    content: {
      title: 'Mulai Konsultasi Gratis Hari Ini',
      subtitle: 'Ceritakan kebutuhan Anda dan tim kami akan menghubungi dalam 2 jam.',
      namePlaceholder: 'Nama lengkap Anda',
      emailPlaceholder: 'Email atau nomor WhatsApp',
      messagePlaceholder: 'Ceritakan kebutuhan atau masalah yang ingin Anda selesaikan...',
      submitText: 'Kirim & Minta Konsultasi Gratis',
    },
  },
  {
    label: 'Hubungi Kami',
    category: 'Umum',
    content: {
      title: 'Ada Pertanyaan? Kami Siap Membantu',
      subtitle: 'Respon dalam 24 jam kerja. Tersedia Senin–Sabtu, 08.00–21.00 WIB.',
      namePlaceholder: 'Nama Anda',
      emailPlaceholder: 'Email Anda',
      messagePlaceholder: 'Tulis pertanyaan atau pesan Anda di sini...',
      submitText: 'Kirim Pesan',
    },
  },
  {
    label: 'Daftar / Join Community',
    category: 'Lead Gen',
    content: {
      title: 'Bergabung dengan 15.000+ Member',
      subtitle: 'Dapatkan tips, trik, dan update eksklusif langsung di inbox Anda. Gratis selamanya.',
      namePlaceholder: 'Nama panggilan Anda',
      emailPlaceholder: 'Email aktif Anda',
      messagePlaceholder: 'Apa yang ingin Anda pelajari? (opsional)',
      submitText: 'Daftar Sekarang — GRATIS',
    },
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonialsPresets: SectionPreset<TestimonialsContent>[] = [
  {
    label: 'Testimoni Produk / Kursus',
    category: 'Produk Digital',
    content: {
      title: 'Apa Kata Mereka yang Sudah Bergabung',
      subtitle: '500+ testimoni bintang 5 dari pengguna nyata',
      columns: 3,
      items: [
        {
          quote: 'Saya skeptis awalnya, tapi setelah 3 minggu menggunakan, pendapatan freelance saya naik 2x lipat. Worth it banget!',
          name: 'Budi Santoso',
          role: 'Freelance Designer',
          company: 'Studio Kreatif Budi',
          avatarUrl: '',
          rating: 5,
        },
        {
          quote: 'Materi yang disampaikan sangat praktis dan langsung bisa diterapkan. Dalam 1 bulan sudah dapat klien pertama!',
          name: 'Dewi Rahayu',
          role: 'Content Creator',
          company: 'Self-employed',
          avatarUrl: '',
          rating: 5,
        },
        {
          quote: 'Support teamnya responsif banget. Pertanyaan dijawab dalam hitungan menit. Tidak menyesal sama sekali mendaftar.',
          name: 'Ahmad Fauzi',
          role: 'Digital Marketer',
          company: 'PT Maju Bersama',
          avatarUrl: '',
          rating: 5,
        },
      ],
    },
  },
  {
    label: 'Testimoni Jasa / Layanan',
    category: 'Layanan',
    content: {
      title: 'Klien Kami Bicara',
      subtitle: 'Hasil nyata dari bisnis nyata',
      columns: 2,
      items: [
        {
          quote: 'Tim mereka sangat profesional dan selalu on-time. Project selesai 2 minggu lebih cepat dari jadwal. Highly recommended!',
          name: 'Rina Kusuma',
          role: 'CEO',
          company: 'PT Maju Digital',
          avatarUrl: '',
          rating: 5,
        },
        {
          quote: 'ROI dari investasi kami meningkat 340% dalam 6 bulan pertama. Ini hasil terbaik yang pernah kami dapat dari vendor manapun.',
          name: 'Hendra Wijaya',
          role: 'Marketing Director',
          company: 'Tokobangunan.id',
          avatarUrl: '',
          rating: 5,
        },
        {
          quote: 'Komunikasi sangat baik, hasil kerja melampaui ekspektasi. Kami sudah kontrak untuk proyek ketiga bersama mereka.',
          name: 'Sari Indah',
          role: 'Founder',
          company: 'BeautyBrand Indonesia',
          avatarUrl: '',
          rating: 5,
        },
        {
          quote: 'Proses onboarding yang smooth dan tim support yang selalu siap. Masalah teknis selalu diselesaikan dalam hitungan jam.',
          name: 'Doni Prasetyo',
          role: 'CTO',
          company: 'Startup Fintech',
          avatarUrl: '',
          rating: 5,
        },
      ],
    },
  },
]

// ─── Logo Strip ───────────────────────────────────────────────────────────────
const logoStripPresets: SectionPreset<LogoStripContent>[] = [
  {
    label: 'Dipercaya Oleh (Trusted By)',
    category: 'Trust',
    content: {
      title: 'Dipercaya oleh 500+ Bisnis di Indonesia',
      grayscale: true,
      logos: [
        { name: 'Tokopedia', imageUrl: '', url: '#' },
        { name: 'Gojek', imageUrl: '', url: '#' },
        { name: 'Traveloka', imageUrl: '', url: '#' },
        { name: 'Bukalapak', imageUrl: '', url: '#' },
        { name: 'Shopee', imageUrl: '', url: '#' },
      ],
    },
  },
  {
    label: 'Diliput Media (As Seen In)',
    category: 'Social Proof',
    content: {
      title: 'Diliput oleh Media Terkemuka',
      grayscale: true,
      logos: [
        { name: 'Kompas', imageUrl: '', url: '#' },
        { name: 'Detik', imageUrl: '', url: '#' },
        { name: 'IDN Times', imageUrl: '', url: '#' },
        { name: 'Bisnis Indonesia', imageUrl: '', url: '#' },
        { name: 'Tech in Asia', imageUrl: '', url: '#' },
      ],
    },
  },
  {
    label: 'Partner / Integrasi',
    category: 'Partnership',
    content: {
      title: 'Terintegrasi dengan Tools Favorit Anda',
      grayscale: false,
      logos: [
        { name: 'WhatsApp', imageUrl: '', url: '#' },
        { name: 'Mailchimp', imageUrl: '', url: '#' },
        { name: 'Google Ads', imageUrl: '', url: '#' },
        { name: 'Meta Ads', imageUrl: '', url: '#' },
        { name: 'Zapier', imageUrl: '', url: '#' },
      ],
    },
  },
]

// ─── Master Map ───────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SECTION_PRESETS: Record<SectionType, SectionPreset<any>[]> = {
  'hero': heroPresets,
  'features': featuresPresets,
  'pricing': pricingPresets,
  'faq': faqPresets,
  'cta': ctaPresets,
  'about': aboutPresets,
  'contact': contactPresets,
  'testimonials': testimonialsPresets,
  'logo-strip': logoStripPresets,
}
