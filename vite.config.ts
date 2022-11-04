import { defineConfig } from "vite";
// @ts-ignore
import path from "path";
import { quasar } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  plugins: [
    quasar({
      sassVariables: "src/assets/styles/quasar-variables.sass"
    }),
    vue(),
    monacoEditorPlugin({})
  ],
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`]
        },
        entryFileNames: `assets/[name].${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
        assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ],
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
});
