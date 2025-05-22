import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /*Configuraciones adicionales de variables de entorno*/
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
