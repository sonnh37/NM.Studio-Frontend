// next-sitemap.js
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL, // Thay 'yourdomain.com' bằng tên miền của bạn
    generateRobotsTxt: true, // Tạo file robots.txt tự động
    sitemapSize: 7000, // Số lượng trang tối đa trong sitemap
  };