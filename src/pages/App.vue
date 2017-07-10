<template>
    <div v-tap="{methods: trackEvent}" class="l-full" :class="{'iospd':platform==='ios'}">
        <div class="toast" v-show="toastMsg">{{ toastMsg }}</div>
        <router-view v-if="ready"></router-view>
    </div>
</template>
<script>
    import '~static/css/public.css'
    import '~static/css/index.css'
    import '~static/css/bet.css'
    import '~static/css/live.css'
    import '~static/css/mine.css'
    import '~static/css/media.css'
    import {getCk, isLowAndroidVersion, platform} from '~common/util'
    import {actionTypes, mutationTypes} from '~store/home'

    export default {
        data () {
            return {
                ready: false,
                platform: platform
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            toastMsg () {
                return this.$store.state.toastMsg
            },
            signList () {
                return this.$store.state.home.signList
            },
            isSign () {
                let isSign = false  // false 是否有未签到的
                this.signList && this.signList.forEach((item) => {
                    if (item.sign === '0') {
                        isSign = true
                    }
                })
                return isSign
            }
        },
        async mounted () {
            //  到时候把不学要登陆的代码提前 ！！！！
            let qqsdCk = ''    // 球球ck
        // 再次打开页面的时候可能已经有注入
            if (window.qqsdApp && platform === 'ios') {
                let info = ''
                qqsdApp.invoke('titlebar', {'isshow': '0'})
                info = qqsdApp.getInfo()
                qqsdCk = info['ck']
                this.$store.commit('qqsdCK', qqsdCk)
                if (!qqsdCk) { // 没登录跳登录  页面显示未登录的情况！！
                    this.$store.commit('cp_login_state', 0)
                    localStorage.setItem('ck', '0')
                } else {
                    this.$store.commit('cp_login_state', 1)
                    if (qqsdCk && localStorage.getItem('qq_uid') === info['userid'] && getCk() !== 'null' && getCk() && getCk() !== '0') {
                        // 是同一个用户
                        await this.$store.commit('ck', getCk())
                        await this.$store.dispatch('getUserInfo')
                    } else {
                        // 请求成哥接口那竞猜ck
                        await this.$store.dispatch('doLogin', qqsdCk)
                    }
                }
                // 1
                window.qqsdApp.datachanged = async () => {
                    // 登录成功回调
                    let info = ''
                    let qqsdCk = ''
                    if (window.qqsdApp) {
                        qqsdApp.invoke('titlebar', {'isshow': '0'})
                        info = qqsdApp.getInfo()
                        qqsdCk = info['ck']
                        this.$store.commit('qqsdCK', qqsdCk)
                        if (!qqsdCk) { // 没登录跳登录  页面显示未登录的情况！！
                            this.$store.commit('cp_login_state', 0)
                            localStorage.setItem('ck', '0')
                        } else {
                            this.$store.commit('cp_login_state', 1)
                            if (qqsdCk && localStorage.getItem('qq_uid') === info['userid'] && getCk() !== 'null' && getCk() && getCk() !== '0') {
                                // 是同一个用户
                                this.$store.commit('ck', getCk())
                                this.$store.dispatch('getUserInfo')
                            } else {
                                // 请求成哥接口那竞猜ck
                                await this.$store.dispatch('doLogin', qqsdCk)
                            }
                        }
                    } else {
                        if (platform === 'ios') {
                            window.location.href = 'messi://download'
                        } else {
                            try {
                                nativeApi && nativeApi.download()
                            } catch (e) {
                                console.log('nativeApi')
                            }
                        }
                    }
                    if (~location.href.indexOf('#/h5/home')) {
//                        页面共有的部分
                        this.$store.dispatch(actionTypes.getSignList)
                        // 弹窗 888 金币  到时候验证一下
                        if (this.userInfo && this.userInfo.first_login && this.userInfo.first_login === '1') {
                            this.$store.dispatch(actionTypes.showJinbiBox, {
                                isShow: true,
                                golds: 888,
                                coinTitle: '首次登录奖励'
                            })
                            setTimeout(() => {
                                this.$store.dispatch('getUserInfo')
                            }, 100)
                        }
                        if (this.isSign) {
                            if (!this.signList) {
                                this.$store.dispatch(actionTypes.getSignList)
                                this.$store.commit(mutationTypes.showSignbox, true)
                            } else {
                                this.$store.commit(mutationTypes.showSignbox, true)
                            }
                        }
                        this.$store.dispatch(actionTypes.getcrazyMainInfo)
                    }

                    if (~location.href.indexOf('#/h5/home/hot')) {
                        this.$store.dispatch(actionTypes.getFootballMatchList, 'hot')
                    }
                    if (~location.href.indexOf('#/h5/home/play')) {
                        this.$store.dispatch(actionTypes.getFootballMatchList, 'run')
                    }
                    if (~location.href.indexOf('#/h5/matchList/noEnd')) {
                        this.$store.dispatch(actionTypes.getFootballMatchList, 'total')
                    }
                    if (~location.href.indexOf('#/h5/matchList/end')) {
                        this.$store.dispatch(actionTypes.getFootballMatchList_end)
                    }
                    if (~location.href.indexOf('#/main/')) {
                        //  该页面的有可能的请求 详情页
                        let routeMatchid = this.$route.params.matchid
                        this.$store.dispatch('getFootballMatchDetail', routeMatchid)
                    }
                    if (~location.href.indexOf('#/my/')) {
                        //  该页面的有可能的请求 我的页面
                    }
                    return false
                }
            } else {
                const waitPromise = () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (window.qqsdApp) {
                                qqsdApp.invoke('titlebar', {'isshow': '0'})
                                let info = qqsdApp.getInfo()
                                resolve(info)
                            } else {
                                resolve('0')
                            }
                        }, 380)
                    })
                }

                const testAsync = async () => {
                    const awaitInfo = await waitPromise()
                    qqsdCk = awaitInfo['ck']
                    this.$store.commit('qqsdCK', qqsdCk)
                    if (!qqsdCk) { // 没登录跳登录  页面显示未登录的情况！！
                        this.$store.commit('cp_login_state', 0)
                        localStorage.setItem('ck', '0')
                    } else {
                        this.$store.commit('cp_login_state', 1)
                        if (qqsdCk && localStorage.getItem('qq_uid') === awaitInfo['userid'] && getCk() !== 'null' && getCk() && getCk() !== '0') {
                            // 是同一个用户
                            await this.$store.commit('ck', getCk())
                            await this.$store.dispatch('getUserInfo')
                        } else {
                            // 请求成哥接口那 竞猜ck
                            this.$store.dispatch('doLogin', qqsdCk)
                        }
                    }
                    // 2
                    if (window.qqsdApp) {
                        window.qqsdApp.datachanged = async () => {  // 登录成功回调
                            let info = ''
                            let qqsdCk = ''
                            if (window.qqsdApp) {
                                qqsdApp.invoke('titlebar', {'isshow': '0'})
                                info = qqsdApp.getInfo()
                                qqsdCk = info['ck']
                                this.$store.commit('qqsdCK', qqsdCk)
                                if (!qqsdCk) { // 没登录跳登录  页面显示未登录的情况！！
                                    this.$store.commit('cp_login_state', 0)
                                    localStorage.setItem('ck', '0')
                                } else {
                                    this.$store.commit('cp_login_state', 1)
                                    if (qqsdCk && localStorage.getItem('qq_uid') === info['userid'] && getCk() !== 'null' && getCk() !== '0' && getCk()) {
                                        // 是同一个用户
                                        this.$store.commit('ck', getCk())
                                        this.$store.dispatch('getUserInfo')
                                    } else {
                                        // 请求成哥接口那竞猜ck
                                        await this.$store.dispatch('doLogin', qqsdCk)
                                    }
                                }
                            }

                            if (~location.href.indexOf('#/h5/home')) {
                                this.$store.dispatch(actionTypes.getSignList)
                                // 弹窗 888 金币  到时候验证一下
                                if (this.userInfo && this.userInfo.first_login && this.userInfo.first_login === '1') {
                                    this.$store.dispatch(actionTypes.showJinbiBox, {
                                        isShow: true,
                                        golds: 888,
                                        coinTitle: '首次登录奖励'
                                    })
                                    setTimeout(() => {
                                        this.$store.dispatch('getUserInfo')
                                    }, 100)
                                }
                                //        每天就弹一次 换设备，未签到弹出 ，签到了不弹出
                                if (this.isSign) {
                                    if (!this.signList) {
                                        this.$store.dispatch(actionTypes.getSignList)
                                        this.$store.commit(mutationTypes.showSignbox, true)
                                    } else {
                                        this.$store.commit(mutationTypes.showSignbox, true)
                                    }
                                }
                                this.$store.dispatch(actionTypes.getcrazyMainInfo)
                            }

                            if (~location.href.indexOf('#/h5/home/hot')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'hot')
                            }
                            if (~location.href.indexOf('#/h5/home/play')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'run')
                            }
                            if (~location.href.indexOf('#/h5/matchList/noEnd')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'total')
                            }
                            if (~location.href.indexOf('#/h5/matchList/end')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList_end)
                            }
                            if (~location.href.indexOf('#/main/')) {
                                //  该页面的有可能的请求 详情页
                                let routeMatchid = this.$route.params.matchid
                                this.$store.dispatch('getFootballMatchDetail', routeMatchid)
                            }
                            if (~location.href.indexOf('#/my/')) {
                                //  该页面的有可能的请求 我的页面
                            }
                            return false
                        }
                    } else {
                        if (platform === 'ios') {
                            window.location.href = 'messi://download'
                        } else {
                            try {
                                nativeApi && nativeApi.download()
                            } catch (e) {
                                console.log('nativeApi')
                            }
                        }
                    }
                }

                await testAsync()  // 保证有ck 再走
            }
            // 重复注入
            window.onhashchange =  () => {
                setTimeout(()=>{
                    // 3
                    if (window.qqsdApp) {
                        window.qqsdApp.datachanged = async () => {  // 登录成功回调
                            let info = ''
                            let qqsdCk = ''
                            if (window.qqsdApp) {
                                qqsdApp.invoke('titlebar', {'isshow': '0'})
                                info = qqsdApp.getInfo()
                                qqsdCk = info['ck']
                                this.$store.commit('qqsdCK', qqsdCk)
                                if (!qqsdCk) { // 没登录跳登录  页面显示未登录的情况！！
                                    this.$store.commit('cp_login_state', 0)
                                    localStorage.setItem('ck', '0')
                                } else {
                                    this.$store.commit('cp_login_state', 1)
                                    if (qqsdCk && localStorage.getItem('qq_uid') === info['userid'] && getCk() !== 'null' && getCk() !== '0' && getCk()) {
                                        // 是同一个用户
                                        this.$store.commit('ck', getCk())
                                        this.$store.dispatch('getUserInfo')
                                    } else {
                                        // 请求成哥接口那竞猜ck
                                        await this.$store.dispatch('doLogin', qqsdCk)
                                    }
                                }
                            }

                            if (~location.href.indexOf('#/h5/home')) {
                                this.$store.dispatch(actionTypes.getSignList)
                                // 弹窗 888 金币  到时候验证一下
                                if (this.userInfo && this.userInfo.first_login && this.userInfo.first_login === '1') {
                                    this.$store.dispatch(actionTypes.showJinbiBox, {
                                        isShow: true,
                                        golds: 888,
                                        coinTitle: '首次登录奖励'
                                    })
                                    setTimeout(() => {
                                        this.$store.dispatch('getUserInfo')
                                    }, 100)
                                }
                                //        每天就弹一次 换设备，未签到弹出 ，签到了不弹出
                                if (this.isSign) {
                                    if (!this.signList) {
                                        this.$store.dispatch(actionTypes.getSignList)
                                        this.$store.commit(mutationTypes.showSignbox, true)
                                    } else {
                                        this.$store.commit(mutationTypes.showSignbox, true)
                                    }
                                }
                                this.$store.dispatch(actionTypes.getcrazyMainInfo)
                            }
                            if (~location.href.indexOf('#/h5/home/hot')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'hot')
                            }
                            if (~location.href.indexOf('#/h5/home/play')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'run')
                            }
                            if (~location.href.indexOf('#/h5/matchList/noEnd')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList, 'total')
                            }
                            if (~location.href.indexOf('#/h5/matchList/end')) {
                                this.$store.dispatch(actionTypes.getFootballMatchList_end)
                            }
                            if (~location.href.indexOf('#/main/')) {
                                //  该页面的有可能的请求 详情页
                                let routeMatchid = this.$route.params.matchid
                                this.$store.dispatch('getFootballMatchDetail', routeMatchid)
                            }
                            if (~location.href.indexOf('#/my/')) {
                                //  该页面的有可能的请求 我的页面
                            }
                            return false
                        }
                    } else {
                        if (platform === 'ios') {
                            window.location.href = 'messi://download'
                        } else {
                            try {
                                nativeApi && nativeApi.download()
                            } catch (e) {
                                console.log('nativeApi')
                            }
                        }
                    }
                },390)
            }
