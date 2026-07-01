import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // AlgorithmsPage.jsx (~60 KB) + beginnerAlgorithmsData.js (~77 KB) Vite dev
    // mode'da lazy import sırasında >90 s derleniyordu. RouteFallback spinner
    // asılı kalıyor, React h1'i DOM'a hiç eklemiyor → Playwright testi timeout
    // alıyordu. warmup ile bu modüller dev server açılışında önceden derlenir;
    // lazy import anında çözülür.
    warmup: {
      clientFiles: [
        './src/components/AlgorithmsPage.jsx',
        './src/components/AdvancedAlgorithmsPage.jsx',
        './src/data/beginnerAlgorithmsData.js',
      ],
    },
  },
  optimizeDeps: {
    // react/react-dom/react-router-dom ilk istek öncesi pre-bundle edilir.
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
})

