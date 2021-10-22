//正则表达式
// 时间戳转日期
export function formatDate(date, fmt) {
    //获取年份
    // y+ : 1个或者多个y
    // y* : 0个或者多个y
    // y? : 0个或者1个y

    // 2020
    // yy : 20
    // yyyy : 2020
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(), //h(12小时制)H(24小时制)
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    // 截取字符串长度 0004 截取00 得出04 004 截取0 得出04 巧妙算法
    return ('00' + str).substr(str.length);
};