<template>
    <div>
        <section class="topBar" >
            <div class="icon icon_back" v-tap="{methods:enterMy,params:'backHistory'}"></div>
            <h1>奖品场</h1>
            <p class="draw_title_btn" v-tap="{methods: showDraw, item:showDrawTap}"><span></span></p>
            <ul class="draw_title_drap" v-show="showDrawTap">
                <!--<li v-tap="{methods: showTapLi, item:'showPrizeList'}"> !winGoodslistPoint 奖品记录</li>-->
                <li v-tap="{methods: showTapLi, item:'showAddress'}">收件地址</li>
                <li v-tap="{methods: showTapLi, item:'showLuckydraw'}">抽奖说明</li>
            </ul>
        </section>
        <section class="draw_title_container clear">
            <banner-scroll v-show="bannerScrollData" style="width: 100%;height: .2816rem;">
                <div class="text-scroller">
                    <ul class="scroller-in">
                        <li v-for="ban in bannerScrollData" v-html="ban"></li>
                    </ul>
                </div>
                <p class="btn_record" v-tap="{methods: showTapLi, item:'showPrizeList'}">奖品记录
                    <i class="dot" v-if="!noPoint"></i>
                </p>
            </banner-scroll>
        </section>
    </div>
</template>

<script>
    import {aTypes} from '~store/my'
    import BannerScroll from '~components/banner-scroll.vue'

    export default {
        data () {
            return {
                title: '',
                noPoint:true,
            }
        },
        watch: {
            winGoodslist (winGoodslist) {
                if (winGoodslist && winGoodslist.list && Array.isArray(winGoodslist.list)) {
                    winGoodslist.list.find((item) => {
                        if (item.aid === '-1' && item.goodstype==='2') {
                            this.noPoint = false
                        }
                    })
                }
            }
        },
        methods: {
            showDraw ({item}) {
                this.$store.state.my.showDrawTap = !item
            },
            enterMy ({params}) {
                switch (params) {
                case 'betlist':
                    this.$router.push(`/my/betlist`)
    
                    break
                case 'charge':
                    this.$router.push(`/my/charge`)
    
                    break
                case 'message':
                    this.$router.push(`/my/msg`)
    
                    break
                case 'gobackHome':
                    this.$router.push(`/h5/home/hot`)
    
                    break
                case 'charge_nopush':
                    this.$router.replace(`/my/charge`)
                    break
                case 'backHistory':
                    window.history.back()
                    break
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            showTapLi ({item, param}) {
                this.$store.state.my.showDrawTap = false

                if (param) {
                    this.isRealPrizes = true
                    this.$store.state.my.winInformation = {}
                    this.$store.state.my.winInformation.goodsdetail = {}
                    this.$store.state.my.winInformation.goodsdetail.img_url = param.imgurl
                    this.$store.state.my.winInformation.goodsdetail.goodsdesc = param.goodsdesc
                    this.$store.state.my.winInformation.goodsdetail.goodsname = param.goodsname
                    this.$store.state.my.winInformation.goodsdetail.lotterytime = param.crtime
                    this.$store.state.my.winInformation.golds = this.$store.state.userInfo.gold_total
                }
                switch (item) {

                case 'showPrizeList':
                    //  登陆判断
                    if(this.hasLogin){
                        this.$store.dispatch(aTypes.getAddressMess)
                        this.$store.state.my.showGotoLuck = false
                        this.$store.state.my.showGotoMainList = false
                        this.$store.state.my.showGotoSeeContain = false
                        this.$store.state.my.showGotowinRecord = true

                        this.winRecordContent = true
                        this.$store.dispatch(aTypes.getWinGoodList)
                    }else{
                        console.log('登陆');
                        if (window.qqsdApp) {
                            qqsdApp.invoke('login')
                            return false
                        }
                    }
                    break;
                case 'showAddress':

                    if (this.hasLogin) {
                        this.$store.state.my.showForward = false
                        this.$store.state.my.showTapBox = true
                        this.$store.dispatch(aTypes.getAddressMess)
                        this.$store.state.my.jumptoSee = false
                        this.$store.state.my.showAddress = true
                        break
                    } else {
                        console.log('登陆')
                        if (window.qqsdApp) {
                            qqsdApp.invoke('login')
                            return false
                        }
                        break
                    }

                case 'showAddress_jumpSee':
                    this.$store.state.my.showForward = false
                    this.$store.state.my.showTapBox = true
                    this.$store.dispatch(aTypes.getAddressMess)
                    this.$store.state.my.showAddress = true
                    this.$store.state.my.jumptoSee = true
                    break

                case 'showLuckydraw':
                    this.$store.state.my.showForward = false
                    this.$store.state.my.showTapBox = true
                    this.$store.state.my.showLuckydraw = true
                    break
                case 'showThunder':
                        //  迅雷记录  新打开的页面
                    this.$store.dispatch(aTypes.getThunderList)
                    break
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            showDrawTap () {
                return this.$store.state.my.showDrawTap
            },
            hasLogin () {
                return !!this.$store.state.ck
            },
            winGoodslist () {
                return this.$store.state.my.winGoodslist
            },
            bannerScrollData () {
                return this.$store.state.my.bannerScrollData
            },
            showGotoMainList () {
                return this.$store.state.my.showGotoMainList
            },

        },
        components: {
            BannerScroll
        },
        mounted () {
        },
        filters: {
            format: (num) => {
                num = Number(num)
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            }
        }
    }
</script>
<style>
</style>
