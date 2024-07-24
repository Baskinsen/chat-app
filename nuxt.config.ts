// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    JWT_Access_Secret: process.env.JWT_ACCESS_SECRET,
    JWT_Refresh_Secret: process.env.JWT_REFRESH_SECRET,
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt-nodemailer"],
  nitro: {
    plugins: ["~/server/index.ts"],
    experimental: {
      websocket: true,
    }
  },
  build: {
    transpile: ["jsonwebtoken"],
  },
  nodemailer: {
    service: "gmail",
    from: '"King of the Hill" <noreply@king.com>',
    host: "smtp.google.com",
    port: 465,
    secure: true,
    auth: {
      user: "ayooluwababalola24@gmail.com",
      pass: process.env.NUXT_NODEMAILER_PASS,
    },
  },
});
