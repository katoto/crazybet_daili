/**
 * Created by lichun on 2017/5/10.
 */

import Vue from 'vue'
import ajax from '~common/ajax'
import {platform, src, getCk, mapMutations, mapActions, convertToQueryString} from '~common/util'
const ns = 'my'

const state = {
    goldList: null,
    messageList: [],
    chargeList: null,
    isChargeSucc: null,
    messPageNum: 1,

    isReadyGet: true, // msg
    isNoneMessList: false,  // 我的消息bug
    isAddMessList: false,

    bannerScrollData: null,
    goodslist: [],
    footballPropsList: null,
    luckMessData: null,
    winInformation: {},
    addressMess: null,
    showPrizeList: false,
    showAddress: false,   // 显示地址
    showLuckydraw: false,
    showTapBox: false,   // 显示帮助
    showDrawTap: false,   //  显示 商城页的下拉选择
    showForward: true,  // 请进的箭头
    winGoodslist: null,
    logisticMess: null,   // 物流订单详情
    confirmAddrBtn: false,   // 确认地址按钮
    showWinCopyWriter: true,  // 抽奖文案 ,防商品缺少的情况
    showLogisticTap: false,
    jumptoSee: false,  //  保存跳转到查看
    toSee: false,
    showGotoLuck: false,
    showGotoSeeContain: false,
    showGotoMainList: true,
    showGotowinRecord: false,
    currentLogistic: null,  //  当前实物项 物流 信息
    AddressId: null,
    isSupportCopy: false,
    isShowCopyBox: false,
    copyValue: '',
    wxCode: null,
    thunderList: null,
    chooseIDCartNumber: null
}

