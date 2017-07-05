<template>
    <div class="wrap respon2 mine">
        <HeaderMy></HeaderMy>
        <router-view></router-view>
        <!-- 显示帮助   :class="{'popShow': isShow}" -->
        <div class="popFull" :class="{'popShow':showTapBox,'hide':!showTapBox && isLowAndroidVersion}">
            <section class="server respon2" v-show="isShow">
                <div class="header_pop">
                    <span class="btn btn-back" v-tap="{methods:showHelp,isShow:false}"></span>
                    <h3>帮助</h3>
                </div>

                <div class="respon2-itm">
                    <div class="full-scroll">
                        <div class="server-info"> 客服邮箱：<strong>Cbet500@qq.com</strong>
                            <br> 微信公众号搜索：
                            <strong>疯狂猜球服务号</strong>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_1'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>怎样才能参与竞猜呢？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_1 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_1}">
                                    您只需要注册新的账号，或者登陆您已有的账号，我们会附赠您少量初始猜球币，欢迎体验。

                                </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_2'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>什么是猜球币？如何获得？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_2 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_2}">
                                    猜球币是竞猜过程中需要使用的一种虚拟币，只可进行竞猜，不可提款。猜球币可以通过初始赠送，运营活动，或者充值获取。

                                </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_3'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>猜球币充值有哪些方式？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_3 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_3}"> 当前仅支持支付宝支付，更多充值方式敬请期待！
                                </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_4'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>封盘会在哪些情况下出现？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_4 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_4}">
                                    系统在进行到85分钟自动封盘，另外某些情况下在调整盘口和赔率时，可能会出现短时间内无法投注的情况。

                                </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_5'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>竞猜结果是怎样结算的？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_5 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_5}">
                                    竞猜结果以第三方数据做标准，保证真实可信，猜球币奖励与猜球时约定的最终获得猜球币有关。小数点后的猜球币数额不显示 </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_6'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>比赛取消怎样结算？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_6 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_6}">取消（包含延期1天以上）的比赛退回原有竞猜的猜球币。
                                </div>
                            </div>
                        </div>
                        <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_7'}">
                            <div class="list-cont">
                                <div class="cont-tit">
                                    <h4>异常情况订单的处理？</h4>
                                    <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_7 }"></i></div>
                                <div class="cont" :class="{ 'hide': !helpSel.helpSel_7}">
                                    因突然停电，网络异常，数据源错误等不可抗因素导致结算异常的，系统会对异常订单进行撤单退款。
                                </div>
                            </div>
                        </div>
                        <div class="help-msg">相关说明：
                            <br> 1.本竞猜所有内容由《疯狂猜球》提供，凡参与竞猜，即同意上述规则。
                            <br> 2.任何使用作弊行为获利的用户，《疯狂猜球》运营团队有权追回违规所得，数额较大者进行封号处理。
                            <br> 3.上述规则的解释权归《疯狂猜球》运营团队所有
                            <br>
                        </div>
                    </div>
                </div>
            </section>
            <section class="server respon2" v-show="showLuckydraw">
                <div class="header_pop">
                    <!--<span class="btn-close" ></span>-->
                    <span class="btn btn-back" v-tap="{methods:hideTapLi,item:'showLuckydraw'}"
                          key="luckdraw"></span>
                    <h3>抽奖说明</h3>
                </div>
                <div class="respon2-itm">
                    <div class="full-scroll">
                        <!-- 说明开始 -->
                        <div class="intro_title">1.抽奖规则</div>
                        <div class="intro_text">
                            您一但参与本活动即视为同意本规则。
                            <br> 抽奖列表包含若干实物奖品，每个奖品抽奖所需的金币和实际抽取奖品可能不同；
                            <br> 奖品能否被抽取到，跟您的选择有关；如果没能抽取到您心仪的商品，也有可能获得一定量的猜球币。






                        </div>
                        <div class="intro_title">2.奖品说明</div>
                        <div class="intro_text">
                            请您在抽取商品后，尽快填写您的收货地址；1个月未能填写正确地址的，我们视为弃奖。
                            <br> 因网络波动影响，部分奖品在抽取到后，未能及时发放；请您在网络稳定后前往奖品记录里核对中奖信息。






                        </div>
                        <div class="intro_title">3.其他声明</div>
                        <div class="intro_text">
                            如检测到您恶意使用第三方工具或者脚本参与本活动，疯狂猜球运营团队有权回收您所有异常所得，情节严重者将永久封停账号。






                        </div>
                        <div class="intro_title">4.用户服务</div>
                        <div class="intro_text">
                            如有任何疑问，请联系疯狂猜球服务号。






                        </div>
                        <!-- 说明结束 -->
                    </div>
                </div>
            </section>
            <section class="address respon2" v-show="showAddress" v-tap="{methods:closeSelAddr}">
                <div class="header_pop">
                    <span class="btn btn-back" v-tap="{methods:hideTapLi,item:'showAddress'}"></span>
                    <!--<span class="btn-close" ></span>-->
                    <h3>收件地址</h3>
                </div>
                <div class="respon2-itm" v-if="addressMess">
                    <div class="full-scroll">
                        <!-- 中间部分开始 -->
                        <div class="address_item">
                            <div class="address_item_title">收件人：</div>
                            <input class="address_item_input" type="text" id="input_consig" placeholder="请填写您的姓名"
                                   v-model="addressMess.consignee">
                        </div>
                        <div class="address_item">
                            <div class="address_item_title">手机号：</div>
                            <input class="address_item_input" type="tel" id="input_tel" placeholder="请填写手机号码"
                                   v-model.trim="addressMess.mobile" @input="confireTel(addressMess.mobile)">
                        </div>
                        <div class="address_item" v-tap="{methods:showSelAddress,item:''}">
                            <div class="address_item_title">收件地址：</div>
                            <input class="address_item_input" readonly="true" :value="addressMess.allAddress"
                                   type="text" id="address_input" placeholder="请选择地区">
                            <span class="address_item_select_btn"></span>
                        </div>
                        <div class="address_textarea_container">
                            <textarea class="address_textarea" id="input_textarea" placeholder="请填写详细地址（街道、门牌）"
                                      v-model="addressMess.street"></textarea>
                        </div>
                        <div class="addresss_text">为保证奖品正常派发，请按正确格式填写您的收件地址</div>
                        <a class="address_save_btn" v-if="addressMess.street"
                           v-tap="{methods:saveAddrMess,params:isEmptyAdd}">保存</a>
                        <!-- 中间部分结束 -->
                    </div>
                </div>
                <!-- 底部选择地区开始 -->
                <div class="addresss_select_container" :class="{'address_show':isShowSelAddress}">
                    <div class="addresss_select_top">
                        <p class="draw_back_btn">选择省</p>
                    </div>

                    <div class="address_select_box" v-if="ChineseDistricts">
                        <ul class="addresss_select_item_wrapper" id="address_prov"
                            v-tap="{methods:show_prov,item:'target'}">
                            <li class="addresss_select_item" :class="{'hide':hideOtherProv}"
                                v-for="(province,key) in ChineseDistricts.city[86]" :data-provCode=" key ">
                                {{ province }}
                            </li>
                        </ul>
                        <ul class="addresss_select_item_wrapper address_city" :class="{'transform':!showCityTran}"
                            id="address_city" v-tap="{methods:show_city,item:'target'}">
                            <li class="addresss_select_item" :class="{'hide':hideOtherCity}"
                                v-for="(city,key) in ChineseDistricts.city[this.selProvTranCode]"
                                :data-cityCode=" key ">{{ city }}  </li>
                        </ul>
                        <ul class="addresss_select_item_wrapper address_area" :class="{'transform':!showAreaTran}"
                            id="address_area" v-tap="{methods:show_area,item:'target'}">
                            <li class="addresss_select_item" :class="{'hide':hideOtherArea}"
                                v-for="(country,key) in ChineseDistricts.city[this.selCityTranCode]"
                                :data-areaCode=" key ">{{ country }}



                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 底部选择地区结束 -->
            </section>


        </div>

        <!-- 阴影开始 -->
        <div class="shade" :class="{'hide':!this.isShowCopyBox}"></div>
        <!-- 阴影结束 -->
        <!-- 物流弹窗开始   -->
        <div class="pop pop_logistics" :class="{'hide':!showLogisticTap}">
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="popTit">
                    <h2 class="logistics_bg_title">物流状态</h2>
                    <span class="close" v-tap="{methods: closeWuliuBox}"></span>
                </div>
                <!-- 有物流开始 -->
                <section class="logistics_item_wrapper main-list" v-if="logisticMess">
                    <div class="full-scroll">
                        <div class="logistics_item" :class="{'logistics_item_cur': !index}"
                             v-for="(item,index) in logisticMess.context">
                            <div class="logistics_item_date">
                                <span class="logistics_item_date01">{{item.timeDate}}</span>
                                <span class="logistics_item_date02">{{ item.timeFullYear }}</span>
                            </div>
                            <div class="logistics_item_line_container">
                                <span class="logistics_item_line_circle"
                                      :class="{'logistics_item_line_circle_current': !index}"></span>
                                <span class="logistics_item_line"></span>
                            </div>
                            <div class="logistics_item_text" :class="{'logistics_item_text_current': !index}">
                                {{ item.desc }}






                            </div>
                        </div>
                    </div>
                </section>
                <!-- 有物流结束 -->
                <!-- 无物流开始 样式问题 -->
                <div class="logistics_item_wrapper" v-if="!logisticMess && this.currentLogistic">
                    <div class="logistics_none_text01">物流信息查阅服务暂不可用<br>您可以复制以下快递单号，自行前往查看</div>
                    <div class="logistics_none_text02"><span
                            class="draw_record_list_text">快递公司：{{this.currentLogistic.logistics_company}}</span>
                    </div>
                    <div class="logistics_none_text02">
                        <span class="draw_record_list_text">快递单号：<input class="copyinput" readonly
                                                                        :value="this.currentLogistic.sid"/></span>
                        <a class="draw_record_list_copy_btn" v-clipboard:copy="this.currentLogistic.sid"
                           v-clipboard:success="succCopy" @click="showCopyBox(this.currentLogistic.sid)">复制</a>
                    </div>
                </div>
                <!-- 无物流结束 -->
            </div>
        </div>

        <!-- 复制框 -->
        <div class="pop pop_logistics_copy" :class="{'hide':!isShowCopyBox}">
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="popTit">
                    <h2 class="logistics_bg_title">长按下方复制</h2>
                    <span class="close" v-tap="{methods: closeCopyBox}"></span>
                </div>
                <div class="logistics_item_wrapper_copy">
                    <input class="copyBoxinput" type="text" :value="copyValue" onfocus="this.select();">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import ChineseDistricts from '~common/city-picker.data'
    import {aTypes} from '~store/my'
    import HeaderMy from '~components/header_my.vue'
    import BannerScroll from '~components/banner-scroll.vue'

    export default {
        data () {
            return {
                isShow: false,   //  显示帮助
                helpSel: {
                    helpSel_1: true,
                    helpSel_2: false,
                    helpSel_3: false,
                    helpSel_4: false,
                    helpSel_5: false,
                    helpSel_6: false,
                    helpSel_7: false
                },
                ChineseDistricts: ChineseDistricts,
                isShowSelAddress: false,
                showCityTran: false,
                showAreaTran: false,
                hideOtherCity: false,
                hideOtherArea: false,
                hideOtherProv: false,
                selProvTran: null,
                selCityTran: null,
                selAreaTran: null,
                selProvTranCode: null,
                selCityTranCode: null,
                selAreaTranCode: null,
                selProvReady: false,
                selCityReady: false,
                selAreaReady: false,
                isTelNumber: false,
                isMsgNow: false
            }
        },
        watch: {
            addressMess () {
                if (this.$store.state.my.addressMess && this.$store.state.my.addressMess.allAddress === 'undefined') {
                    this.$store.state.my.addressMess.allAddress = ''
                }
            }
        },
        components: {
            HeaderMy,
            BannerScroll
        },
        methods: {
            nav ({params}) {
                switch (params) {
                case 'betlist':
                    _hmt.push(['_trackEvent', '500qqsd_我的页面猜球记录点击', 'click', '500qqsd_我的页面猜球记录'])
                    break
                case 'luckdraw':
                    _hmt.push(['_trackEvent', '500qqsd_我的页面奖品场点击', 'click', '500qqsd_我的页面奖品场'])
                    this.$store.state.my.showGotoSeeContain = false
                    this.$store.state.my.showGotoLuck = false
                    this.$store.state.my.showGotowinRecord = false
                    this.$store.state.my.showGotoMainList = true
                    break
                case 'charge':
                    _hmt.push(['_trackEvent', '500qqsd_我的页面充值点击', 'click', '500qqsd_我的页面充值'])

                    break
                case 'msg':
                    _hmt.push(['_trackEvent', '500qqsd_我的页面消息点击', 'click', '500qqsd_我的页面消息'])
                    this.$store.dispatch('getUserInfo')
                    this.isMsgNow = true
                    break
                }
                this.$router.replace(`/my/${params}/`)
            },
            showHelp ({isShow}) {
//                调整前进的箭头
                this.$store.state.my.showForward = !isShow

                this.helpSel.helpSel_1 = true
                this.helpSel.helpSel_2 = false
                this.helpSel.helpSel_3 = false
                this.helpSel.helpSel_4 = false
                this.helpSel.helpSel_5 = false
                this.helpSel.helpSel_6 = false
//                显示帮助
                this.$store.state.my.showTapBox = isShow
                this.isShow = isShow
            },
            helpItem ({helpSel}) {
//                切换帮助里头的选项
                switch (helpSel) {
                case 'helpSel_1':
                    this.helpSel.helpSel_1 = !this.helpSel.helpSel_1
                    break
                case 'helpSel_2':
                    this.helpSel.helpSel_2 = !this.helpSel.helpSel_2
                    break
                case 'helpSel_3':
                    this.helpSel.helpSel_3 = !this.helpSel.helpSel_3
                    break
                case 'helpSel_4':
                    this.helpSel.helpSel_4 = !this.helpSel.helpSel_4
                    break
                case 'helpSel_5':
                    this.helpSel.helpSel_5 = !this.helpSel.helpSel_5
                    break
                case 'helpSel_6':
                    this.helpSel.helpSel_6 = !this.helpSel.helpSel_6
                    break
                case 'helpSel_7':
                    this.helpSel.helpSel_7 = !this.helpSel.helpSel_7
                    break
                }
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
                    this.$store.dispatch(aTypes.getAddressMess)
                    this.$store.state.my.showGotoLuck = false
                    this.$store.state.my.showGotoMainList = false
                    this.$store.state.my.showGotoSeeContain = false
                    this.$store.state.my.showGotowinRecord = true

                    this.winRecordContent = true
                    this.$store.dispatch(aTypes.getWinGoodList)
                    break
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
            hideTapLi ({item}) {
                this.$store.state.my.showForward = true
                this.$store.state.my.showDrawTap = false
                this.$store.state.my.showTapBox = false
                switch (item) {
                case 'showPrizeList':
                    this.$store.state.my.showPrizeList = false
                    break
                case 'showAddress':
                    this.$store.state.my.showAddress = false
                    break
                case 'showLuckydraw':
                    this.$store.state.my.showLuckydraw = false
                    break
                }
            },
            showSelAddress (obj) {
                document.getElementById('input_consig').blur()
                document.getElementById('input_tel').blur()
                document.getElementById('input_textarea').blur()

//                显示地址选择
                this.isShowSelAddress = true
//                回到列表初始状态
                this.selProvReady = false
                this.selCityReady = false
                this.selAreaReady = false

                this.showAreaTran = false
                this.showCityTran = false
                this.hideOtherProv = false
            },
            show_prov (obj) {
                this.selCityReady = false
                this.selAreaReady = false
                this.showAreaTran = false

                if (!this.selProvReady) {
                    this.showCityTran = true   // 显示下一级
                    this.hideOtherProv = true
                    this.selProvTranCode = obj.event.target.getAttribute('data-provCode')
                    this.selProvTran = obj.event.target.innerText
                    this.$store.state.my.addressMess.province = obj.event.target.innerText
                    this.selProvReady = true

                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    })

                    this.hideOtherCity = false
                    this.hideOtherArea = false
                } else {
                    this.showCityTran = false
                    this.hideOtherProv = false
                    this.selProvReady = false
                }
            },
            show_city (obj) {
                this.hideOtherArea = false
                if (obj.event.target.getAttribute('data-cityCode') === null) {
//                    处理只有一个市区的bug
                    return false
                }

                if (!this.selCityReady) {
                    this.showAreaTran = true
                    this.hideOtherCity = true
                    this.selCityTranCode = obj.event.target.getAttribute('data-cityCode')

                    this.selCityTran = obj.event.target.innerText
                    this.$store.state.my.addressMess.city = obj.event.target.innerText
                    this.selCityReady = true

                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    })
                } else {
                    this.selCityReady = false
                    this.selAreaReady = false

                    this.showAreaTran = false
                    this.hideOtherCity = false
                }
            },
            show_area (obj) {
                if (!this.selAreaReady) {
                    this.hideOtherArea = true
                    this.selAreaTranCode = obj.event.target.getAttribute('data-areaCode')
                    this.selAreaTran = obj.event.target.innerText
                    this.$store.state.my.addressMess.district = obj.event.target.innerText

                    this.$store.state.my.addressMess.allAddress = this.selProvTran + this.selCityTran + this.selAreaTran || ''

                    this.isShowSelAddress = false  // 地址选择
                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    })
                    this.selAreaReady = true
                } else {
                    this.hideOtherArea = false
                    this.selAreaReady = false
                }
            },
            saveAddrMess ({params}) {
                let reg = /^1[0-9]{10}$/
                if (this.addressMess.mobile && reg.test(this.addressMess.mobile)) {
                    this.$store.dispatch(aTypes.addAddress)
                } else {
                    this.$store.dispatch('showToast', '手机号码有误,请重新输入！')
                }
            },
            succCopy (param) {
                this.$store.dispatch('showToast', '复制成功')
                if (!this.$store.state.my.isSupportCopy) {
                    this.$store.state.my.isSupportCopy = true
                }
            },
            showCopyBox (val) {
                if (this.$store.state.my.isSupportCopy) {
                    return
                }
                setTimeout(() => {
                    this.$store.state.my.copyValue = val
                    if (this.$store.state.my.isSupportCopy) {
                        return
                    }
                    this.$store.state.my.isShowCopyBox = true
                }, 150)
            },
            closeCopyBox () {
                this.$store.state.my.isShowCopyBox = false
            },
            closeSelAddr () {
                //                显示地址选择
                this.isShowSelAddress = false
//                回到列表初始状态
                this.selProvReady = false
                this.selCityReady = false
                this.selAreaReady = false

                this.showAreaTran = false
                this.showCityTran = false
                this.hideOtherProv = false
            },
            closeWuliuBox () {
                this.$store.state.my.showLogisticTap = false
            },
            confireTel (val) {
                let regTel = /^1[0-9]{10}$/
                let thisValue = val
                if (thisValue.length === 11) {
                    if (!regTel.test(thisValue)) {
                        setTimeout(() => {
                            this.$store.dispatch('showToast', '手机号码有误,请重新输入！')
                        }, 16.7)
                    }
                }
                if (thisValue.length > 11) {
                    this.$store.state.my.addressMess.mobile = thisValue.slice(0, 11)
                }
            },
            goBack () {
                window.history.back()
            }
        },
        computed: {
            isShowCopyBox () {
                return this.$store.state.my.isShowCopyBox
            },
            bannerScrollData () {
                return this.$store.state.my.bannerScrollData
            },
            logisticMess () {
                return this.$store.state.my.logisticMess
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            isLowAndroidVersion () {
                return this.$store.state.isLowAndroidVersion
            },
            showLogisticTap () {
                return this.$store.state.my.showLogisticTap
            },
            showTapBox () {
                return this.$store.state.my.showTapBox
            },
            showAddress () {
                return this.$store.state.my.showAddress
            },
            showLuckydraw () {
                return this.$store.state.my.showLuckydraw
            },
            showForward () {
                return this.$store.state.my.showForward
            },
            hasMessage () {
                if (this.userInfo) {
                    return this.userInfo.prize_record > 0 || this.userInfo.notifies > 0
                } else {
                    return false
                }
            },
            addressMess () {
                return this.$store.state.my.addressMess
            },
            isEmptyAdd () {
                return this.$store.state.my.addressMess.isEmptyAdd
            },
            jumptoSee () {
                return this.$store.state.my.jumptoSee
            },
            currentLogistic () {
                return this.$store.state.my.currentLogistic
            },
            isSupportCopy () {
                return this.$store.state.my.isSupportCopy
            },
            copyValue () {
                return this.$store.state.my.copyValue
            }
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
            },
            matchTimeThunder (time, format = 'year.MM.dd') {
                let t = new Date(+time * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/year|yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'year':
                        return tf(t.getFullYear()).slice(2)
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
            }
        }
    }
</script>
<style>

</style>
