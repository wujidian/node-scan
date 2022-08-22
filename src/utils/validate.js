let tel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
let email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
let validateCode = /^\d{6}$/;
let password = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
let FormValidate = (function () {
    function FormValidate() { }
    FormValidate.Form = function () {
        return {
            // 手机号验证
            checkMobile: function (rule, value, callback) {
                if (!tel.test(value)) {
                    callback(new Error('手机号格式错误'));
                } else {
                    callback();
                }
            },
            // 邮箱验证
            checkEmail: function (rule, value, callback) {
                if (!email.test(value)) {
                    callback(new Error('邮箱格式错误'));
                } else {
                    callback();
                }
            },
            // 密码验证
            checkPassWord: function (rule, value, callback) {
                if (!password.test(value)) {
                    callback(new Error('请输入6-20位包含数字和字母的密码'));
                } else {
                    callback();
                }
            },
            // 验证码验证
            checkCode: function (rule, value, callback) {
                if (!validateCode.test(value)) {
                    callback(new Error('请输入6位数字'));
                } else {
                    callback();
                }
            },
        }
    }
    return FormValidate
}())
export default {
    FormValidate
} 