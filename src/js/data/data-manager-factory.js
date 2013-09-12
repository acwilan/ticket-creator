var DataManagerFactory = {
    getDataManager: function(str) {
        if ((/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/).test(str)) {
            return new JsonDataManager(str);
        } else {
            return undefined;
        }
    }
};