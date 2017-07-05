<template>
    <div class="respon2-itm">
        <div class="main draw_index full-scroll" v-show="showGotoMainList">
            <div class="main-list clear">
                    <div class="item" v-for="good in goodslist">
                        <img :src="good.imgurl"
                             v-tap="{methods: alertGoodsMess, params: {goodImgUrl: good.imgurl, goodName: good.name, goodGolds: good.consumgolds, goodsdesc:good.goodsdesc}}"
                        >
                        <p class="item-txt">{{ good.name }}</p>
                        <span class="item-btn" v-if="parseInt(good.restnum)>=1" v-tap="{methods: gotoLuck, item:good }"
                              data-type="点击抽奖" :data-tab="good.name">{{ good.consumgolds | golds
                            }}抽取</span>
                        <span class="item-btn" v-else style="background-color:#696f82">活动商品补货中</span>
                    </div>
                    <div class="item" v-if="parseInt(goodslist.length)%2!==0"></div>
            </div>

            <!-- 礼包弹窗  -->
            <div class="pop pop_prizes" :class="{'hide':!alertGoodsBox}">
                <div class="pop_layer"></div>
                <div class="popIn" v-if="alertGoodsData">
                    <div class="popTit">
                        <h2 class="titlle">奖品信息</h2>
                        <span class="close" v-tap="{methods: closeAlert}"></span>
                    </div>
                    <div class="pop_cont">
                        <p>{{alertGoodsData.goodName}}</p>
                        <img :src="alertGoodsData.goodImgUrl">
                        <p><i class="icon-jinbi"></i>{{alertGoodsData.goodGolds | golds }}抽取</p>
                        <div class="info">
                            <span>奖品说明：</span>
                            <p v-if="alertGoodsData.goodsdesc">{{alertGoodsData.goodsdesc}}</p>
                            <p style="color: #c1c1c1">抽奖并非100%可中，不中随机返还猜球币。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部banner -->
            <common-footer></common-footer>
        </div>
        <div class="main bg2" v-show="showGotoLuck">
            <section class="full-scroll bg2" v-if="luckMessData">
                <!-- 头部展示开始 -->
                <div class="draw_select_top">
                    <div class="draw_select_top_text" :class="{ 'visi_hide': !showWinCopyWriter }">请选择一个幸运礼盒</div>
                    <div class="draw_select_top_lucky_box_wrapper">
                        <a class="draw_select_top_lucky_box" :class="{'draw_lucky_ok':this.gift_1}"
                           v-tap="{methods: goLuckGift, item:'gift_1'}">
                            <img class="draw_select_top_lucky_box_prize" key="luck01" v-if="luckMessData.img_url" :src="luckMessData.img_url">
                            <img class="draw_select_top_lucky_box_bg" key="luck02" src="~static/images/bingo_bg.png">
                        </a>
                        <a class="draw_select_top_lucky_box" :class="{'draw_lucky_ok':this.gift_2}"
                           v-tap="{methods: goLuckGift, item:'gift_2'}">
                            <img class="draw_select_top_lucky_box_prize" key="luck03" v-if="luckMessData.img_url" :src="luckMessData.img_url">
                            <img class="draw_select_top_lucky_box_bg" key="luck04" src="~static/images/bingo_bg.png">
                        </a>
                        <a class="draw_select_top_lucky_box" :class="{'draw_lucky_ok':this.gift_3}"
                           v-tap="{methods: goLuckGift, item:'gift_3'}">
                            <img class="draw_select_top_lucky_box_prize" key="luck05" v-if="luckMessData.img_url" :src="luckMessData.img_url">
                            <img class="draw_select_top_lucky_box_bg" key="luck06" src="~static/images/bingo_bg.png">
                        </a>
                    </div>
                </div>
                <!-- 头部展示结束 -->
                <!-- 标题开始   抽中之后才有查看   showWinCopyWriter   againluckdrawtap -->
                <div class="draw_select_title_container" v-show="showWinCopyWriter && luckMessData.goodstype !=='3'">{{ luckMessData.goodsname
                    }}抽奖：{{ luckMessData.consumgolds | golds }}猜球币
                </div>
                <!-- 电话卡的处理    -->
                <div class="draw_select_title_container" v-show="showWinCopyWriter && luckMessData.goodstype ==='3'">
                    <span class="btn" v-for="item in chooseIDCartNumber"  :class="{'cur': chooseCart===item.company}"
                          v-tap="{methods: choseIDcart,params:item.company}"
                    >{{ item.company | companyName }}</span>
                    {{ luckMessData.consumgolds | golds }}猜球币
                </div>
                <!--恭喜中奖的文案-->
                <div class="draw_select_title_container" v-show="!showWinCopyWriter">恭喜获得：{{ this.winCopyWriterText }}
                </div>
                <!-- 标题结束 -->
                <!-- 奖品介绍和抽奖说明开始 -->
                <div class="draw_select_container">
                    <div class="draw_select_container_title">抽奖说明:</div>
                    <div class="draw_select_container_text"
                         v-if="Number(luckMessData.goodsid)<=20000 && luckMessData.goodstype==='2'">1.抽奖扣除等额猜球币。
                            <br>2.中奖后可在中奖页填写收件信息,奖品将由疯狂猜球官方在3-7个工作日内安排派奖。

                    </div>
                    <div class="draw_select_container_text"
                         v-if="Number(luckMessData.goodsid)<=20000 && luckMessData.goodstype!=='2'">1.抽奖扣除等额猜球币。
                            <br>2.中奖后奖品以卡号卡密形式发放。

                    </div>
                </div>
                <!-- 奖品介绍和抽奖说明结束 -->
            </section>
            <!-- 两个底部返回按钮开始 -->
            <div class="draw_record_footer" v-show="againLuckDrawTap"><a class="draw_record_back_btn"
                                                                         v-tap="{methods: gotoLuckBack}">返回抽奖列表</a>
            </div>
            <div class="draw_record_footer" v-show="!againLuckDrawTap">
                <a class="draw_record_back_left_btn" v-tap="{methods: gotoLuckBack}">返回抽奖列表</a>
                <a class="draw_record_again_right_btn" v-tap="{methods: againLuck}"
                   v-show="!this.isShowSeeBtn">再抽一次</a>
                <a class="draw_record_again_right_btn" v-tap="{methods: showTapLi, item:'showAddress_jumpSee'}"
                   v-if="this.isShowSeeBtn && this.isEmptyAdd && !this.isVirtualPrizes">编辑地址</a>
                <a class="draw_record_again_right_btn" v-tap="{methods: clickSeeFn}"
                   v-else-if="this.isShowSeeBtn">查看奖品</a>
            </div>
            <!-- 两个底部返回按钮结束 -->
        </div>
        <!--查看里头的内容   奖品说明部分-->
        <div class="main bg2" v-if="showGotoSeeContain">
            <section class="full-scroll">
                <div :class="{ 'addSeeContainPaddint':confirmAddrBtn }">
                    <!-- 头部展示开始 -->
                    <div class="draw_record_address_top">
                        <img :src="winInformation.goodsdetail.img_url">
                        <div class="draw_record_address_top_text">{{ winInformation.goodsdetail.goodsdesc }}</div>
                    </div>
                    <!-- 头部展示结束 -->
                    <!-- 中奖标题开始 -->
                    <div class="draw_record_address_title_container">
                        <div class="draw_record_address_title01">中奖：{{ winInformation.goodsdetail.goodsname}}</div>
                        <div class="draw_record_address_title02">{{ winInformation.goodsdetail.lotterytime }}</div>
                    </div>
                    <!-- 中奖标题结束 -->

                    <!-- 不可编辑地址开始 -->
                    <div class="draw_record_address_container" v-if="isRealPrizes">
                        <div class="draw_record_address_container_text">
                            <div class="draw_record_address_container_title">默认收件地址：</div>
                            <a class="draw_record_address_container_edit_btn" v-if="!confirmAddrBtn"
                               v-tap="{methods: showTapLi, item:'showAddress'}"><span></span>编辑</a>
                        </div>
                        <div class="draw_record_address_container_text">
                            <div class="draw_record_address_container_title">收件人：</div>
                            <div class="draw_record_address_container_text_done">{{ addressMess.consignee }}</div>
                        </div>
                        <div class="draw_record_address_container_text">
                            <div class="draw_record_address_container_title">手机号：</div>
                            <div class="draw_record_address_container_text_done">{{ addressMess.mobile }}</div>
                        </div>
                        <div class="draw_record_address_container_text">
                            <div class="draw_record_address_container_title">收件地址：</div>
                            <div class="draw_record_address_container_text_done">{{ addressMess.province }}{{
                                addressMess.city }}{{ addressMess.district }}

                            </div>
                        </div>
                        <div class="draw_record_address_container_text">
                            <div class="draw_record_address_container_text_done">{{ addressMess.street }}</div>
                        </div>
                        <!--  已确认地址   此时有返回抽奖列表 -->
                        <div class="draw_record_address_container_btn_wrapper" v-if="confirmAddrBtn">
                            <div class="draw_record_address_container_btn_text">系统将于3-7个工作日内发货</div>
                            <span class="draw_record_address_container_btn_line_left"></span>
                            <a class="draw_record_address_container_btn_done" key="already_confirme">已确认地址</a>
                            <span class="draw_record_address_container_btn_line_right"></span>
                        </div>
                        <!--  待确认地址   此时无返回抽奖列表 -->
                        <div class="draw_record_address_container_btn_wrapper" v-if="!confirmAddrBtn">
                            <div class="draw_record_address_container_btn_text">确认后不可修改</div>
                            <span class="draw_record_address_container_btn_line_left"></span>
                            <a class="draw_record_address_container_btn_done" style="background-color: #6d7dba"
                               v-tap="{methods: confirmAddress}" key="confirme">确认地址</a>
                            <span class="draw_record_address_container_btn_line_right"></span>
                        </div>

                    </div>
                    <!-- 不可编辑地址结束 -->
                    <!-- 话费卡开始 -->
                    <div class="draw_record_address_container" v-if="isVirtualPrizes">
                        <div class="draw_record_address_container_text"
                             v-if="winInformation.cardinfo && parseInt(winInformation.cardinfo.goodsid)>=20000">
                            <div class="draw_record_address_container_title_card">天数：<input class="copyinput"
                                                                                            readonly
                                                                                            :value="parseInt(winInformation.cardinfo.goodsid)-20000 + '天'"/>
                            </div>
                        </div>
                        <div class="draw_record_address_container_text"
                             v-if="winInformation.cardinfo && parseInt(winInformation.cardinfo.goodsid)<20000">
                            <div class="draw_record_address_container_title_card">卡号：<input class="copyinput"
                                                                                            readonly
                                                                                            :value="winInformation.cardinfo.cardno"/>
                            </div>
                            <button class="draw_record_address_container_copy_btn" id="copyBtn1"
                                    v-clipboard:copy="winInformation.cardinfo.cardno" v-clipboard:success="succCopy"
                                    @click="showCopyBox(winInformation.cardinfo.cardno)">复制
                            </button>
                        </div>
                        <div class="draw_record_address_container_text"
                             v-if="winInformation.cardinfo && parseInt(winInformation.cardinfo.goodsid)>=20000">
                            <div class="draw_record_address_container_title_card">激活码：<input readonly
                                                                                             class="copyinput"
                                                                                             :value=" winInformation.cardinfo.password"/>
                            </div>
                            <button class="draw_record_address_container_copy_btn"
                                    v-clipboard:copy="winInformation.cardinfo.password" v-clipboard:success="succCopy"
                                    @click="showCopyBox(winInformation.cardinfo.password)">复制
                            </button>
                        </div>
                        <div class="draw_record_address_container_text"
                             v-if="winInformation.cardinfo && parseInt(winInformation.cardinfo.goodsid)<20000">
                            <div class="draw_record_address_container_title_card">密码：<input readonly
                                                                                            class="copyinput"
                                                                                            :value=" winInformation.cardinfo.password"/>
                            </div>
                            <button class="draw_record_address_container_copy_btn"
                                    v-clipboard:copy="winInformation.cardinfo.password" v-clipboard:success="succCopy"
                                    @click="showCopyBox(winInformation.cardinfo.password)">复制
                            </button>
                        </div>
                        <div class="draw_record_address_container_bottom_text"
                             v-if="winInformation.goodsdetail.company==='jd'">京东卡可用于京东商城购买京东自营商品。

                        </div>

                        <div class="draw_record_address_container_bottom_text" v-else>
                            话费卡可直接用于手机话费充值，也可以前往支付宝等平台进行充值。请保管好您的卡号及密码。

                        </div>
                    </div>
                </div>
            </section>
            <!-- 话费卡结束 -->
            <!-- 底部返回按钮开始   是实物且已确认地址-->
            <div class="draw_record_footer" v-if="isVirtualPrizes || (isRealPrizes && this.confirmAddrBtn ) "
                 v-tap="{methods: gotoLuckBack}"><a class="draw_record_back_btn">返回抽奖列表</a></div>
            <!-- 底部返回按钮结束 -->
            <!--this.alertGoodsBox = true;-->
        </div>
        <div class="main bg2" v-if="showGotowinRecord">
            <!-- 查看物流 -->
            <section class="main-list bg2 full-scroll">
                <!-- 中奖记录列表开始   是不是没有具体哪个物流-->
                <ul class="draw_record_list" v-if="winGoodslist">
                    <template v-for="item in winGoodslist.list">
                        <li v-if="item.goodstype==='2'&&item.aid==='-1'">
                            <img :src="item.imgurl">
                            <div class="draw_record_list_text_container">
                                <div class="clear" v-if="isEmptyAdd"><span
                                        class="draw_record_list_text">物流状态：</span><a
                                        class="draw_record_list_address_btn"
                                        v-tap="{methods: showTapLi, item:'showAddress_jumpSee',param:item}">请确认地址</a>
                                </div>
                                <div class="clear" v-else><span class="draw_record_list_text">物流状态：</span><a
                                        class="draw_record_list_address_btn"
                                        v-tap="{ methods: goconfirmAddress,param:item }">请确认地址</a></div>
                                <!--<div><span class="draw_record_list_text">快递单号：{{item.sid}}</span><a v-if="item.sid!==''" class="draw_record_list_copy_btn"  v-clipboard:copy="item.sid" @click="succCopy">复制</a></div>-->
                            </div>
                            <div class="draw_record_list_name">{{ item.goodsname }}</div>
                            <div class="draw_record_list_date">{{ item.crtime }}</div>
                        </li>
                        <li v-if="item.goodstype==='2'&&item.aid!=='-1'"
                            v-tap="{methods: showLogisticTapFn ,orderNum: item.sid ,currentLogistic: item}">
                            <img :src="item.imgurl">
                            <div class="draw_record_list_text_container">
                                <div class="clear"><span
                                        class="draw_record_list_text">物流状态：{{ item.orderstatus | WuliuStatus(item.logistics_company)
                                    }}</span>
                                </div>
                                <!--<div v-if="item.sid!==''"><span class="draw_record_list_text">快递单号：{{item.sid}}</span><button class="draw_record_list_copy_btn"  v-clipboard:copy="item.sid" v-clipboard:success="succCopy">复制</button></div>-->
                                <div v-if="item.sid!==''"><span
                                        class="draw_record_list_text">快递单号：{{item.sid}}</span></div>
                            </div>
                            <div class="draw_record_list_name">{{ item.goodsname }}</div>
                            <div class="draw_record_list_date">{{ item.crtime }}</div>
                        </li>
                        <li v-if="item.goodstype==='1'|| item.goodstype==='3'">
                            <img :src="item.imgurl">
                            <div class="draw_record_list_text_container">
                                <div><span class="draw_record_list_text">卡号：<span>{{ item.cardno }}</span></span>
                                    <button class="draw_record_list_copy_btn" v-clipboard:copy="item.cardno"
                                            v-clipboard:success="succCopy" @click="showCopyBox(item.cardno)">复制
                                    </button>
                                </div>
                                <div><span class="draw_record_list_text">密码：<span>{{ item.password }}</span></span>
                                    <button class="draw_record_list_copy_btn" v-clipboard:copy="item.password"
                                            v-clipboard:success="succCopy" @click="showCopyBox(item.password)">复制
                                    </button>
                                </div>
                            </div>
                            <div class="draw_record_list_name">{{ item.goodsname }}</div>
                            <div class="draw_record_list_date">{{ item.crtime }}</div>
                        </li>
                    </template>
                    <div class="draw_record_top" v-if="winGoodslist.allnum!=='0'">中奖记录保留一年</div>
                    <div class="emptyBox respon2" style="margin-top: 1.3rem;" v-if="winGoodslist.allnum==='0'">
                        <div class="empty respon2-itm">
                            <div class="emptyIn">
                                <span class="icon icon_empty"></span>
                                <p>暂无中奖记录~</p>
                            </div>
                        </div>
                    </div>
                </ul>

            </section>
            <!-- 中奖记录列表结束 -->
            <!-- 底部返回按钮开始 -->
            <div class="draw_record_footer"><a class="draw_record_back_btn" v-tap="{methods: gotoLuckBack}">返回抽奖列表</a>
            </div>
            <!-- 底部返回按钮结束 -->
        </div>
        <!-- 复制框 -->


    </div>
