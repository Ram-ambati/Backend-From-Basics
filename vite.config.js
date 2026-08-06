import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isSSR = process.env.VITE_SSR === 'true';
  return {
  plugins: [react()],
  build: {
    ssr: isSSR,
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: isSSR ? 'src/entry-server.jsx' : 'index.html',
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor';
          }
          if (
            id.includes('node_modules/mermaid') ||
            id.includes('node_modules/cytoscape') ||
            id.includes('node_modules/katex') ||
            id.includes('node_modules/dagre') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/khroma') ||
            id.includes('node_modules/dompurify')
          ) {
            return 'mermaid';
          }
        }
      }
    }
  },
  ssr: {
    noExternal: ['react-router-dom', 'react-router', 'lucide-react']
  }
}
})
