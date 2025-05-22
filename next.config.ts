import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*Configuraciones adicionales de variables de entorno*/
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// next.config.js
module.exports = {
  output: 'export',
}


export default nextConfig;
