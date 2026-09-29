import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Desactiva el modo silencioso para permitir ver los logs
    silent: false,
    globals: true,
    setupFiles: ["./test-env.setup.ts"],
  },
});
