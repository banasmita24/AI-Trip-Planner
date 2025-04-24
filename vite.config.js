import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
<<<<<<< HEAD
      "@": path.resolve(__dirname, "src"),
=======
      "@": path.resolve(__dirname, "./src"),
>>>>>>> 1fb3343129f3fa7ca5598456090cf5ef24053e61
    },
  },
})
