const { basePath } = require('./utils/var-basePath')
const { codeInspectorPlugin } = require('code-inspector-plugin')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }))
    }
    return config
  },
  productionBrowserSourceMaps: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {}, 
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['app', 'bin', 'config', 'context', 'hooks', 'i18n', 'models', 'service', 'test', 'types', 'utils'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/apps',
        permanent: false,
      },
    ]
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'development' ? undefined : '/',
}

module.exports = withMDX(nextConfig)