/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS:
      process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
    NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS:
      process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
    NEXT_PUBLIC_NEXTAUTH_SESSION_MAXAGE:
      process.env.NEXT_PUBLIC_NEXTAUTH_SESSION_MAXAGE,
    NEXT_PUBLIC_COUNTDOWN_TIMER: process.env.NEXT_PUBLIC_COUNTDOWN_TIMER,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
};

export default nextConfig;
