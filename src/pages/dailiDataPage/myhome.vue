<template>
    <div class="inquire">
        <Header_all person-title="疯狂猜球代理后台" :icon-style="'userMsg'"></Header_all>
        <div class="main-home">
            <div class="date">
                <ul>
                    <li class="on">7月</li>
                    <li>8月</li>
                    <li>9月</li>
                    <li>10月</li>
                    <li>11月</li>
                    <li>12月</li>
                    <li>13月</li>
                    <li>10月</li>
                    <li>11月</li>
                    <li>12月</li>
                    <li>13月</li>
                    <li class="on">7月</li>
                    <li>8月</li>
                    <li>9月</li>
                    <li>10月</li>
                    <li>11月</li>
                    <li>12月</li>
                    <li>13月</li>
                    <li>10月</li>
                    <li>11月</li>
                    <li>12月</li>
                    <li>13月</li>
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
            <p>邀请好友在各大应用商店搜索“”。下载安装后输入您的代理号。剩下的交给我们，您什么都不用做，躺赚月薪无上限，就是这么简单！</p>
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
            };
        },
        components:{
            Header_all
        },
        methods: {
            monthFormate(startTime ,endTime){
                var arr = [];
                if(typeof startTime === 'string'){
                    startTime = +startTime;
                }
                if(typeof endTime === 'string'){
                    endTime = +endTime;
                }
                if(isNaN(startTime)) {
                    startTime = 0;
                }
                if( isNaN(endTime) ){
                    endTime = 0
                }



            }
        },
        mounted(){
            /*  做一个日期处理  */
            this.monthFormate( new Date().getTime() , '1502875428820' )

        }
    };

</script>
<style>

</style>
