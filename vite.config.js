import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { Buffer } from "buffer"; // Import Buffer

// https://vitejs.dev/config/
export default ({ mode }) => {
  const environmentVariables = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        crypto: "crypto-browserify",
        assert: "assert",
        buffer: "buffer/",
        http: "stream-http",
        https: "https-browserify",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        url: "url",
        vm: "vm-browserify",
        os: "os-browserify",
        util: "util",
      },
    },
    define: {
      global: "globalThis",
      process: {
        env: {
          NODE_DEBUG: false,
          ...environmentVariables,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
          process: "process",
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
        ],
      },
    },
  });
};
