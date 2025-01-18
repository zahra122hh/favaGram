/* eslint-disable @typescript-eslint/no-var-requires */
// const { redirect } = require('next/dist/server/api-utils')
const path = require('path')

/** @type {import('next').NextConfig} */


// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/post',
        permanent: true,
      },
    ]
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})

