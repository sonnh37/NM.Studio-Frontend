// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", // Thay 'yourdomain.com' bằng tên miền của bạn
  generateRobotsTxt: true, // Tạo file robots.txt tự động
  sitemapSize: 20,
  transform: async (config, path) => {
    // Kiểm tra nếu URL bắt đầu bằng /dashboard, trả về null để loại trừ
    if (path.startsWith("/dashboard")) {
      return null; // Loại bỏ trang này khỏi sitemap
    }
    return {
      loc: path, // URL sẽ được bao gồm trong sitemap
      lastmod: new Date().toISOString(), // Thời gian sửa đổi trang
    };
  },
};
