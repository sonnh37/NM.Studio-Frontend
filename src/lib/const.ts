class Const {
    //#region Environment Variables
    static readonly CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE;
    static readonly API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}`; 
    //#endregion

    
    static readonly ALBUM = "albums";
    static readonly ALBUM_X_PHOTO = "albums/albumXPhotos";
    static readonly PRODUCT = "products";
    static readonly PRODUCT_X_PHOTO = "products/productXPhotos";
    static readonly SERVICE = "services";
    static readonly PHOTO = "photos";
    static readonly CATEGORY = "categories";

    static readonly DASHBOARD = "dashboard";
    static readonly NEW = "new";
    static readonly DASHBOARD_ALBUM_URL = `/${Const.DASHBOARD}/${Const.ALBUM}`;
    static readonly DASHBOARD_ALBUM_NEW_URL = `${Const.DASHBOARD_ALBUM_URL}/${Const.NEW}`;
    static readonly DASHBOARD_PHOTO_URL = `/${Const.DASHBOARD}/${Const.PHOTO}`;
    static readonly DASHBOARD_PHOTO_NEW_URL = `${Const.DASHBOARD_PHOTO_URL}/${Const.NEW}`;
    static readonly DASHBOARD_SERVICE_URL = `/${Const.DASHBOARD}/${Const.SERVICE}`;
    static readonly DASHBOARD_SERVICE_NEW_URL = `${Const.DASHBOARD_SERVICE_URL}/${Const.NEW}`;
    static readonly DASHBOARD_PRODUCT_URL = `/${Const.DASHBOARD}/${Const.PRODUCT}`;
    static readonly DASHBOARD_PRODUCT_NEW_URL = `${Const.DASHBOARD_PRODUCT_URL}/${Const.NEW}`;


    //#region API Endpoints
    static readonly API_ALBUM = `${this.API_BASE}/${Const.ALBUM}`;
    static readonly API_PRODUCT = `${this.API_BASE}/${Const.PRODUCT}`;
    static readonly API_SERVICE = `${this.API_BASE}/${Const.SERVICE}`;
    static readonly API_PHOTO = `${this.API_BASE}/${Const.PHOTO}`;
    static readonly API_CATEGORY = `${this.API_BASE}/${Const.CATEGORY}`;
    static readonly API_ALBUM_X_PHOTO = `${this.API_BASE}/${Const.ALBUM_X_PHOTO}`;
    static readonly API_PRODUCT_X_PHOTO = `${this.API_BASE}/${Const.PRODUCT_X_PHOTO}`;
}

export {Const};
