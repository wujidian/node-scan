import api from '../axios/api'
// 发送验证码
var timer = null;
export function codeMsg(el) {
    var getCode = document.getElementById(el);
    var countdown = 90;
    var settime = () => {
        if (countdown == 0) {
            getCode.removeAttribute("disabled");
            getCode.innerHTML = '获取验证码';
            countdown = 90;
            clearTimeout(timer);
        } else {
            getCode.innerHTML = countdown + "s";
            getCode.disabled = true;
            countdown--;
            timer = setTimeout(() => {
                settime(getCode);
            }, 1000);
        }
    };
    settime();
}
// 阿里滑动验证
function init(callback) {
    window.vm.$api
        .checkCaptcha({
            action: "verifyTypes"
        })
        .then(res => {
            var scene = '';
            var is_iPd = navigator.userAgent.match(/(iPad|iPod|iPhone)/i) != null;
            var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|win ce)/i) != null;
            if (is_iPd) {
                scene = "nc_login_h5";
            } else if (is_mobi) {
                scene = "nc_login_h5";
            } else {
                scene = "nc_login";
            }
            var token = res.messages.data.verifyInfos[3].appKey
            var nc_token = [token, new Date().getTime(), Math.random()].join(":");
            var NC_Opt = {
                renderTo: "#captcha",
                appkey: token,
                scene: scene,
                token: nc_token,
                customWidth: 300,
                trans: { key1: "code0" },
                elementID: ["usernameID"],
                is_Opt: 0,
                language: "cn",
                isEnabled: true,
                timeout: 3000,
                times: 5,
                apimap: {},
                callback: (data) => {
                    const verifyCode = JSON.stringify({
                        scene,
                        token: nc_token,
                        sessionId: data.csessionid,
                        sig: data.sig
                    });
                    callback(verifyCode);
                }
            };
            var nc = new noCaptcha(NC_Opt);
            nc.upLang("cn", {
                _startTEXT: "请按住滑块，拖动到最右边",
                _yesTEXT: "验证通过",
                _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
                _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>"
            });
        });
}

export function aliyunVerify(verifyId, callback) {
    init(verifyCode => {
        window.vm.$api
            .checkCaptcha({
                action: "verify",
                verifyCode: verifyCode,
                verifyType: "aliyun",
                verifyId: verifyId
            })
            .then(res => {
                callback(res);
            });
    })

}
// 用户信息
export function getUserInfo(callback) {
    let passport = localStorage.getItem('passport');
    if (passport) {
        api
            .getUserInfo({
                userSession: passport
            })
            .then(res => {
                window.vm.$store.dispatch("getInfo", res.data[0]);
                callback && callback(true)
            }).catch(err => {
                window.vm.$store.dispatch("getInfo", '');
                localStorage.setItem('passport', '');
                callback && callback(err.message)
            })
    } else {
        window.vm.$store.dispatch("getInfo", '');
    }
}
