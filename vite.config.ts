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
      sassVariables: "src/theme/quasar-variables.sass"
    }),
    vue(),
    monacoEditorPlugin({})
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `src/assets/styles/index.scss";`,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`]
        }
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(path.resolve(__dirname), "src")
      }
    ],
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
});
