import dns from 'dns'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

import redwood from '@redwoodjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Keep index.js in the root of the dist folder without a hash
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'assets/index.js'
          }
          return 'assets/[name]-[hash].js' // Other entry files go in the assets folder with hash
        },
        // Dynamic imports (chunks) go into assets folder with a hash
        chunkFileNames: 'assets/[name]-[hash].js',
        // All assets (CSS, images, fonts, etc.) go into assets folder with a hash
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
}

export default defineConfig(viteConfig)
