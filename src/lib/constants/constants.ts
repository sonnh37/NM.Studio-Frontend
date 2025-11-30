export class Constants {
  // information
  static readonly TELEPHONE = "0908173841";
  static readonly GMAIL = "nhumystudio@gmail.com";
  static readonly SOCIAL_FACEBOOK = "https://www.facebook.com/NhuMyMakeUp";
  static readonly SOCIAL_INSTAGRAM = "https://www.instagram.com/nhumystudio";
  static readonly SOCIAL_TIKTOK =
    "https://www.tiktok.com/@nhumystudio?lang=vi-VN";
  //#region Environment Variables
  static readonly CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE;
  static readonly API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}`;
  static readonly BASE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}`;
  //#endregion
  static readonly SERVICE_BOOKINGS = "servicebookings";
  static readonly ALBUMS = "albums";
  static readonly ALBUM_IMAGES = "albumimages";
  static readonly MEDIA_BASES = "mediabases";
  static readonly HOME_SLIDES = "homeslides";
  static readonly PRODUCTS = "products";
  static readonly PRODUCT_MEDIAS = "productmedias";
  static readonly PRODUCT_SIZES = "productsizes";
  static readonly PRODUCT_VARIANTS = "productvariants";
  static readonly SERVICES = "services";
  static readonly IMAGES = "images";
  static readonly CATEGORIES = "categories";
  static readonly SUBCATEGORIES = "subcategories";
  static readonly COLORS = "colors";
  static readonly SIZES = "sizes";
  static readonly BLOGS = "blogs";
  static readonly USERS = "users";
  static readonly AUTH = "auth";
  static readonly CARTS = "CARTS";
  static readonly CART_ITEMS = "cartitems";
  static readonly ORDERS = "orders";
  static readonly ORDER_ITEMS = "orderitems";
  static readonly ORDER_STATUS_HISTORIES = "orderstatushistories";
  static readonly PAYMENTS = "payments";
  static readonly VOUCHERS = "vouchers";
  static readonly VOUCHER_USAGE_HISTORIES = "voucherusagehistories";

  static readonly DASHBOARD = "dashboard";
  static readonly DASHBOARD_URL = "/dashboard";
  static readonly NEW = "new";
  static readonly DASHBOARD_BOOKING_URL = `/${Constants.DASHBOARD}/${Constants.SERVICE_BOOKINGS}`;
  static readonly DASHBOARD_BOOKING_NEW_URL = `${Constants.DASHBOARD_BOOKING_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_ALBUM_URL = `/${Constants.DASHBOARD}/${Constants.ALBUMS}`;
  static readonly DASHBOARD_ALBUM_NEW_URL = `${Constants.DASHBOARD_ALBUM_URL}/${Constants.NEW}`;

  // static readonly DASHBOARD_PHOTO_URL = `/${Const.DASHBOARD}/${Const.MEDIA_FILES}`;
  // static readonly DASHBOARD_PHOTO_NEW_URL = `${Const.DASHBOARD_PHOTO_URL}/${Const.NEW}`;

  static readonly DASHBOARD_SERVICE_URL = `/${Constants.DASHBOARD}/${Constants.SERVICES}`;
  static readonly DASHBOARD_SERVICE_NEW_URL = `${Constants.DASHBOARD_SERVICE_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_PRODUCT_URL = `/${Constants.DASHBOARD}/${Constants.PRODUCTS}`;
  static readonly DASHBOARD_PRODUCT_NEW_URL = `${Constants.DASHBOARD_PRODUCT_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_BLOG_URL = `/${Constants.DASHBOARD}/${Constants.BLOGS}`;
  static readonly DASHBOARD_BLOG_NEW_URL = `${Constants.DASHBOARD_BLOG_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_COLOR_URL = `/${Constants.DASHBOARD}/${Constants.COLORS}`;
  static readonly DASHBOARD_COLOR_NEW_URL = `${Constants.DASHBOARD_COLOR_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_SIZE_URL = `/${Constants.DASHBOARD}/${Constants.SIZES}`;
  static readonly DASHBOARD_SIZE_NEW_URL = `${Constants.DASHBOARD_SIZE_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_SUBCATEGORY_URL = `/${Constants.DASHBOARD}/${Constants.SUBCATEGORIES}`;
  static readonly DASHBOARD_SUBCATEGORY_NEW_URL = `${Constants.DASHBOARD_SUBCATEGORY_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_CATEGORY_URL = `/${Constants.DASHBOARD}/${Constants.CATEGORIES}`;
  static readonly DASHBOARD_CATEGORY_NEW_URL = `${Constants.DASHBOARD_CATEGORY_URL}/${Constants.NEW}`;

  static readonly DASHBOARD_USER_URL = `/${Constants.DASHBOARD}/${Constants.USERS}`;
  static readonly DASHBOARD_USER_NEW_URL = `${Constants.DASHBOARD_USER_URL}/${Constants.NEW}`;

  static readonly IMAGE_DEFAULT_URL = "/image-notfound.png";

  static readonly IMAGE_EXT_STRING =
    ".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff,.tif,.avif,.heic";

  static readonly VIDEO_EXT_STRING =
    ".mp4,.mov,.avi,.mkv,.wmv,.flv,.webm,.m4v,.mpeg,.mpg,.3gp";
}
