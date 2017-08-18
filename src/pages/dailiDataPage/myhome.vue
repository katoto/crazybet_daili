<template>
    <div class="inquire">
        <Header_all person-title="疯狂猜球代理后台" :icon-style="'userMsg'"></Header_all>
        <div class="main-home">
            <div class="date" id="date">
                <!--,  scrollLeft:computeMargin  -->
                <ul id="myhomeTitle" :style="{ width: computeWidth}" v-tap="{ methods:selTitleTime}">
                    <li v-for="(item,index) in titleStr" :class="{'on': selectOn === index } " :data-time="index" >{{ item }}</li>
                </ul>
            </div>
            <div class="msg-home">
                <div>
                    <div class="include">
                        <div class="include-t">
                            疯狂猜球盈利
                        </div>
                        <div class="include-c">
                            500.3万
                        </div>
                    </div>
                    <div class="member">
                        <div class="member-t">
                            有效会员数
                        </div>
                        <div class="member-c">
                            5
                        </div>
                    </div>
                </div>
                <a href="#" class="btn">返佣详情</a>
            </div>
        </div>
        <div class="income">
            <div class="income-t">可提现佣金</div>
            <div class="income-c">7500</div>
            <a href="javascript:;" class="btn income-m unable">可提现</a>
        </div>
        <div class="bottom-home">
            <p>邀请好友在各大应用商店搜索“疯狂猜球”。下载安装后输入您的代理号。剩下的交给我们，您什么都不用做，躺赚月薪无上限，就是这么简单！</p>
            <span>专属代理号</span>
            <div class="my-code">QWE123</div>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    export default {
        data() {
            return {
                visible4: false,
                titleStr:false,
                selectOn:'',
            };
        },
        computed:{
            myhomeData(){
                return this.$store.state.myHomeObj.myhomeData
            },
            computeWidth(){
                return ( this.titleStr.length *1.43 )+'rem'
            },
            computeMargin(){
                if( this.titleStr.length > 5 ){
                    return (( this.titleStr.length -5 ) *1.43 )+'rem'
                }
                return ''
            }
        },
        components:{
            Header_all
        },
        methods: {
            selTitleTime(e){
                if(e.event.target){
                    this.selectOn = +( e.event.target.getAttribute('data-time'));
                    console.log(this.selectOn)
                }
            },
            monthFormate(startTime ,endTime){
                    /*startTime 现在时间*/
//                endTime 为注册时间
                var  monthStr = [],AjaxTime = [], timeIndex, yearIndex ,Date_startTime ,Date_endTime ,nowMonth ,endMonth;
                if(typeof startTime === 'string'){
                    startTime = +startTime;
                }
                if(typeof endTime === 'string'){
                    endTime = +endTime;
                }
                if(isNaN(startTime)) {
                    startTime = 0;
                    return false;
                }
                if( isNaN(endTime) ){
                    endTime = 0;
                    return false;
                }
                Date_startTime = new Date(startTime);
                Date_endTime = new Date(endTime);
                /* 年超过的情况 */
                monthStr.unshift( '本月');
                AjaxTime.unshift(Date_startTime.getFullYear() +'-'+(Date_startTime.getMonth()+1));
                nowMonth = Date_startTime.getMonth();
                endMonth = Date_endTime.getMonth(); // 注册的时间
                if( Date_startTime.getFullYear() !==  Date_endTime.getFullYear()){
                    console.log(Date_startTime.getFullYear())
                    console.log(Date_endTime.getFullYear())
                    yearIndex = Date_startTime.getFullYear() - Date_endTime.getFullYear() ;
                    console.log(yearIndex);
                    if( yearIndex > 1){
                        /*  中间有12个月  */
                        /* 开始了多少 */
                        for( var i=0,len = nowMonth;i< len  ;i++ ){
                            nowMonth -- ;
                            AjaxTime.unshift( Date_startTime.getFullYear() +'-'+(nowMonth+1) );
                            monthStr.unshift( (nowMonth+1)+'月' );
                        }
                        /* 中间有多少 */
                        for( var i=1,len =yearIndex;i<len;i++ ){
                            for( var j=12;j>= 1  ;j-- ){
                                AjaxTime.unshift( Date_startTime.getFullYear()-i +'-'+ j);
                                monthStr.unshift( (Date_startTime.getFullYear()-i).toString().slice(2,4) +'年'+(j) +'月');
                            }
                        }
                        /* 结束了多少 */
                        for( var i=12 ,len = (endMonth+1);i>=len  ;i-- ){
                            AjaxTime.unshift(  Date_endTime.getFullYear() +'-'+(i) );
                            monthStr.unshift( Date_endTime.getFullYear().toString().slice(2,4) +'年'+(i) +'月');
                        }
                    }else{
//                        中间无12个月
                        /* 开始了多少 */
                        for( var i=0,len = nowMonth;i< len  ;i++ ){
                            nowMonth -- ;
                            AjaxTime.unshift( Date_startTime.getFullYear() +'-'+(nowMonth+1) );
                            monthStr.unshift( (nowMonth+1)+'月' );
                        }
                        /* 结束了多少 */
                        for( var i=12 ,len = (endMonth+1);i>=len  ;i-- ){
                            AjaxTime.unshift(  Date_endTime.getFullYear() +'-'+(i) );
                            monthStr.unshift( Date_endTime.getFullYear().toString().slice(2,4) +'年'+(i) +'月');
                        }
                    }

                }else{
                    /* 无超过 */
                    timeIndex =  nowMonth - endMonth;
                    if( timeIndex !== 0 ){
                        for( var i=0;i< timeIndex;i++ ){
                            nowMonth -- ;
                            AjaxTime.unshift( Date_startTime.getFullYear() +'-'+(nowMonth+1) );
                            monthStr.unshift( (nowMonth+1)+'月' );
                        }
                    }
                }
                return {
                    titleStr:monthStr,
                    AjaxStr:AjaxTime
                }
            }
        },
        mounted(){
            /*  做一个日期处理  */
            var a = this.monthFormate( new Date().getTime() , '1488973208820');
            this.titleStr = a.titleStr;
            this.selectOn =   this.titleStr.length -1;
            console.log(this.titleStr)

        }
    };
</script>
<style>
    ::-webkit-scrollbar {
        display: none;/*隐藏滚轮*/
    }
</style>
