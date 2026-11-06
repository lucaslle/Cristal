import { createMDX } from 'fumadocs-mdx/next';

const basePath = '/Cristal';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
};

export default createMDX()(config);
