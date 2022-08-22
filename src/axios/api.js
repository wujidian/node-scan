import { get, post, put } from './http'
// 环境的切换
let passportServer = '';
let nodeUrl = '';
let cloundUrl = ''
if (process.env.NODE_ENV == 'development') {
    passportServer = '/passportServer';
    nodeUrl = '/nodeUrl';
    cloundUrl = '/cloundUrl';
}
else if (process.env.NODE_ENV == 'production') {
    passportServer = window.g.passport;
    nodeUrl = window.g.nodeUrl;
    cloundUrl = window.g.cloundUrl;
}
export default {
    // 地区
    getCountry(p) { return get(passportServer + '/passport/config/countryList.json', p) },
    // 验证信息
    checkCaptcha(p) { return post(passportServer + '/verify/verify.json', p) },
    // 登录
    login(p) { return post(passportServer + '/passport/login.json', p) },
    // 注册
    register(p) { return post(passportServer + '/passport/register.do', p) },
    // 发送手机验证码
    registerMobile(p) { return post(passportServer + '/passport/register/registerMobile.json', p) },
    // 发送邮箱验证码
    registerEmail(p) { return post(passportServer + '/passport/register/registerEmail.json', p) },
    // 重置密码
    forgotPassword(p) { return post(passportServer + '/passport/reset/forgotPassword.json', p) },
    // 退出登录
    signOut(p) { return get(passportServer + '/passport/user/logout.json', p) },
    // 解绑
    unRegister(p) { return post(passportServer + '/passport/user/unRegister.json', p) },
    // 修改密码
    updatePassword(p) { return post(passportServer + '/passport/user/updatePassword.json', p) },
    //kusama验证人节点列表
    getNodeList(p) { return get(nodeUrl + '/node/list', p) },
    // 监控币种列表
    getMonitorCoinList(p) { return get(nodeUrl + '/monitor/coin-list', p) },
    // 添加监控节点
    addMonitorNode(p) { return post(nodeUrl + '/monitor/add-node', p) },
    // 已添加的监控列表地址
    getMonitorNodeList(p) { return get(nodeUrl + '/monitor/node-list', p) },
    // 添加监控离线邮箱
    addMonitorEmial(p) { return post(nodeUrl + '/monitor/add-email', p) },
    //停止监控
    stopMonitor(p) { return post(nodeUrl + '/monitor/stop', p) },
    //交易行情
    getTicker(p) { return get(nodeUrl + '/ticker', p) },
    // 区块浏览器信息
    getCoin(p) { return get(nodeUrl + '/coin/{coin_id}', p) },
    // 修改备注
    editRemarks(p) { return post(nodeUrl + '/monitor/modify-remark', p) },
    // 监控数据
    getMonitorStaticeList(p) { return get(nodeUrl + '/monitor/static-list', p) },
    // 获取邮箱
    getMonitorEmial(p) { return get(nodeUrl + '/monitor/email-address', p) },
    // 币种节点信息
    getCoinNodeInfo(p) { return get(nodeUrl + '/coin_node/info', p) },
    // 币种状态列表
    getCoinNodeStatus(p) { return get(nodeUrl + '/coin_node/{nodeId}', p) },
    // 监控概况
    getAllNodeCount(p) { return get(nodeUrl + '/monitor/all_node_online_count', p) },

    // 公告
    getNotice(p) { return get(cloundUrl + '/web/notice/index', p) },
    // 公告详情
    getNoticeCon(p) { return get(cloundUrl + '/web/notice/{id}/show', p) },
    // banner
    getBanner(p) { return get(cloundUrl + '/web/banner/list', p) },

    //app安装地址
    getAppAddress(p) { return get(cloundUrl + '/web/app-version/check-update', p) },

    // 合约包
    getContractList(p) { return get(cloundUrl + '/web/contract/list', p) },
    // 合约包详情
    getContractDetails(p) { return get(cloundUrl + '/web/contract/{id}/show', p) },
    // 用户信息
    getUserInfo(p) { return get(cloundUrl + '/web/session/{userSession}/user/user-info', p) },
    // 实名认证
    uerVerity(p) { return post(cloundUrl + '/web/session/{sessionId}/user/real-name-auth', p) },
    // 修改资金密码
    updateFundPassword(p) { return put(cloundUrl + '/web/session/{sessionId}/user/pay-password/update', p) },
    // 发送资金密码验证码
    sendFundCode(p) { return get(cloundUrl + '/web/session/{sessionId}/user/pay-password/verify-code', p) },
    // 生成订单
    addOrder(p) { return post(cloundUrl + '/web/session/{sessionId}/order/add', p) },
    // 取消订单
    cancelOrder(p) { return put(cloundUrl + '/web/session/{sessionId}/order/{uuid}/cancel', p) },
    // 支付订单
    payOrder(p) { return put(cloundUrl + '/web/session/{sessionId}/order/{uuid}/pay', p) },
    // 订单列表
    getOrderList(p) { return get(cloundUrl + '/web/session/{sessionId}/order/index', p) },
    // 支付结果
    getPayResult(p) { return get(cloundUrl + '/web/session/{sessionId}/order/{uuid}/pay-result', p) },
    // 详情
    getOrderDetails(p) { return get(cloundUrl + '/web/session/{sessionId}/order/{uuid}/show', p) },
    // 合约包列表
    getUserContractList(p) { return get(cloundUrl + '/web/session/{sessionId}/order-contract/list', p) },
    // 获取phala地址
    getPhalaAccount(p) { return get(cloundUrl + '/web/token/{sessionId}/charge-account/phala', p) },
    // 充值记录
    getRechargeList(p) { return get(cloundUrl + '/web/token/{sessionId}/charge-order/index', p) },
    // 通证余额
    getAccoutBalance(p) { return get(cloundUrl + '/web/token/{sessionId}/account/balance', p) },
    // 提现配置
    getWithdrawConfig(p) { return get(cloundUrl + '/web/token/withdraw/config', p) },
    // 提现验证码
    sendWithdrawCode(p) { return get(cloundUrl + '/web/token/{sessionId}/withdraw/get-code', p) },
    // 提现
    withdraw(p) { return post(cloundUrl + '/web/token/{sessionId}/withdraw/add', p) },
    // 提现记录
    getWithdrawList(p) { return get(cloundUrl + '/web/token/{sessionId}/withdraw/index', p) },
    // 取消提现
    cancelWithdraw(p) { return put(cloundUrl + '/web/token/{sessionId}/withdraw/{id}/cancel', p) },
    // USDT地址
    getUSDTaddr(p) { return get(cloundUrl + '/web/token/{sessionId}/charge-account/usdt', p) },
    // crust地址
    getcrustaddr(p) { return get(cloundUrl + '/web/token/{sessionId}/charge-account/crust', p) },
    // 收益记录
    getUserMining(p) { return get(cloundUrl + '/web/session/{sessionId}/mining-produce-coin-user/index', p) },
    // 累计分配
    getUserMiningHistory(p) { return get(cloundUrl + '/web/session/{sessionId}/mining-produce-coin-user/count/history', p) },
    // 昨日分配
    getUserMiningYesterday(p) { return get(cloundUrl + '/web/session/{sessionId}/mining-produce-coin-user/count/today', p) },
    // 统计算力
    getOrderCount(p) { return get(cloundUrl + '/web/session/{sessionId}/order-contract/count', p) },
}