function datetimeparse(timestamp, format, prefix) {
    let currentZoneTime = new Date(timestamp);
    // 兼容mac
    if (currentZoneTime === 'Invalid Date') {
        currentZoneTime = new Date(timestamp.replace(/\-/g, '/').replace(/T/, ' '));
    }
    let currentTimestamp = currentZoneTime.getTime();
    //转换时区
    let offsetZone = currentZoneTime.getTimezoneOffset() / 60;//如果offsetZone>0是西区，西区晚
    let offset = null;
    //客户端时间与服务器时间保持一致，固定北京时间东八区。
    offset = offsetZone + 8;
    currentTimestamp = currentTimestamp + offset * 3600 * 1000
    let newtimestamp = null;
    if (currentTimestamp) {
        if (currentTimestamp.toString().length === 13) {
            newtimestamp = currentTimestamp.toString()
        } else if (currentTimestamp.toString().length === 10) {
            newtimestamp = currentTimestamp + '000'
        } else {
            newtimestamp = null
        }
    } else {
        newtimestamp = null
    }
    ;
    let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
    let YYYY = dateobj.getFullYear()
    let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
    let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
    let HH = dateobj.getHours() > 9 ? dateobj.getHours() : '0' + dateobj.getHours()
    let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
    let ss = dateobj.getSeconds() > 9 ? dateobj.getSeconds() : '0' + dateobj.getSeconds()
    let output = '';
    let separator = '-'
    if (format) {
        separator = format.match(/-/) ? '-' : '-'
        output += format.match(/yy/i) ? YYYY : ''
        output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
        output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
        output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
        output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
        output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
    } else {
        output += YYYY + separator + MM + separator + DD
    }
    output = prefix ? (prefix + output) : output
    return newtimestamp ? output : ''
}
// 小数位切割
const dataIntercept = (data, digits) => {
    if (data == undefined) {
        return 0
    }
    if (parseFloat(data) == 0) {
        return 0;
    }
    if (isNaN(data)) {
        return 0;
    }
    var num = data;
    if ((typeof data) != 'string') {
        num = data.toString();
    }
    var index = num.indexOf(".");
    if (index == -1) {
        return num;
    } else {
        var result = num.substring(0, index + digits + 1);
        return result
    }
}
// 倒计时
const dataFilter = value => {
    if (!value) return 0;
    var days = parseInt(value / 1000 / 60 / 60 / 24, 10);
    var hours = parseInt((value / 1000 / 60 / 60) % 24, 10);
    var minutes = parseInt((value / 1000 / 60) % 60, 10);
    var seconds = parseInt((value / 1000) % 60, 10);
    days = days <= 9 ? "0" + days : days;
    hours = hours <= 9 ? "0" + hours : hours;
    minutes = minutes <= 9 ? "0" + minutes : minutes;
    seconds = seconds <= 9 ? "0" + seconds : seconds;
    return minutes + "分钟" + seconds + "秒";
}
/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 * 
 * @param num1被乘数 | num2乘数
 */
function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}
const numMulti = (num1, num2) => {
    if (myIsNaN(num1) && myIsNaN(num2)) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    } else {
        return 0
    }

};
export default {
    datetimeparse,
    dataIntercept,
    dataFilter,
    numMulti
}