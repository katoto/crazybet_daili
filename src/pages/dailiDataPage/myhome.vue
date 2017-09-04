<template>
    <div class="inquire">
        <Header_all person-title="疯狂猜球合伙人后台" :icon-style="'userMsg'"></Header_all>
        <div class="main-home">
            <div class="date" id="date">
                <ul id="myhomeTitle" :style="{ width: computeWidth}" v-tap="{ methods:selTitleTime}">
                    <li v-for="(item,index) in titleStr" :class="{'on': selectOn === index } " :data-time="index" >{{ item }}</li>
                </ul>
            </div>
            <div class="msg-home">
                <div v-if="myhomeData">
                    <div class="include">
                        <div class="include-t">
                            疯狂猜球盈利
                        </div>
                        <div class="include-c">
                            {{ myhomeData.total_recharge |moneyFormate}}
                        </div>
                    </div>
                    <div class="member">
                        <div class="member-t">
                            有效会员数
                        </div>
                        <div class="member-c">
                            {{ myhomeData.eff_user }}
                        </div>
                    </div>
                </div>
                <a href="javascript:;" class="btn" v-tap="{ methods: jumpToPage,go: 'myhomeRebate'  }" style="color: #6569c6;">返佣详情</a>
            </div>
        </div>
        <div class="income" v-if="myhomeData">
            <div class="income-t">可提现佣金</div>
            <div class="income-c">{{ myhomeData.refound }}</div>
            <a href="javascript:;" class="btn income-m" v-if="myhomeData.refound_status==='1'"  v-tap="{ methods: jumpToPage,go: 'myHomePayApply'  }">可提现</a>
            <a href="javascript:;" class="btn income-m" v-if="myhomeData.refound_status==='0'"  v-tap="{ methods: jumpToPage,go: 'myHomePayApply'  }">查看</a>
            <a href="javascript:;" class="btn income-m unable" v-if="myhomeData.refound_status==='2'">提现处理中</a>
        </div>
        <div class="bottom-home">
            <p>邀请好友在各大应用商店搜索“疯狂猜球”。下载安装后输入您的推广合作号。剩下的交给我们，您什么都不用做，躺赚月薪无上限，就是这么简单！</p>
            <span style="display: inline-block;height: 1.23rem">专属推广合作号</span>
            <div class="my-code" style="height: 1.23rem" v-if="myhomeData"
                 v-clipboard:success="succCopy"
                 v-clipboard:error="onError"
                 v-clipboard:copy="myhomeData.share_code"
            >{{ myhomeData.share_code }}</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Header_all from '~components/header_all.vue'
    import vueClipboard2 from 'vue-clipboard2'
    Vue.use(vueClipboard2);
