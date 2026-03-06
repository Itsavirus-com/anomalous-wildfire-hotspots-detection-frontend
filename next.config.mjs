/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile deck.gl and related packages (ESM-only)
  transpilePackages: ['@deck.gl/react', '@deck.gl/core', '@deck.gl/geo-layers', '@deck.gl/layers', '@deck.gl/mapbox'],
}

export default nextConfig
