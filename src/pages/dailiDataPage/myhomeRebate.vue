<template>
    <div class="rebate">
        <Header_all person-title="返佣详情" :icon-style="'dateRebate'" :time-title="titleTime"></Header_all>
        <div class="rebate-msg">
            <ul>
                <li class="rebate-msg1">
                    <span>总投注</span>
                    <div v-if="total_places">{{ total_places | moneyFormate }}</div>
                </li>
                <li class="rebate-msg2">
                    <span>总盈亏</span>
                    <div v-if="total_recharge">{{ total_recharge | moneyFormate }}</div>
                </li>
            </ul>
        </div>
        <div class="rebate-view">
            <div class="view-t">
                <ul>
                    <li>用户</li>
                    <li>充值</li>
                    <li>投注</li>
                    <li>手续费</li>
                    <li>奖品成本</li>
                </ul>
            </div>
            <div class="view-c" >
                <ul class="view-scroll" v-if="inviteList && inviteList.invitee_list && inviteList.invitee_list.length>0">
                    <li v-for="item in inviteList.invitee_list">
                        <span>{{ item.name }}</span>
                        <span>{{ item.recharge |moneyFormate }}</span>
                        <span>{{ item.places |moneyFormate }}</span>
                        <span>{{ item.tax |moneyFormate }}</span>
                        <span>{{ item.cost |moneyFormate }}</span>
                    </li>
                </ul>
                <ul class="view-scroll" v-else>
                    <p style="text-align: center;margin-top: 2rem;font-size: 0.33rem">暂无数据哦~</p>
                </ul>
            </div>
        </div>
        <div class="page-datetime">
            <mt-datetime-picker
                    ref="picker"
                    type="date"
                    v-model="valueTime"
                    v-bind:startDate=pickerValue
                    v-bind:endDate=endDate
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="handleChange">
            </mt-datetime-picker>
        </div>
    </div>
</template>
<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data () {
            return {
                title: '',
                valueTime: '2016-12-11',
                pickerValue: new Date(new Date().getFullYear() - 1, 0, 1),
                endDate: new Date(),
                titleTime: ''
            }
        },
        watch: {
            showCalendar () {
                this.open('picker')
            }
        },
        methods: {
            open (picker) {
                this.$refs[picker].open()
            },
            handleChange (value) {
                let nowDate = this.matchTimeThunder(new Date(), 'MM-dd');
                let selDate = this.matchTimeThunder(value, 'MM-dd');
                this.valueTime = this.matchTimeThunder(value);
                if (selDate === nowDate) {
                    this.titleTime = nowDate + ' 今天'
                } else {
                    this.titleTime = selDate
                }
                this.$store.dispatch('getInviteList', this.valueTime)
            },
            matchTimeThunder (time, format = 'yyyy-MM-dd') {
                let t = new Date(time);
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
            }
        },
        computed: {
            showCalendar () {
                return this.$store.state.myHomeObj.showCalendar
            },
            inviteList () {
                return this.$store.state.myHomeObj.inviteList
            },
            total_places () {
                if (this.inviteList) {
                    return this.inviteList.total_places
                }
            },
            total_recharge () {
                if (this.inviteList) {
                    return this.inviteList.total_recharge
                }
            }
        },
        components: {
            Header_all
        },
        mounted () {
            if(!this.$route.params.time){
                this.valueTime = this.matchTimeThunder(new Date());
                this.titleTime = this.matchTimeThunder(new Date(), 'MM-dd') + ' 今天';
            }else{
                this.valueTime = this.$route.params.time;
                if(this.matchTimeThunder(new Date(), 'yyyy-MM-dd') === this.valueTime){
                    this.titleTime = this.$route.params.time.slice(5) + ' 今天';
                }else{
                    this.titleTime = this.$route.params.time.slice(5);
                }
                history.replaceState({},`${location.href.split(location.pathname)[0]}${location.pathname}#/myhomeRebate`)
            }
            this.$store.dispatch('getInviteList',this.valueTime )
        },
        filters: {
            matchTimeThunder (time, format = 'yyyy-MM-dd') {
                let t = new Date(+time * 1000);
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
    /*html,body,.wrapper{*/
        /*position: absolute;*/
        /*left:0;*/
        /*right:0;*/
        /*top:0;*/
        /*bottom:0;*/
        /*width:100%;*/
        /*height:100%;*/
        /*overflow-y:auto;-webkit-overflow-scrolling:touch*/
    /*}*/
</style>