export default {
        data () {
            return {
                visible4: false,
                titleStr: '',
                selectOn: '',
                forTiltleTime: '',
                currMonth:''
            }
        },
        computed: {
            myhomeData () {
                return this.$store.state.myHomeObj.myhomeData
            },
            computeWidth () {
                return (this.titleStr.length * 1.43) + 'rem'
            },
            computeMargin () {
                if (this.titleStr.length > 5) {

                    return ((this.titleStr.length - 5))
                }
                return ''
            }
        },
        watch: {
            computeMargin( mar ){
                setTimeout(()=>{
                    var liWidthDom = document.querySelector('#myhomeTitle li');
                    var liWidth = '';
                    if(liWidthDom){
                        liWidth = window.getComputedStyle(liWidthDom , null)['width'];
                        document.getElementById('date').scrollLeft = parseInt(mar) * (liWidth.replace(/px/g,'')) ;
                    }
                },30)
            },
            myhomeData (data, backdata) {
                if (data && data.cur_time && data.reg_time) {
//                    let forTiltleTime = this.monthFormate(parseFloat(data.cur_time) * 1000, parseFloat(data.reg_time) * 1000 - 30322220000);
                    let forTiltleTime = this.monthFormate(parseFloat(data.cur_time) * 1000, parseFloat(data.reg_time) * 1000);
                    this.$store.commit('setMoneyNumber',data.refound);
                    this.forTiltleTime = forTiltleTime;
                    this.titleStr = forTiltleTime.titleStr;
                    if (!backdata) {
                        this.selectOn = this.titleStr.length - 1
                    }
                }
            }
        },
        components: {
            Header_all
        },
        methods: {
            succCopy () {
                this.$store.dispatch('showToast', '复制成功')
            },
            onError () {
                this.$store.dispatch('showToast', '你手机不支持复制，收到输入~')
            },
            jumpToPage ({ go }) {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                scrollTop = 0;
                switch (go) {
                case 'myhomeRebate':
                    this.$router.push(`/myhomeRebate/${this.currMonth}-01`);
                    break;
                case 'myHomePayApply':
                    this.$router.push(`/myHomePayApply`);
                    break;
                case 'back':
                    window.history.back();
                    break
                }
            },

            selTitleTime (e) {
                if (e.event.target) {
                    this.selectOn = +(e.event.target.getAttribute('data-time'));
                    this.currMonth = this.forTiltleTime.AjaxStr[this.selectOn];
                    this.$store.dispatch('getUserHomeInfo', this.forTiltleTime.AjaxStr[this.selectOn])
                }
            },
            matchTimeThunder (time, format = 'yyyy-MM-dd') {
                let t = time;
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                };
                return format.replace(/year|yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'year':
                        return tf(t.getFullYear()).slice(2);
                    case 'yyyy':
                        return tf(t.getFullYear());
                    case 'MM':
                        return tf(t.getMonth() + 1);
                    case 'mm':
                        return tf(t.getMinutes());
                    case 'dd':
                        return tf(t.getDate());
                    case 'HH':
                        return tf(t.getHours());
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            monthFormate (startTime, endTime) {
                    /* startTime 现在时间 */
//                endTime 为注册时间
                var monthStr = [], AjaxTime = [], timeIndex, yearIndex, Date_startTime, Date_endTime, nowMonth, endMonth
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                if (typeof startTime === 'string') {
                    startTime = +startTime
                }
                if (typeof endTime === 'string') {
                    endTime = +endTime
                }
                if (isNaN(startTime)) {
                    startTime = 0
                    return false
                }
                if (isNaN(endTime)) {
                    endTime = 0
                    return false
                }
                Date_startTime = new Date(startTime)
                Date_endTime = new Date(endTime)
            /* 年超过的情况 */
                monthStr.unshift('本月')
                AjaxTime.unshift(Date_startTime.getFullYear() + '-' + tf(Date_startTime.getMonth() + 1))
                nowMonth = Date_startTime.getMonth()
                endMonth = Date_endTime.getMonth() // 注册的时间
                if (Date_startTime.getFullYear() !== Date_endTime.getFullYear()) {
                    console.log(Date_startTime.getFullYear())
                    console.log(Date_endTime.getFullYear())
                    yearIndex = Date_startTime.getFullYear() - Date_endTime.getFullYear()
                    console.log(yearIndex)
                    if (yearIndex > 1) {
                        /*  中间有12个月  */
                        /* 开始了多少 */
                        for (var i = 0, len = nowMonth; i < len; i++) {
                            nowMonth--
                            AjaxTime.unshift(Date_startTime.getFullYear() + '-' + tf(nowMonth + 1))
                            monthStr.unshift((nowMonth + 1) + '月');
                        }
                        /* 中间有多少 */
                        for (var i = 1, len = yearIndex; i < len; i++) {
                            for (var j = 12; j >= 1; j--) {
                                AjaxTime.unshift(Date_startTime.getFullYear() - i + '-' + tf(j));
                                monthStr.unshift((Date_startTime.getFullYear() - i).toString().slice(2, 4) + '年' + (j) + '月')
                            }
                        }
                        /* 结束了多少 */
                        for (var i = 12, len = (endMonth + 1); i >= len; i--) {
                            AjaxTime.unshift(Date_endTime.getFullYear() + '-' + tf(i));
                            monthStr.unshift(Date_endTime.getFullYear().toString().slice(2, 4) + '年' + (i) + '月')
                        }
                    } else {
//                        中间无12个月
                        /* 开始了多少 */
                        for (var i = 0, len = nowMonth; i < len; i++) {
                            nowMonth--
                            AjaxTime.unshift(Date_startTime.getFullYear() + '-' + tf(nowMonth + 1));
                            monthStr.unshift((nowMonth + 1) + '月')
                        }
                        /* 结束了多少 */
                        for (var i = 12, len = (endMonth + 1); i >= len; i--) {
                            AjaxTime.unshift(Date_endTime.getFullYear() + '-' + tf(i));
                            monthStr.unshift(Date_endTime.getFullYear().toString().slice(2, 4) + '年' + (i) + '月')
                        }
                    }
                } else {
                    /* 无超过 */
                    timeIndex = nowMonth - endMonth
                    if (timeIndex !== 0) {
                        for (var i = 0; i < timeIndex; i++) {
                            nowMonth--
                            AjaxTime.unshift(Date_startTime.getFullYear() + '-' + tf(nowMonth + 1));
                            monthStr.unshift((nowMonth + 1) + '月')
                        }
                    }
                }
                return {
                    titleStr: monthStr,
                    AjaxStr: AjaxTime
                }
            }
        },
        mounted () {
            this.currMonth = this.matchTimeThunder(new Date(), 'yyyy-MM');
            this.$store.dispatch('getUserHomeInfo', this.matchTimeThunder(new Date(), 'yyyy-MM'));
            if (this.myhomeData) {
                this.selectOn = this.titleStr.length - 1
            }
        },
        beforeDestroy () {
            this.$store.commit('setMyHomeData', null)
        },
        filters: {
            moneyFormate: (num) => {
                num = Number(num);
                num = parseInt(num);
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 100) / 100 + '万'
                } else {
                    return Math.round(num / 100000000 * 100) / 100 + '亿'
                }
            }
        }
    }
</script>
<style>
    ::-webkit-scrollbar {
        display: none;/*隐藏滚轮*/
    }
</style>
