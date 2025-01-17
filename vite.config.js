import react from '@vitejs/plugin-react';
import fs from 'fs';
import { meteor } from 'meteor-vite/plugin';
import path from 'path';
import { defineConfig } from 'vite';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  plugins: [
    // nodePolyfills(),
    react({ fastRefresh: false }),
    meteor({
      clientEntry: 'client/entry-vite.jsx',
      stubValidation: {
        warnOnly: true
      },
      meteorStubs: {
        debug: false
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@meteor-vite/react-meteor-data', 'io-ts'],
    esbuildOptions: {
      plugins: [
        {
          name: 'esbuild-plugin-react-virtualized',
          setup({ onLoad }) {
            onLoad(
              {
                filter: /react-virtualized[/\\]dist[/\\]es[/\\]WindowScroller[/\\]utils[/\\]onScroll\.js$/
              },
              async ({ path }) => {
                const code = fs.readFileSync(path, 'utf8');
                const broken = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
                return { contents: code.replace(broken, '') };
              }
            );
          }
        }
      ]
    }
  }
});