const mutationsInfo = mapMutations({

    setInitLuckDraw (state, goldList) {
        // 初始化奖品场
        state.showLuckydraw = false
        state.showGotoLuck = false
        state.showGotoSeeContain = false
        state.showGotowinRecord = false
        state.showTapBox = false
        state.showAddress = false
        state.showGotoMainList = true
        state.thunderList = null
    },
    setGoldList (state, goldList) {
        state.goldList = goldList
    },
    setGoodsList (state, goodsList) {
        state.goodslist = goodsList
    },
    setAddressMess (state, addressMess) {
        state.addressMess = addressMess
    },
    setBannerScrollData (state, bannerScrollData) {
        state.bannerScrollData = bannerScrollData
    },
    setChargeList (state, chargeList) {
        state.chargeList = chargeList
    },
    setFootballPropsList (state, footballPropsList) {
        state.footballPropsList = footballPropsList
    },
    setMessageList (state, messageList) {
        state.messageList = messageList
    },
    setWinGoodList (state, winGoodList) {
        state.winGoodslist = winGoodList
    },
    setGotoLuckMess (state, luckMessData) {
        luckMessData && (luckMessData.img_url = '')
        state.luckMessData = luckMessData
    },
    setChooseIDCartNumber (state, data) {
        //  电话卡
        state.chooseIDCartNumber = data
    },
    setWxZfCode (state, code) {
        state.wxCode = code
    },
    lqSuccess (state, prizeInfo) {
        // 得测试一下

        let lqMsg = null
        state.messageList.forEach((msg) => {
            if (msg.pid === prizeInfo.pid) {
                lqMsg = msg
            }
        })

        Vue.set(lqMsg, 'showSucc', true)
        setTimeout(() => {
            state.messageList.some((msg, index) => {
                if (msg.pid === prizeInfo.pid) {
                    msg.valid = false
                    lqMsg = msg
                    Vue.set(lqMsg, 'showSucc', false)
                    return true
                }
            })
        }, 800)
    },
    setLuckGoodBingo (state, winInformation) {
        state.showWinCopyWriter = false
        state.winInformation = winInformation
    },
    setLogisticMess (state, logisticMess) {
        state.logisticMess = logisticMess
    },
    setThunderList (state, thunderList) {
        state.showTapBox = true
        state.thunderList = thunderList
    }
}, ns)
const actionsInfo = mapActions({

    async do500_qqsdPay ({commit, dispatch}, params) {
        try {
            // 1,2  2  表示成功的回调
            params = Object.assign({}, params, {
                ck: getCk(),
                platform: platform,
                src: src
            })
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)

            const newChatData = Object.assign({}, weChatData, {'type': '14'})
            delete newChatData.product_id
            delete newChatData.product_name
            delete newChatData.return_url

            console.log({
                'pid': weChatData.product_id,
                'fee': weChatData.paymoney,
                'title': weChatData.product_name,
                'pay_type': '1', /* 1微信支付 2 支付宝支付 */
                'mix': newChatData
            })
            if (window.qqsdApp && weChatData) {
                try {
                    // app 支付
                    qqsdApp.invoke('app_pay', {
                        'pid': weChatData.product_id,
                        'fee': weChatData.paymoney,
                        'title': weChatData.product_name,
                        'pay_type': '2', /* 1微信支付 2 支付宝支付 */
                        'mix': newChatData
                    })
                } catch (e) {
                    dispatch('showToast', '500qqsd支付出错')
                }
            } else {
                //  touch 支付
                // alert('走的H5 pay')
                dispatch('showToast', '支付失败请刷新重试')
                // location.replace(payUrl + '?' + convertToQueryString(params))
            }
        } catch (e) {
            if (e.code === '101') {
            } else {
                dispatch('showToast', e.message)
            }
        }
    },

    //  迅雷列表  缺一个请求
    async getThunderList ({commit, dispatch}) {
        try {
            const thunderList = await ajax.get(`/thunder/activate/code/list?ck=${getCk()}&platform=${platform}&src=${src}`)
            commit(mTypes.setThunderList, thunderList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getGoldList ({commit, dispatch}, matchid) {
        if (matchid === 'undefined' || matchid === undefined) {
            matchid = 0
        }
        try {
            const goldlist = await ajax.post(`/trade/gold/list?matchid=${matchid}&ck=${getCk()}&platform=${platform}&src=${src}`)

            commit(mTypes.setGoldList, goldlist)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getGoodsList ({commit, dispatch}) {
        try {
            const goodsList = await ajax.get(`/shops/goods/lists?platform=${platform}&src=${src}`)
            commit(mTypes.setGoodsList, goodsList)
        } catch (e) {
            if (~e.message.indexOf('未登录') || ~e.message.indexOf('其他设备登录')) {
                dispatch('clearLoginState', 0)
                dispatch('doAuth')
                return false
            }
            dispatch('showToast', e.message)
        }
    },
    async getWinGoodList ({commit, dispatch}) {
        try {
            const winGoodList = await ajax.get(`/shops/lottery/records?&ck=${getCk()}&page=1&limit=100&src=${src}&platform=${platform}`)
            commit(mTypes.setWinGoodList, winGoodList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getAddressMess ({commit, dispatch, state}) {
        try {
            const addressMess = await ajax.get(`/shipping/address/get?platform=${platform}&ck=${getCk()}&src=${src}`)
            if (!Object.keys(addressMess).length) {
                addressMess.consignee = ''
                addressMess.mobile = ''
                addressMess.street = ''
                addressMess.isEmptyAdd = true
            } else {
                addressMess.isEmptyAdd = false
            }
            addressMess.province = addressMess.province || ''
            addressMess.city = addressMess.city || ''
            addressMess.district = addressMess.district || ''

            addressMess.allAddress = '' + addressMess.province + addressMess.city + addressMess.district
            state.AddressId = addressMess.aid  // TODO 这里要改掉
            commit(mTypes.setAddressMess, addressMess)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getHomeInfo ({commit, dispatch, state}) {
        try {
            const homeInfo = await ajax.get(`/home/info?location=shops&src=${src}&platform=${platform}`)
            if (homeInfo.banner) {
                if (homeInfo.banner.length) {
                    commit(mTypes.setBannerScrollData, homeInfo.banner)
                } else {
                    const bannerScrollData = []
                    bannerScrollData.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
                    bannerScrollData.push('恭喜小土豆**抽到<strong>500元京东卡</strong>')
                    bannerScrollData.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
                    commit(mTypes.setBannerScrollData, bannerScrollData)
                }
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getChargeList ({commit, dispatch}) {
        try {
            const chargeList = await ajax.get(`/shops/golds/list?ck=${getCk()}&platform=${platform}&src=${src}`)
            commit(mTypes.setChargeList, chargeList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getFootballPropsList ({commit, dispatch}) {
        try {
            const footballPropsList = await ajax.get(`/personal/props/list?ck=${getCk()}&src=${src}&platform=${platform}`)
            commit(mTypes.setFootballPropsList, footballPropsList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getGotoLuckMess ({commit, dispatch}, item) {
        try {
            const {goods_detail, restcard} = await ajax.get(`/shops/goods/detail?ck=${getCk()}&goodsid=${item.goodsid}&platform=${platform}&src=${src}&goodstype=${item.goodstype}&company=${item.company}`)
            commit(mTypes.setGotoLuckMess, goods_detail)

            commit(mTypes.setChooseIDCartNumber, restcard)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getMessageList ({commit, dispatch, state}, pageNum = 1) {
        if (state.isReadyGet && !state.isNoneMessList) {
            state.isReadyGet = false
            state.isAddMessList = true
            try {
                const {notifies_list} = await ajax.get(`/notify/pull?ck=${getCk()}&platform=${platform}&page=${pageNum}&src=${src}`)
                state.isAddMessList = false
                state.isReadyGet = true
                notifies_list.forEach(item => {
                    item.valid = true
                })
                if (pageNum === 1) {
                    state.messageList = []
                }
                let messageList = [...state.messageList]
                if (notifies_list.length <= 0) {
                    state.isNoneMessList = true
                    return false
                }
                state.messPageNum++
                // eslint-disable-next-line
                messageList = messageList.concat(notifies_list)
                commit(mTypes.setMessageList, messageList)
            } catch (e) {
                dispatch('showToast', e.message)
            }
        }
    },
    async lqPrize ({commit, dispatch}, pid) {
        try {
            const prizeInfo = await ajax.get(`/activity/prize/dole?pid=${pid}&ck=${getCk()}&platform=${platform}&src=${src}`)
            prizeInfo.prize.pid = pid
            commit(mTypes.lqSuccess, prizeInfo.prize)
            dispatch('getUserInfo')
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getLuckGoodBingo ({commit, dispatch}, obj) {
        try {
            let sendLuckStr = ''
            if (obj.company) {
                sendLuckStr = `/shops/goods/bingo?ck=${getCk()}&goodsid=${obj.currGoodsid}&consumgolds=${obj.currConsumgolds}&platform=${platform}&goodstype=${obj.goodstype}&src=${src}&company=${obj.company}`
            } else {
                sendLuckStr = `/shops/goods/bingo?ck=${getCk()}&goodsid=${obj.currGoodsid}&consumgolds=${obj.currConsumgolds}&platform=${platform}&goodstype=${obj.goodstype}&src=${src}`
            }
            const luckGoodBingo = await ajax.get(sendLuckStr)
            commit(mTypes.setLuckGoodBingo, luckGoodBingo)
        } catch (e) {
            state.showWinCopyWriter = true
            dispatch('showToast', e.message)
        }
    },
    /**
     * deprecated 此方法没有用到
     * @param commit
     * @param dispatch
     * @param oid
     */
    async addAddress ({state, commit, dispatch}, oid) {
        let ck = getCk()
        let newOid = ''

        if (!state.addressMess.consignee) {
            state.addressMess.consignee = ''
        }
        if (!state.addressMess.province) {
            state.addressMess.province = ''
        }
        if (!state.addressMess.city) {
            state.addressMess.city = ''
        }
        if (!state.addressMess.district) {
            state.addressMess.district = ''
        }
        if (!state.addressMess.street) {
            state.addressMess.street = ''
        }
        // 订单id
        // 判断一下 oid

        if (oid) {
            newOid = oid
            state.confirmAddrBtn = true
        } else {
            newOid = ''
        }
        if (!state.AddressId) {
            state.AddressId = ''
        }
        if (!state.addressMess.mobile) {
            state.addressMess.mobile = ''
        }
        try {
            const result = await ajax.get(`/shipping/address/add?platform=${platform}&ck=${ck}&consignee=${state.addressMess.consignee}&mobile=${state.addressMess.mobile}
&country=中国&city=${state.addressMess.city}&province=${state.addressMess.province}&district=${state.addressMess.district}&street=${state.addressMess.street}
&oid=${newOid}&aid=${state.AddressId}&src=${src}`)
            // 如果是未确认的保存
            state.AddressId = result.aid
            if (state.jumptoSee) {
                // 显示查看
                state.showForward = true
                state.showDrawTap = false
                state.showTapBox = false
                state.showAddress = false

                state.showGotowinRecord = false
                state.showGotoLuck = false
                state.showGotoSeeContain = true
            } else {
                state.showForward = true
                state.showDrawTap = false
                state.showTapBox = false
                state.showAddress = false
            }
            dispatch('showToast', result.msg)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getLogisticMess ({commit, dispatch}, orderNum) {
        try {
            const logisticMess = await ajax.get(`/logistics/get?sid=${orderNum}&src=${src}`)
            commit(mTypes.setLogisticMess, logisticMess)
            setTimeout(() => {
                state.showLogisticTap = true
            }, 0)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async modifyAddress ({commit, dispatch}, oid) {
        let ck = getCk()

        let newOid = ''

        if (!state.addressMess.consignee) {
            state.addressMess.consignee = ''
        }
        if (!state.addressMess.province) {
            state.addressMess.province = ''
        }
        if (!state.addressMess.city) {
            state.addressMess.city = ''
        }
        if (!state.addressMess.district) {
            state.addressMess.district = ''
        }
        if (!state.addressMess.street) {
            state.addressMess.street = ''
        }

        if (!state.AddressId) {
            state.AddressId = ''
        }

        if (oid) {
            newOid = oid
            state.confirmAddrBtn = true
        } else {
            newOid = ''
        }
        if (!state.addressMess.mobile) {
            state.addressMess.mobile = ''
        }
        try {
            await ajax.get(`/shipping/address/modify?platform=${platform}&ck=${ck}&consignee=${state.addressMess.consignee}&mobile=${state.addressMess.mobile}
&country=中国&city=${state.addressMess.city}&province=${state.addressMess.province}&district=${state.addressMess.district}&street=${state.addressMess.street}
&oid=${newOid}&aid=${state.AddressId}&src=${src}`)

            if (state.jumptoSee) {
                // 显示查看

                state.showForward = true
                state.showDrawTap = false
                state.showTapBox = false
                state.showAddress = false

                state.showGotowinRecord = false
                state.showGotoLuck = false
                state.showGotoSeeContain = true
            } else {
                state.showForward = true
                state.showDrawTap = false
                state.showTapBox = false
                state.showAddress = false
            }
            dispatch('showToast', '确认收货地址成功')
        } catch (e) {
            dispatch('showToast', e.message)
        }
    }

}, ns)

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
