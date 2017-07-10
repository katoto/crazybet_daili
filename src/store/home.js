
import ajax from '~common/ajax'
import {platform, src, getCk, namespace, cptype, convertArrToObj, convertToQueryString} from '~common/util'

const ns = namespace('home')

const state = {
    matchList_hot: null,  // 热门赛事
    matchList_play: null,  // 直播中
    matchList_noEnd: null,  // 全部赛事，未结束
    matchList_end: null,  // 结束列表
    crazymainScrollData: null,  // 滚动数据
    scrollNumber:'7545',
    matchHotData: null,
    currentBetSelect: null,
    faqiState: 0, // 发起订单状态， 0代表没有发起， 1代表前端点击了， 服务端还没返回，2代表订单确认成功,
    rankList: null,  // 排行榜
    signList: null,  // 签到列表
    showRankbox: false,  //  显示，隐藏盈利榜
    showSignbox: false,   // 显示，隐藏 签到框
    showJinbi: { isShow: false, coinNumber: null, coinTitle: '' },  // 显示，金币 标题

    matchList_interval: null,  // 定时器用
    matchIDStr: '',    // 比赛id 字符串
    BackOddsChange: {},  // 赔率改变变化颜色
    runListNumber: 0,
    hidehotMatchID: 0, // 隐藏列表里的焦点赛事
    selectedNum: 0 // 选择金币

}

export const actionTypes = {
    getcrazyMainInfo: ns('getcrazyMainInfo'),


}
export const mutationTypes = {
    homeInfo: ns('homeInfo'),

}
const mutations = {

}
const actions = {

}

export default {state, mutations, actions}
