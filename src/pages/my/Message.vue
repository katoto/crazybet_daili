<template>
    <div class="main respon2-itm bg2" style="overflow: hidden">
        <div class="full-scroll message">
            <div class="emptyBox respon2" :class="{'hide':messageList.length}">
                <div class="empty respon2-itm">
                    <div class="emptyIn">
                        <span class="icon icon_empty"></span>
                        <p>近期无消息</p>
                    </div>
                </div>
                <!-- 底部banner -->
                <common-footer></common-footer>
            </div>
            <div id="MatchListDom">
                <div class="list list-cont" v-for="msg in messageList" >
                    <div class="list-tit clear">
                        <h4>[{{msg.pid?'奖励':'系统'}}] {{msg.title}}<sup v-if="(msg.pid && msg.valid )|| (!msg.pid && msg.isnew==='1' )"></sup></h4>
                        <span class="time">{{msg.time}}</span>
                    </div>
                    <div class="cont">
                        {{msg.content}}
                    </div>
                    <template v-if="msg.pid">
                        <div class="jiangli">
                            <strong class="yellow">奖励{{msg.award_num}}猜球币</strong>
                            <span class="btn-lingqu btn-lingqu-no" key="liqu" v-if="msg.valid" v-tap="{methods: lq, params: msg.pid}">领取</span>
                            <span class="btn-lingqu btn-lingqu-no" key="liqu_ok" v-if="!msg.valid" style="background-color: #737373">已领取</span>
                        </div>
                        <div class="toast" v-if="msg.showSucc">领取成功</div>
                    </template>
                </div>
                <p class="message-tips" :class="{'hide':!messageList.length}" v-show="isAddMessList">加载中...</p>
                <p class="message-tips" :class="{'hide':!messageList.length }">只显示最近的50条系统消息</p>
                <!-- 底部banner -->
                <common-footer :class="{'hide':!messageList.length }"></common-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import {aTypes} from '~store/my'
    import CommonFooter from '~components/common-footer.vue'
    export default {
        data () {
            return {
                loading: false
            }
        },
        watch: {
        },
        components: {
            CommonFooter
        },
        methods: {
            ...mapActions([
                'lqPrize'
            ]),
            lq ({params}) {
//                领取金币
                this.$store.dispatch(aTypes.lqPrize, params)
            },
            onScroll (event) {
                var offsetHeight = document.getElementById('MatchListDom').offsetHeight,
                    scrollTop = event.target.scrollTop,
                    scrollBottom = windowHeight() + scrollTop + 10
                if (scrollTop === 0) {
                    if (this.messPageNum === 1) {
                        return
                    }
                }
                if (scrollBottom >= offsetHeight) {
                    console.log('到底在 可以去请求数据了')
                    this.throttle(this.changePgItems)
                }
                function windowHeight () {
                    return (document.compatMode === 'CSS1Compat')
                        ? document.documentElement.clientHeight
                        : document.body.clientHeight
                }
            },
            throttle (method, context) {
//               函数节流
                clearTimeout(method.tId)
                method.tId = setTimeout(() => { method() }, 50)
            },
            changePgItems () {
                this.$store.dispatch(aTypes.getMessageList, this.messPageNum)
                console.log(this.messPageNum)
            }
        },
        computed: {
            messageList () {
                return this.$store.state.my.messageList
            },
            messPageNum () {
                return this.$store.state.my.messPageNum
            },
            isNoneMessList () {
                return this.$store.state.my.isNoneMessList
            },
            isAddMessList () {
                return this.$store.state.my.isAddMessList
            }
        },
        mounted () {
            setTimeout(() => {
                let messageDom = document.querySelector('.message')
                messageDom && messageDom.addEventListener('scroll', this.onScroll)
            }, 100)
            this.$store.state.my.isNoneMessList = false
            this.$store.state.my.messPageNum = 1
            this.$store.dispatch(aTypes.getMessageList)
        }
    }
</script>
<style>
</style>
