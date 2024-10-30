class Constant {
    static readonly DASHBOARD = "dashboard";
    static readonly ALBUM = "album";
    static readonly NEW = "new";
    static readonly OUTFIT = "outfit";
    static readonly SERVICE = "service";
    static readonly PHOTO = "photo";

    static readonly DASHBOARD_ALBUM_URL = `/${Constant.DASHBOARD}/${Constant.ALBUM}`;
    static readonly DASHBOARD_ALBUM_NEW_URL = `${Constant.DASHBOARD_ALBUM_URL}/${Constant.NEW}`;

    static readonly DASHBOARD_PHOTO_URL = `/${Constant.DASHBOARD}/${Constant.PHOTO}`;
    static readonly DASHBOARD_PHOTO_NEW_URL = `${Constant.DASHBOARD_PHOTO_URL}/${Constant.NEW}`;

    static readonly DASHBOARD_SERVICE_URL = `/${Constant.DASHBOARD}/${Constant.SERVICE}`;
    static readonly DASHBOARD_SERVICE_NEW_URL = `${Constant.DASHBOARD_SERVICE_URL}/${Constant.NEW}`;

    static readonly DASHBOARD_OUTFIT_URL = `/${Constant.DASHBOARD}/${Constant.OUTFIT}`;
    static readonly DASHBOARD_OUTFIT_NEW_URL = `${Constant.DASHBOARD_OUTFIT_URL}/${Constant.NEW}`;


    static readonly API_BASE=process.env.NEXT_PUBLIC_API_BASE;
}

export {Constant};
