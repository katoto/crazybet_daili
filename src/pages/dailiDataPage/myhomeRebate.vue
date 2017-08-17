<template>
    <div class="rebate">
        <Header_all person-title="返佣详情" :icon-style="'dateRebate'"></Header_all>
        <div class="rebate-msg">
            <ul>
                <li class="rebate-msg1">
                    <span>总投注</span>
                    <div>65.3万</div>
                </li>
                <li class="rebate-msg2">
                    <span>总盈亏</span>
                    <div>62万</div>
                </li>
            </ul>
        </div>
        <div class="rebate-view">
            <div class="view-t">
                <ul>
                    <li>用户</li>
                    <li>充值</li>
                    <li>盈亏</li>
                    <li>手续费</li>
                    <li>奖品成本</li>
                </ul>
            </div>
            <div class="view-c">
                <ul class="view-scroll">
                    <li>
                        <span>1111111111111111111111111</span>
                        <span>2111111111111111111111111</span>
                        <span>3222222222222222</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>133</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>144</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>133</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>144</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>333</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </li>
                    <li>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>final</span>
                    </li>
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
        data(){
            return {
                title: '',
                valueTime: '2016-12-11',
                pickerValue:new Date(new Date().getFullYear() - 1, 0, 1),
                endDate:new Date(),
            }
        },
        watch: {
            showCalendar(){
                this.open('picker')
            }
        },
        methods: {
            open(picker) {
                this.$refs[picker].open();
            },
            handleChange(value) {
                this.valueTime = this.matchTimeThunder(value);
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
            showCalendar(){
                return this.$store.state.myHomeObj.showCalendar
            }
        },
        components:{
            Header_all
        },
        mounted(){
            this.valueTime = this.matchTimeThunder(new Date());
        },
        filters:{
            matchTimeThunder (time, format = 'yyyy-MM-dd') {
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
    html,body,.wrapper{
        height:100%;
        overflow: hidden;
    }
</style>
