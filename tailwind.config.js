/** @type {import('tailwindcss').Config} */

/**
 * ══════════════════════════════════════════════════════════════════
 * TAILWIND CSS KONFİGÜRASYONU — WCAG AAA Renk Sistemi
 *
 * Tüm özel renkler CSS Custom Properties ile senkronize edilmiştir.
 * Kullanım: bg-canvas, text-ink, text-ink-secondary, ring-accent vb.
 *
 * Light Mode varsayılandır. Dark mode için Tailwind'in 'darkMode'
 * yerine proje mevcut .dark-mode sınıfını kullandığından bu
 * renkler CSS değişkenleri aracılığıyla çözümlenmektedir.
 * ══════════════════════════════════════════════════════════════════
 */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {

            /* ── RENKLER ──────────────────────────────────────────── */
            colors: {

                /* Arka Plan Katmanları */
                canvas: {
                    base:    'var(--bg-base)',       /* Ana zemin */
                    surface: 'var(--bg-surface)',    /* Kart, panel */
                    subtle:  'var(--bg-subtle)',     /* Sidebar, kod */
                    overlay: 'var(--bg-overlay)',    /* Modal */
                    inset:   'var(--bg-inset)',      /* Input, basılı */
                },

                /* Kenarlıklar */
                edge: {
                    subtle:  'var(--border-subtle)',
                    DEFAULT: 'var(--border-default)',
                    strong:  'var(--border-strong)',
                },

                /* Metinler */
                ink: {
                    DEFAULT:   'var(--text-primary)',     /* Ana metin */
                    secondary: 'var(--text-secondary)',   /* Yardımcı metin */
                    muted:     'var(--text-muted)',       /* Hint, placeholder */
                    link:      'var(--text-link)',        /* Bağlantı */
                    inverted:  'var(--text-inverted)',    /* Koyu zemin üstü */
                    onAccent:  'var(--text-on-accent)',   /* Renkli buton */
                },

                /* Birincil Vurgu — İndigo */
                accent: {
                    DEFAULT: 'var(--accent-primary)',
                    hover:   'var(--accent-primary-hover)',
                    active:  'var(--accent-primary-active)',
                    subtle:  'var(--accent-primary-subtle)',
                    ring:    'var(--accent-primary-ring)',
                    text:    'var(--accent-primary-text)',
                },

                /* Başarı — Emerald */
                success: {
                    DEFAULT: 'var(--accent-success)',
                    hover:   'var(--accent-success-hover)',
                    subtle:  'var(--accent-success-subtle)',
                    text:    'var(--accent-success-text)',
                },

                /* Uyarı — Amber */
                warn: {
                    DEFAULT: 'var(--accent-warn)',
                    hover:   'var(--accent-warn-hover)',
                    subtle:  'var(--accent-warn-subtle)',
                    text:    'var(--accent-warn-text)',
                },

                /* Hata/Tehlike — Rose */
                danger: {
                    DEFAULT: 'var(--accent-danger)',
                    hover:   'var(--accent-danger-hover)',
                    subtle:  'var(--accent-danger-subtle)',
                    text:    'var(--accent-danger-text)',
                },

                /* Kod vurgusu */
                code: {
                    DEFAULT: 'var(--accent-code)',
                    bg:      'var(--accent-code-bg)',
                },

                /* Geriye dönük uyumluluk — önceki primary/secondary korunuyor */
                primary:   'var(--accent-primary)',
                secondary: 'var(--accent-primary-hover)',
            },

            /* ── TİPOGRAFİ ───────────────────────────────────────── */
            fontFamily: {
                sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
                display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
            },

            fontSize: {
                '2xs': ['0.6875rem', { lineHeight: '1.4' }],   /* 11px */
                'xs':  ['0.75rem',   { lineHeight: '1.5' }],   /* 12px */
                'sm':  ['0.875rem',  { lineHeight: '1.57' }],  /* 14px */
                'base': ['1rem',     { lineHeight: '1.70' }],  /* 16px */
                'md':  ['1.0625rem', { lineHeight: '1.65' }],  /* 17px */
                'lg':  ['1.125rem',  { lineHeight: '1.55' }],  /* 18px */
                'xl':  ['1.25rem',   { lineHeight: '1.45' }],  /* 20px */
                '2xl': ['1.5rem',    { lineHeight: '1.35' }],  /* 24px */
                '3xl': ['1.875rem',  { lineHeight: '1.25' }],  /* 30px */
                '4xl': ['2.25rem',   { lineHeight: '1.20' }],  /* 36px */
                '5xl': ['3rem',      { lineHeight: '1.15' }],  /* 48px */
            },

            /* ── LETTER SPACING ──────────────────────────────────── */
            letterSpacing: {
                tightest: '-0.03em',
                tighter:  '-0.025em',
                tight:    '-0.015em',
                normal:   '0em',
                wide:     '0.01em',
                wider:    '0.025em',
                widest:   '0.05em',
            },

            /* ── BORDER RADIUS ───────────────────────────────────── */
            borderRadius: {
                'sm':   '4px',
                'md':   '6px',
                'lg':   '8px',
                'xl':   '12px',
                '2xl':  '16px',
                '3xl':  '24px',
                'pill': '9999px',
            },

            /* ── GÖLGELER ────────────────────────────────────────── */
            boxShadow: {
                sm:  'var(--shadow-sm)',
                md:  'var(--shadow-md)',
                lg:  'var(--shadow-lg)',
                /* Odak halkası için */
                'focus-accent': '0 0 0 3px var(--accent-primary-ring)',
                'focus-danger': '0 0 0 3px color-mix(in srgb, var(--accent-danger) 30%, transparent)',
            },

            /* ── GEÇİŞ SÜRELERİ ──────────────────────────────────── */
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '250': '250ms',
                '300': '300ms',
                '400': '400ms',
                '500': '500ms',
            },

            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'ease-in-out': 'ease-in-out',
            },

            /* ── ANİMASYONLAR ────────────────────────────────────── */
            keyframes: {
                fadeIn: {
                    '0%':   { opacity: '0', transform: 'translateY(4px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%':   { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%':   { opacity: '0', transform: 'scale(0.96)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shimmer: {
                    '0%':   { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },

            animation: {
                'fadeIn':    'fadeIn 0.2s ease-in-out',
                'slideDown': 'slideDown 0.25s ease-out',
                'scaleIn':   'scaleIn 0.2s ease-out',
                'shimmer':   'shimmer 1.5s infinite linear',
            },

            /* ── SCALE ───────────────────────────────────────────── */
            scale: {
                '102': '1.02',
                '103': '1.03',
                '104': '1.04',
                '97':  '0.97',
                '98':  '0.98',
            },

            /* ── SPACING ─────────────────────────────────────────── */
            spacing: {
                '4.5': '1.125rem',
                '5.5': '1.375rem',
                '7.5': '1.875rem',
                '13':  '3.25rem',
                '15':  '3.75rem',
                '18':  '4.5rem',
            },
        },
    },

    plugins: [],
}
