import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
  }
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig);