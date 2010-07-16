var check = function(r) {
    return r.test(navigator.userAgent.toLowerCase());
};

Ext.isGecko4 = Ext.isGecko && check(/rv:2\.0/);