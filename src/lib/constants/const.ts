export class Const {
    // information
    static readonly TELEPHONE = "0908173841";
    static readonly GMAIL = "nhumystudio@gmail.com";
    static readonly SOCIAL_FACEBOOK = "https://www.facebook.com/NhuMyMakeUp";
    static readonly SOCIAL_INSTAGRAM = "https://www.instagram.com/nhumystudio";
    static readonly SOCIAL_TIKTOK = "https://www.tiktok.com/@nhumystudio?lang=vi-VN";
    //#region Environment Variables
    static readonly CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE;
    static readonly API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}`;
    static readonly BASE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}`;
    //#endregion
    static readonly BOOKING = "bookings";
    static readonly ALBUM = "albums";
    static readonly ALBUM_X_PHOTO = "albums/albumXPhotos";
    static readonly PRODUCT = "products";
    static readonly PRODUCT_X_PHOTO = "products/productXPhotos";
    static readonly PRODUCT_X_SIZE = "products/productXSizes";
    static readonly PRODUCT_X_COLOR = "products/productXColors";
    static readonly SERVICE = "services";
    static readonly PHOTO = "photos";
    static readonly CATEGORY = "categories";
    static readonly SUBCATEGORY = "subcategories";
    static readonly COLOR = "colors";
    static readonly SIZE = "sizes";
    static readonly BLOG = "blogs";
    static readonly USER = "users";
    static readonly AUTH = "auth";

    static readonly DASHBOARD = "dashboard";
    static readonly DASHBOARD_URL = "/dashboard";
    static readonly NEW = "new";
    static readonly DASHBOARD_BOOKING_URL = `/${Const.DASHBOARD}/${Const.BOOKING}`;
    static readonly DASHBOARD_BOOKING_NEW_URL = `${Const.DASHBOARD_BOOKING_URL}/${Const.NEW}`;

    static readonly DASHBOARD_ALBUM_URL = `/${Const.DASHBOARD}/${Const.ALBUM}`;
    static readonly DASHBOARD_ALBUM_NEW_URL = `${Const.DASHBOARD_ALBUM_URL}/${Const.NEW}`;

    static readonly DASHBOARD_PHOTO_URL = `/${Const.DASHBOARD}/${Const.PHOTO}`;
    static readonly DASHBOARD_PHOTO_NEW_URL = `${Const.DASHBOARD_PHOTO_URL}/${Const.NEW}`;

    static readonly DASHBOARD_SERVICE_URL = `/${Const.DASHBOARD}/${Const.SERVICE}`;
    static readonly DASHBOARD_SERVICE_NEW_URL = `${Const.DASHBOARD_SERVICE_URL}/${Const.NEW}`;

    static readonly DASHBOARD_PRODUCT_URL = `/${Const.DASHBOARD}/${Const.PRODUCT}`;
    static readonly DASHBOARD_PRODUCT_NEW_URL = `${Const.DASHBOARD_PRODUCT_URL}/${Const.NEW}`;

    static readonly DASHBOARD_BLOG_URL = `/${Const.DASHBOARD}/${Const.BLOG}`;
    static readonly DASHBOARD_BLOG_NEW_URL = `${Const.DASHBOARD_BLOG_URL}/${Const.NEW}`;

    static readonly DASHBOARD_COLOR_URL = `/${Const.DASHBOARD}/${Const.COLOR}`;
    static readonly DASHBOARD_COLOR_NEW_URL = `${Const.DASHBOARD_COLOR_URL}/${Const.NEW}`;

    static readonly DASHBOARD_SIZE_URL = `/${Const.DASHBOARD}/${Const.SIZE}`;
    static readonly DASHBOARD_SIZE_NEW_URL = `${Const.DASHBOARD_SIZE_URL}/${Const.NEW}`;

    static readonly DASHBOARD_SUBCATEGORY_URL = `/${Const.DASHBOARD}/${Const.SUBCATEGORY}`;
    static readonly DASHBOARD_SUBCATEGORY_NEW_URL = `${Const.DASHBOARD_SUBCATEGORY_URL}/${Const.NEW}`;

    static readonly DASHBOARD_CATEGORY_URL = `/${Const.DASHBOARD}/${Const.CATEGORY}`;
    static readonly DASHBOARD_CATEGORY_NEW_URL = `${Const.DASHBOARD_CATEGORY_URL}/${Const.NEW}`;

    static readonly DASHBOARD_USER_URL = `/${Const.DASHBOARD}/${Const.USER}`;
    static readonly DASHBOARD_USER_NEW_URL = `${Const.DASHBOARD_USER_URL}/${Const.NEW}`;


    static readonly FADE_BOTTOM_ANIMATION_VARIANTS = {
        hidden: {opacity: 0, y: -10},
        show: {opacity: 1, y: 0, transition: {type: "spring", duration: 0.5}}, // Thêm duration
    };
    static readonly FADE_TOP_ANIMATION_VARIANTS = {
        hidden: {opacity: 0, y: 10},
        show: {opacity: 1, y: 0, transition: {type: "spring", duration: 0.5}}, // Thêm duration
    };
    static readonly FADE_RIGHT_ANIMATION_VARIANTS = {
        hidden: {opacity: 0, x: -10},
        show: {opacity: 1, x: 0, transition: {type: "spring", duration: 0.5}}, // Thêm duration
    };
    static readonly FADE_LEFT_ANIMATION_VARIANTS = {
        hidden: {opacity: 0, x: 10},
        show: {opacity: 1, x: 0, transition: {type: "spring", duration: 0.5}}, // Thêm duration
    };
}