//            if (1) {
//                await this.$store.dispatch('localLogin', 12345)
//                await this.$store.dispatch('getUserInfo')
//            }
            try {
                if (window.WebSocket) {
                    await this.$store.dispatch('initWebsocket')
                } else {
                    console.warn('该设备不支持websocket')
                }
                this.$store.commit('setisLowAndroidVersion', isLowAndroidVersion)
            } catch (e) {
                if (e.code === '102') {
                    try {
                        await this.$store.dispatch('initWebsocket')
                        this.ready = true
                    } catch (e) {
                        this.ready = true
                        this.$store.dispatch('showToast', '网络异常， 请稍后再试')
                    }
                } else if (e.code === '103') { // 有websocket， 但是不触发如何事件， 导致超时
                    this.ready = true
                } else {
                    this.$store.dispatch('showToast', e.message)
                }
            }
            this.ready = true
        },
        methods: {
            trackEvent ({event}) {
                if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
                    event.target.focus()
                }
                if (event.target.tagName === 'BUTTON') {
                    event.target.click()
                    return
                }
                const getDataset = (ele) => {
                    if (ele) {
                        if (ele.dataset.tab && ele.dataset.type) {
                            return ele.dataset
                        } else {
                            if (ele.tagName === 'BODY') {
                                return null
                            } else {
                                return getDataset(ele.parentNode)
                            }
                        }
                    }
                }
                const dataset = getDataset(event.target)
                if (window._hmt && dataset) {
                    window._hmt.push([dataset.track || '_trackEvent', dataset.type, dataset.event || 'click', dataset.tab])
                }
            }
        }
    }
</script>