</template>
<script>
    import Vue from 'vue'
    import ChineseDistricts from '~common/city-picker.data'
    import BannerScroll from '~components/banner-scroll.vue'
    import CommonFooter from '~components/common-footer.vue'

    import {aTypes, mTypes} from '~store/my'

    import vueClipboard2 from 'vue-clipboard2'
    Vue.use(vueClipboard2)

    export default {
        data () {
            return {
                chooseCart: null,
                ChineseDistricts: ChineseDistricts,
                province: '110000',
                city: '110100',
                country: '110101',
                currGoodsid: null,
                currConsumgolds: null,
                currGoodsType: null,
                gift_1: false,
                gift_2: false,
                gift_3: false,
                clickGiftItem: null,
                isShowSeeBtn: false,
                isShowSeeContain: false,
                isVirtualPrizes: false,
                isRealPrizes: false,
                winRecordContent: false,   // 抽奖列表
                alertGoodsData: null,
                alertGoodsBox: false,
                againLuckDrawTap: true,   // 用于再抽一次的处理
                winCopyWriterText: null,  // 中奖文案
                currentOid: null
            }
        },
        watch: {
            chooseIDCartNumber (data) {
                console.log(data)
                let minNumObj = {}
                let maxNum = 0
                if (data && Array.isArray(data)) {
                    data.forEach((item, index) => {
                        if (parseInt(item.restnum) > maxNum) {
                            maxNum = parseInt(item.restnum)
                            Object.assign(minNumObj, {[item.restnum]: index})
                        }
                    })
                    this.chooseCart = this.chooseIDCartNumber[minNumObj[maxNum]].company
                }
            },
            province () {
                this.city = parseInt(this.province) + 100
                this.country = null
            },
            city () {
                setTimeout(() => {
                    this.country = document.getElementById('countryDom').children[0].value
                }, 10)
            },
            winInformation () {
                if (this.winInformation) {
                    this.isVirtualPrizes = false
                    this.$store.state.userInfo.gold_total = this.winInformation.golds
                    if (this.winInformation.prizetype && this.winInformation.prizetype === 'golds') {
                        this.$store.state.my.luckMessData.img_url = this.winInformation.goldurl
                        this.isShowSeeBtn = false

                        let num = Number(this.winInformation.prizeamount)
                        if (num > 10000) {
                            num = num / 10000 + '万'
                        }
                        this.winCopyWriterText = num + '猜球币'
                    } else if (this.winInformation.prizetype === 'goods') {
                        this.currentOid = this.winInformation.oid
                        this.$store.state.my.luckMessData.img_url = this.winInformation.goodsdetail.img_url
                        this.isShowSeeBtn = true
                        this.winCopyWriterText = this.winInformation.goodsdetail.goodsname

                        if (this.winInformation.goodsdetail.goodstype === '2') {
                            this.isRealPrizes = true;
                            this.isVirtualPrizes = false;
                        } else {
//                            电话卡或者京东卡
                            this.isRealPrizes = false;
                            this.isVirtualPrizes = true
                        }
                        setTimeout(() => {
                            this.$store.dispatch(aTypes.getAddressMess)
                        }, 10)
                    }
//                    switch (this.clickGiftItem) {
//                        case 'gift_1':
//                            this.gift_1 = true
//                            break
//                        case 'gift_2':
//                            this.gift_2 = true
//                            break
//                        case 'gift_3':
//                            this.gift_3 = true
//                            break
//                    }
                }
            }
        },
        components: {
            BannerScroll,
            CommonFooter
        },
        methods: {
            choseIDcart ({params}) {
                console.log(params)
                if (params) {
                    switch (params) {
                    case 'lt': this.chooseCart = 'lt'; break
                    case 'dx': this.chooseCart = 'dx'; break
                    case 'yd': this.chooseCart = 'yd'; break
                    default :;break
                    }
                }
            },
            showDraw ({item}) {
                this.$store.state.my.showDrawTap = !item
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
                    if (this.hasLogin) {
                        this.$store.dispatch(aTypes.getAddressMess)
                        this.$store.state.my.showGotoLuck = false
                        this.$store.state.my.showGotoMainList = false
                        this.$store.state.my.showGotoSeeContain = false
                        this.$store.state.my.showGotowinRecord = true

                        this.winRecordContent = true
                        this.$store.dispatch(aTypes.getWinGoodList)
                        break
                    } else {
                        console.log('登陆')
                        if (window.qqsdApp) {
                            qqsdApp.invoke('login')
                            return false
                        }
                        break
                    }
                case 'showAddress':
                    this.$store.state.my.showForward = false
                    this.$store.state.my.showTapBox = true
                    this.$store.dispatch(aTypes.getAddressMess)
                    this.$store.state.my.jumptoSee = false
                    this.$store.state.my.showAddress = true
                    break

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
                }
            },
            gotoLuckBack () {
                if (this.hasLogin) {
                    this.$store.dispatch(aTypes.getGoodsList)
                    this.$store.dispatch(aTypes.getWinGoodList)
                }
                // 初始化、清楚上一次的抽奖状态
                this.againLuckDrawTap = true
                this.$store.state.my.showWinCopyWriter = true

                this.isShowSeeBtn = false
                this.$store.state.my.winInformation = null
                this.gift_1 = false
                this.gift_2 = false
                this.gift_3 = false

                this.$store.state.my.showDrawTap = false
                this.$store.state.my.showGotoLuck = false
                this.$store.state.my.showGotoSeeContain = false
                this.$store.state.my.showGotowinRecord = false

                this.$store.state.my.showGotoMainList = true
            },
            gotoLuck ({item}) {
                if (item.goodstype === '1' || item.goodstype === '3') {
                    this.isVirtualPrizes = true
                }
                //  抽奖入口判断
                this.isShowSeeBtn = false
                this.$store.state.my.showWinCopyWriter = true
                if (item) {
                    this.currGoodsid = item.goodsid
                    this.currConsumgolds = item.consumgolds
                    this.currGoodsType = item.goodstype
                    this.$store.dispatch(aTypes.getGotoLuckMess, item)
                    this.$store.state.my.showGotoLuck = true
                    this.$store.state.my.showGotoMainList = false
                } else {
                    this.$store.dispatch('showToast', '抽奖失败，请再试一试！')
                }
            },
            goLuckGift ({item}) {
                setTimeout(() => {
                    this.$store.dispatch(aTypes.getGoodsList)
                }, 100)
                if (this.userinfoMess && this.userinfoMess.uid !== '0') {
                    if (item) {
                        if (parseInt(this.userinfoMess.gold_total) > parseInt(this.currConsumgolds)) {
                            if (!this.gift_1 && !this.gift_2 && !this.gift_3) {
//                                多带一些参数
                                if (this.chooseCart) {
                                    this.$store.dispatch(aTypes.getLuckGoodBingo, {
                                        currGoodsid: this.currGoodsid,
                                        currConsumgolds: this.currConsumgolds,
                                        goodstype: this.currGoodsType,
                                        company: this.chooseCart
                                    })
                                } else {
                                    this.$store.dispatch(aTypes.getLuckGoodBingo, {
                                        currGoodsid: this.currGoodsid,
                                        currConsumgolds: this.currConsumgolds,
                                        goodstype: this.currGoodsType
                                    })
                                }
//                            抽奖的  到时候得清空
                                this.clickGiftItem = item

                                switch (this.clickGiftItem) {
                                    case 'gift_1':
                                        this.gift_1 = true
                                        break
                                    case 'gift_2':
                                        this.gift_2 = true
                                        break
                                    case 'gift_3':
                                        this.gift_3 = true
                                        break
                                }
//                                再抽一次
                                this.againLuckDrawTap = false
                            }
                        } else {
                            this.$store.dispatch('showToast', '猜球币不足，请充值后再来！')
                        }
                    } else {
                        this.$store.dispatch('showToast', '抽奖失败，请刷新再试一试！')
                    }
                } else {
                    console.error('再登录一次')
                    if (window.qqsdApp) {
                        qqsdApp.invoke('login')
                        return false
                    }
                }
            },
            againLuck () {

                this.againLuckDrawTap = true
                this.$store.state.my.showWinCopyWriter = true
                this.isShowSeeBtn = false
                this.$store.state.my.winInformation = null
                this.gift_1 = false
                this.gift_2 = false
                this.gift_3 = false

            },
            clickSeeFn () {
//              点击查看  是这个交互么
                this.$store.state.my.confirmAddrBtn = false

                if (this.addressMess && Object.keys(this.addressMess).length) {
//                    有地址
//                    this.isShowSeeContain = true;
                    this.$store.state.my.showGotoLuck = false
                    this.$store.state.my.showGotoSeeContain = true
                } else {
//                    跳转填地址页面  返回的问题
                    this.$store.state.my.showForward = false
                    this.$store.state.my.showTapBox = true
                    this.$store.state.my.showAddress = true
                }
            },
            succCopy (param) {
                this.$store.dispatch('showToast', '复制成功')
                if (!this.$store.state.my.isSupportCopy) {
                    this.$store.state.my.isSupportCopy = true
                }
            },
            showLogisticTapFn ({orderNum, currentLogistic}) {
                if (currentLogistic) {
                    this.$store.state.my.currentLogistic = currentLogistic
                }
//                orderNum = 22308677667;
                if (!orderNum) {
                    orderNum = 0
                    console.log('无订单号')
                    return false
                }
//                请求物流接口
                this.$store.dispatch(aTypes.getLogisticMess, orderNum)
            },
            alertGoodsMess ({params}) {
                this.$store.state.my.showDrawTap = false
                this.alertGoodsBox = true
                this.alertGoodsData = params
            },
            closeAlert () {
                this.alertGoodsBox = false
            },

            goconfirmAddress ({param}) {
//                奖品纪录过来的数据
                this.$store.state.my.confirmAddrBtn = false
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
                if (this.addressMess && Object.keys(this.addressMess).length) {
//                    有地址
                    this.$store.state.my.showGotoLuck = false
                    this.$store.state.my.showGotowinRecord = false
                    this.$store.state.my.showGotoMainList = false
                    this.$store.state.my.showGotoSeeContain = true

                    this.currentOid = param.oid    // 奖品记录
                } else {
//                    跳转填地址页面  返回的问题
                    this.$store.state.my.showForward = false
                    this.$store.state.my.showTapBox = true
                    this.$store.state.my.showAddress = true
                }
            },
            confirmAddress () {
//                确认地址
                this.$store.dispatch(aTypes.modifyAddress, this.currentOid)
                this.currentOid = null
            },
            showCopyBox (val) {
                setTimeout(() => {
                    this.$store.state.my.copyValue = val
                    if (this.$store.state.my.isSupportCopy) {
                        return
                    }
                    this.$store.state.my.isShowCopyBox = true
                }, 200)
            }
        },
        computed: {
            chooseIDCartNumber () {
                return this.$store.state.my.chooseIDCartNumber
            },
            hasLogin () {
                return !!this.$store.state.ck
            },
            bannerScrollData () {
                return this.$store.state.my.bannerScrollData
            },
            goodslist () {
                return this.$store.state.my.goodslist
            },
            showDrawTap () {
                return this.$store.state.my.showDrawTap
            },
            userinfoMess () {
                return this.$store.state.userInfo
            },
            luckMessData () {
                return this.$store.state.my.luckMessData
            },
            winInformation () {
                return this.$store.state.my.winInformation
            },
            addressMess () {
                return this.$store.state.my.addressMess
            },
            winGoodslist () {
                return this.$store.state.my.winGoodslist
            },
            confirmAddrBtn () {
                return this.$store.state.my.confirmAddrBtn
            },
            showWinCopyWriter () {
//                中奖文案切换（恭喜。。。）
                return this.$store.state.my.showWinCopyWriter
            },
            isEmptyAdd () {
                return this.$store.state.my.addressMess.isEmptyAdd
            },
            showGotoLuck () {
                return this.$store.state.my.showGotoLuck
            },
            showGotoSeeContain () {
                return this.$store.state.my.showGotoSeeContain
            },
            showGotoMainList () {
                return this.$store.state.my.showGotoMainList
            },
            showGotowinRecord () {
                return this.$store.state.my.showGotowinRecord
            },
            isSupportCopy () {
                return this.$store.state.my.isSupportCopy
            },
            copyValue () {
                return this.$store.state.my.copyValue
            },
        },
        mounted () {
//            初始化奖品场
            this.$store.commit(mTypes.setInitLuckDraw)
            this.$store.dispatch(aTypes.getGoodsList)
            setTimeout(() => {
                if (this.hasLogin) {
                    this.$store.dispatch(aTypes.getAddressMess)
                    this.$store.dispatch(aTypes.getWinGoodList)
                }
                this.$store.dispatch(aTypes.getHomeInfo)
            }, 10)
            this.$store.state.my.showGotoSeeContain = false
            this.$store.state.my.showGotoLuck = false
            this.$store.state.my.showGotowinRecord = false
            this.$store.state.my.showGotoMainList = true
            this.$store.state.my.showDrawTap = false
        },
        filters: {
            golds: (num) => {
                num = Number(num)
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            },
            companyName (name) {
                if (name) {
                    switch (name) {
                    case 'lt': return '联通'
                    case 'dx': return '电信'
                    case 'yd': return '移动'
                    default : return '其他'
                    }
                }
            },

            format (time, format = 'yyyy-MM-dd') {
                let t = new Date(time)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            WuliuStatus (status, wuliu) {
//                物流状态
                let str = ''
                switch (status) {
                case '1':
                    str = '未发货'
                    break
                case '2':
                    str = '已发货(' + wuliu + ')'
                    break
                case '3':
                    str = '已签收(' + wuliu + ')'
                    break
                }
                return str
            }
        }
    }
</script>
<style>
    .draw_record_list_text_container button {
        padding: 0;
        list-style-type: none;
        background: none;
        color: #bababa;
        font-size: .10rem;
    }

    button {
        padding: 0;
        list-style-type: none;
        background: none;
        color: #bababa;
        font-size: .10rem;
    }

    .scroll-view {
        touch-action: none;
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .copyinput_list {
        border: none;
        background-color: transparent;
        outline: medium;
        line-height: .586667rem;
        font-size: .32rem;
        color: #bababa;
    }
</style>
