import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import presetIcons from "@unocss/preset-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import transformerDirective from "@unocss/transformer-directives";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  base: "/attendance_student",
  server: {
    https: true, // 需要开启https服务
  },
  plugins: [
    vue(),
    mkcert(),
    UnoCSS({
      transformers: [transformerDirective()],
      presets: [
        presetIcons({
          collections: {
            carbon: () =>
              import("@iconify-json/carbon/icons.json").then((i) => i.default),
            ic: () =>
              import("@iconify-json/ic/icons.json").then((i) => i.default),
          },
        }),
      ],
    }),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
});
