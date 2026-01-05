import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// Always external (never bundle these)
const alwaysExternal = [
  "drizzle-kit",
  "tsx",
  "vite",
  "@vitejs/plugin-react",
  "@tailwindcss/vite",
  "@replit/vite-plugin-runtime-error-modal",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  // Packages to externalize: those not in allowlist OR those in alwaysExternal
  const externals = allDeps.filter((dep) => 
    alwaysExternal.includes(dep) || !allowlist.includes(dep)
  );

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: [
      ...externals,
      // Explicitly exclude drizzle-kit and all its subpaths
      "drizzle-kit",
      "drizzle-kit/*",
      // Exclude config files that might import drizzle-kit
      "./drizzle.config",
      "../drizzle.config",
      "../../drizzle.config",
    ],
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
