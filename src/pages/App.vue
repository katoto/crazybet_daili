<template>
    <div class="wrapper">
        <div class="toast" v-show="toastMsg">{{ toastMsg }}</div>
        <router-view v-if="ready||1"></router-view>
    </div>
</template>
<script>
//    import '~static/css/register.css'
//    import '~static/css/live.css'
//    import '~static/css/mine.css'
//    import '~static/css/media.css'
    import {getCk, isLowAndroidVersion, platform} from '~common/util'

    export default {
        data () {
            return {
                ready: false,
            }
        },
        computed: {
            toastMsg () {
                return this.$store.state.toastMsg
            },
        },
        async mounted () {
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
<style>
    body,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    li,
    dl,
    dt,
    dd,
    table,
    th,
    td,
    form,
    fieldset,
    legend,
    input,
    textarea,
    button,
    select {
        margin: 0;
        padding: 0;
    }

    body,
    input,
    textarea,
    select,
    button,
    table {
        font-size: 0.14rem;
    }
    html {
        height: 100%;
    }
    body {
        min-width: 7.5rem;
        font-size: 0.28rem;
        font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        color: #333;
        -webkit-text-size-adjust: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-overflow-scrolling: touch;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    fieldset,
    img,
    button {
        border: 0;
    }
    li {
        list-style: none
    }
    a {
        text-decoration: none;
        color: #333;
        outline: none
    }
    img {
        vertical-align: middle
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input,
    textarea,
    select,
    button {
        font-size: 100%
    }
    ::-webkit-input-placeholder {
        color: #bbb;
    }
    input[type="text"], input[type="number"], input[type="password"],.input[type="button"], input[type="submit"], input[type="reset"]{
        -webkit-appearance: none;
        border-radius: 0;
    }
    em,
    i {
        font-style: normal
    }
    .btn{
        display: block;
        text-align: center;
    }
    .font0{
        font-size:0;
        text-indent:-999.99rem;
    }
    .hide {
        display: none
    }
    .toast {
        line-height: 0.44rem;
        width: 5.8rem;
        padding: 0.3rem 0.4rem;
        background: rgba(0, 0, 0, .9);
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.08rem;
        position: fixed;
        left: 50%;
        top: 40%;
        z-index: 99;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .wrapper {
        position: relative;
        width:100%;
    }
    /*澶撮儴寮€濮�*/
    .top{
        position: fixed;
        top:0;
        left:0;
        z-index:99;
        width:100%;
        height:1rem;
        background: #333;
        line-height:1rem;
    }
    .back{
        position: absolute;
        left:0;
        top:0;
        padding:0.25rem 0.2rem;
        width: 0.31rem;
        height: 0.51rem;
        background: url("../images/back.png") no-repeat center;
        background-size: 0.31rem 0.51rem;
    }
    .login{
        position: absolute;
        right:0.35rem;
        top:0;
        font-size:0.3rem;
        color: #fff;
    }
    .user{
        position: absolute;
        right:0.35rem;
        top:0.285rem;
        width:0.44rem;
        height:0.43rem;
        padding-top:0.01rem;
        overflow: hidden;
        font-size:0;
        background: url("../images/user.png") no-repeat center;
        background-size: cover;
    }
    .top h1{
        text-align: center;
        font-size:0.36rem;
        color: #fff;
        font-weight:normal;
    }
    /*澶撮儴缁撴潫*/
    .form{
        padding:0 0.4rem;
        margin-top:1rem;
    }
    .form .prompt{

    }
    .form h2{
        font-size:0.36rem;
        color: #020202;
        font-weight:normal;
        line-height:0.48rem;
    }
    .unable{
        color: #c0bfc4 !important;
        border-color: #c0bfc4 !important;
    }
    .use-msg{
        padding-top:0.3rem;
    }
    .rebate-msg{
        margin-top:0.54rem;
    }
    .reg-input,.login-input{
        position: relative;
        width:100%;
        height:0.78rem;
        overflow: hidden;
        line-height:0.78rem;
        border-bottom:1px solid #ededed;
    }
    .prompt{
        float: left;
        color: #f64176;
        font-size:0.28rem;
    }
    .reg-tips{
        float: left;
        margin-left:0.15rem;
        line-height:0.78rem;
        font-size:0.28rem;
        color: #c0bfc4;
    }
    .reg-input input{
        position: absolute;
        z-index:1;
        left:0;
        top:0;
        width:100%;
        height:100%;
        line-height:0.78rem;
        font-size:0.28rem;
        color: #000;
        outline:none;
        border:none;
        background: transparent;
        text-indent:0.3rem;
    }
    .seng-code{
        position: absolute;
        z-index:2;
        right:0.08rem;
        top:0.04rem;
        width:2.52rem;
        height:0.66rem;
        overflow: hidden;
        border:1px solid #6569c6;
        -webkit-border-radius: 0.06rem;
        -moz-border-radius: 0.06rem;
        border-radius: 0.06rem;
        font-size:0.28rem;
        color: #6569c6;
        line-height:0.66rem;
    }
    .forget-psw .seng-code{
        top:0.12rem;
    }
    .eye{
        position: absolute;
        z-index:2;
        top:0.22rem;
        right:0.3rem;
        width:0.61rem;
        height:0.35rem;
        overflow: hidden;
    }
    .eye-on{
        background: url("../images/eye-on.png") no-repeat center;
        background-size: cover;
    }
    .eye-off{
        background: url("../images/eye-off.png") no-repeat center;
        background-size: cover;
    }
    .forget-psw .eye{
        top:0.325rem;
    }
    .reg-form .protocol{
        margin: 0.24rem 0 0.66rem 0;
        line-height:0.46rem;
        font-size:0.24rem;
        color: #808080;
    }
    .protocol2{
        font-size:0.24rem;
        color: #6569c6;
        text-align: center;
        line-height:0.77rem;
        margin-top:3.16rem;
    }
    .protocol input[type="checkbox"]{
        display: block;
        float: left;
        width:0.44rem;
        height:0.44rem;
        overflow: hidden;
        background: #f0f0f0;
        border:1px solid #ddd;
    }
    .protocol a{
        color: #6569c6;
    }
    .reg-form>input,.check-refuse,.check-ing,.check-agree,.loginon>input,.forget-next,.forget-sure{
        display: block;
        width:100%;
        line-height:0.78rem;
        text-align: center;
        -webkit-border-radius: 0.06rem;
        -moz-border-radius: 0.06rem;
        border-radius: 0.06rem;
        font-size:0.36rem;
        color: #fff;
        border:none;
        outline:none;
    }
    .reg-form>input,.check-agree,.loginon>input,.forget-next,.forget-sure{
        background: #6569c6;
    }
    .forget-next,.forget-sure{
        width:6.7rem;
        margin:0.7rem auto 0;
    }
    .check-refuse{
        background: #c0bfc4;
    }
    .check-ing{
        background: #a5a6d4;
    }
    .check-time{
        text-align: center;
        font-size:0.28rem;
        color: #808080;
        line-height:0.6rem;
    }
    .loginon>input{
        margin-top:0.8rem;
    }
    .contact-us{
        margin-top:0.88rem;
        line-height:1.16rem;
        width:100%;
        text-align: center;
        font-size:0.24rem;
        color: #808080;
    }
    .notice{
        height:0.34rem;
        line-height:0.34rem;
        font-size:0.28rem;
        color: #808080;
    }
    .check{
        margin-bottom:0.33rem;
    }
    /*娉ㄥ唽淇℃伅*/
    .regMsg-form{
        color: #020202;
    }
    .reg-msg{
        line-height:0.58rem;
        overflow: hidden;
        font-size:0.28rem;
    }
    .reg-msg span{
        display: block;
        max-width:30%;
        float: left;
        color: #c0bfc4;
    }
    .reg-msg p{
        float: left;
        max-width:70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .user-phone{
        padding-top:0.4rem;
        margin:0 0 0.38rem 0;
    }
    .com-msg{
        line-height:0.64rem;
        font-size:0.36rem;
    }
    .user-line{
        height:1px;
        background: #ececec;
        margin: 0.15rem 0 0.1rem 0;
    }
    /*鐧诲綍*/
    .loginon h1{
        font-size:0.48rem;
        color: #020202;
        text-align: center;
        margin: 0 0 0.75rem 0;
        padding-top: 0.92rem;
    }
    .login-tips{
        display: block;
        float: left;
        width:1.46rem;
        font-size:0.28rem;
        color: #020202;
    }
    .plaholder{
        font-size:0.28rem;
        color: #c0bfc4;
    }
    .login-input input{
        position: absolute;
        width:5.24rem;
        height:0.78rem;
        overflow: hidden;
        top:0;
        left:1.46rem;
        line-height:0.75rem;
        outline:none;
        border:none;
        font-size:0.28rem;
        color: #020202;
        background: transparent;
    }
    .loginon a{
        line-height:1rem;
        font-size:0.28rem;
        color: #808080;
    }
    /*蹇樿瀵嗙爜*/
    .forget-psw{
        background: #f2f2f2;
        padding-top:1.37rem;
    }
    .forget-one,.forget-two{
        width:100%;
        background: #fff;
    }
    .forget-input{
        position: relative;
        margin:0 0.63rem;
        height:0.94rem;
        line-height:0.94rem;
        overflow: hidden;
    }
    .forget-input+.forget-input{
        border-top:1px solid #e2e2e2;
    }
    .forget-tips{
        display: block;
        float: left;
        overflow: hidden;
        margin:0.275rem 0.23rem 0 0;
    }
    .forget-phone .forget-tips{
        width:0.28rem;
        height:0.39rem;
        background: url("../images/phone.png") no-repeat center;
        background-size: 0.28rem 0.39rem;
    }
    .forger-code .forget-tips{
        width:0.3rem;
        height:0.45rem;
        background: url("../images/lock.png") no-repeat center;
        background-size: 0.3rem 0.45rem;
    }
    .forget-password .forget-tips{
        margin:0.275rem 0.23rem 0 0;
        width:0.3rem;
        height:0.47rem;
        background: url("../images/unlock.png") no-repeat center;
        background-size: 0.3rem 0.47rem;
    }
    .forget-placehold{
        font-size:0.28rem;
        color: #c0bfc4;
    }
    .forget-input input{
        position: absolute;
        top:0;
        left:0.51rem;
        width:2.7rem;
        height:0.94rem;
        overflow: hidden;
        outline:none;
        border:none;
        background: transparent;
        font-size:0.28rem;
        color: #020202;
    }
    /*鐤媯鐚滅悆浠ｇ悊鍚庡彴*/
    .inquire{
        position: relative;
        height:100%;
        background: #f2f2f2;
    }
    .bottom-home{
        padding:2.04rem 0.75rem 0;
    }
    .bottom-home p,.bottom-home span{
        font-size:0.24rem;
        color: #4c4c4c;
        line-height:0.36rem;
    }
    .bottom-home span{
        position: absolute;
        left:0.75rem;
        bottom:0.26rem;
        line-height:1.23rem;
    }
    .my-code{
        text-align: center;
        line-height:1.23rem;
        margin-bottom:0.26rem;
        font-size:0.48rem;
        color: #020202;
    }
    .main-home{
        width:100%;
        overflow: hidden;
        background: #fff;
        margin-top:1rem;
    }
    .date{
        width:100%;
        height:0.43rem;
        overflow-x: scroll;
        border-bottom:1px solid #e2e2e2;
        padding-top:0.33rem;
        font-size:0.24rem;
        color: #c0c0c4;
    }
    .date ul{
        width:40rem;
        /*瀹藉害闇€瑕佸姩鎬佽幏鍙�*/
        height:0.43rem;
        overflow-x: auto;
        text-align: center;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
    }
    .date li{
        width:1.43rem;
        height: 0.4rem;
        overflow: hidden;
        line-height:0.4rem;
        display: inline-block;
        border-bottom:0.03rem solid #fff;
    }
    .date li.on{
        color: #020202;
        border-color: #545454;
    }
    .msg-home{
        margin: 0.7rem 0 0.1rem 0;
        text-align: center;
        color: #020202;
    }
    .msg-home>div{
        height:1.48rem;
        overflow: hidden;
        background: url("../images/bg-line.jpg") center repeat-y;
    }
    .include,.member{
        width:50%;
        float: left;
    }
    .msg-home a{
        font-size:0.28rem;
        color: #4c4c4c;
        line-height:0.86rem;
    }
    .member-t{
        width:1.38rem;
        height:0.34rem;
        overflow: hidden;
        background: url("../images/member-t.png") no-repeat center;
        background-size:1.38rem ;
        font-size:0;
        margin:0.15rem auto;
    }
    .include-t{
        width:2.06rem;
        height:0.34rem;
        overflow: hidden;
        padding-left:0.1rem;
        /*兼容安卓图片显示不全*/
        background: url("../images/include-t.png") no-repeat center;
        background-size:2.06rem 0.34rem;
        font-size:0;
        margin:0.15rem auto;
    }
    .include-c,.member-c{
        line-height:0.68rem;
        font-size:0.48rem;
    }
    .include-c{
        text-align: left;
        text-indent:1.25rem;
    }
    .income{
        margin-top:0.23rem;
        padding-top:0.32rem;
        background: #fff;
        text-align: center;
    }
    .income-t{
        width:1.81rem;
        height:0.34rem;
        overflow: hidden;
        background: url("../images/income-t.png") no-repeat center;
        background-size:1.81rem 0.34rem;
        padding-left:0.1rem;
        /*兼容安卓图片显示不全*/
        font-size:0;
        margin:0 auto 0.32rem;
    }
    .income-c{
        line-height:0.68rem;
        font-size:0.48rem;
        color: #020202;
    }
    .income-m{
        line-height:1.42rem;
        margin-bottom:0.06rem;
        font-size:0.28rem;
        color: #6569c6;
    }
    /*涓汉淇℃伅*/
    .main-mymsg{
        height:6.8rem;
        padding:1.4rem 0.4rem 0;
        background: #fff;
    }
    .inquire .user-phone{
        margin:0;
    }
    .inquire .user-proxy{
        margin-bottom:0.38rem;
    }
    .inquire .protocol2{
        width:100%;
        line-height:0.47rem;
        margin:3.12rem 0 0 0;
    }
    .inquire .contact-us{
        margin:0 0 0.54rem 0;
        line-height:0.5rem;
    }
    /*鎻愮幇鐢宠*/
    .payApply{
        height:100%;
        background: #f2f2f2;
    }
    .payList{
        position: absolute;
        right: 0.42rem;
        top: 0.31rem;
        width: 0.42rem;
        height: 0.38rem;
        overflow: hidden;
        font-size: 0;
        background: url("../images/calendar.png") no-repeat center;
        background-size: cover;
    }
    .main-payApply{
        height: 7.74rem;
        padding:1.38rem 0.4rem 0;
        background: #fff;
    }
    .apply-user,.apply-ali{
        width:100%;
        height:0.62rem;
        overflow: hidden;
        line-height:0.62rem;
        font-size:0.28rem;
    }
    .apply-ali{
        padding-bottom:0.38rem;
        border-bottom:1px solid #ececec;
    }
    .apply-user span,.apply-ali span{
        display: block;
        float: left;
        color: #c0bfc4;
    }
    .apply-user div,.apply-ali div{
        max-width:70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .apply-can{
        margin-top:0.32rem;
        line-height:0.64rem;
        font-size:0.28rem;
        color: #020202;
    }
    .apply-now{
        line-height:0.63rem;
        padding-bottom:0.24rem;
        border-bottom:1px solid #ececec;
    }
    .apply-now span{
        float: left;
        font-size:0.36rem;
        color: #020202;
    }
    .apply-now input{
        margin-left:0.2rem;
        border:none;
        outline:none;
        height:0.63rem;
        line-height:0.63rem;
        font-size:0.36rem;
        color: #020202;
    }
    .apply-now ::-webkit-input-placeholder { /* WebKit browsers */
        font-size:0.28rem;
    }
    .apply-tips{
        height:1.12rem;
        line-height:1.12rem;
        margin-bottom:0.4rem;
        font-size:0.28rem;
        color: #c0bfc4;
    }
    .apply-tips a{
        color: #6569c6;
    }
    .red{
        color: #f64e7d;
    }
    .btn-apply{
        width: 100%;
        line-height: 0.78rem;
        text-align: center;
        -webkit-border-radius: 0.06rem;
        -moz-border-radius: 0.06rem;
        border-radius: 0.06rem;
        font-size: 0.36rem;
        color: #fff;
        background: #a5a6d4;
    }
    .apply-time{
        line-height:0.9rem;
        font-size:0.28rem;
        color: #808080;
        text-align: center;
    }
    .btn-sure{
        background: #6569c6;
    }
    .bottom-payApply{
        padding:2.17rem 0.4rem 0.44rem;
        line-height:0.3rem;
        font-size:0.24rem;
        color: #808080;
    }
    .bottom-payApply p:last-child{
        margin-top:0.3rem;
    }
    /*鎻愮幇璁板綍*/
    .home{
        position: absolute;
        right: 0.45rem;
        top: 0.3rem;
        width: 0.46rem;
        height: 0.4rem;
        overflow: hidden;
        font-size: 0;
        background: url("../images/home.png") no-repeat center;
        background-size: cover;
    }
    .main-list{
        margin-top:1rem;
    }
    .main-list ul{
        height:100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .main-list li{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding:0 0.4rem;
        line-height:0.9rem;
        background: #f2f2f2;
        font-size:0.28rem;
        color: #5e5e5e;
    }
    .main-list li+li{
        margin-top:0.14rem;
    }
    .list-money{
        max-width:50%;
        height:0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .more{
        width: 6.7rem;
        line-height: 0.78rem;
        text-align: center;
        -webkit-border-radius: 0.06rem;
        -moz-border-radius: 0.06rem;
        border-radius: 0.06rem;
        font-size: 0.36rem;
        color: #fff;
        background: #6569c6;
        margin: 0.7rem auto 0;
    }
    .more-no{
        background: #a5a6d4;
    }
    /*杩斾剑璇︽儏*/
    .date-rebate{

    }
    /*aa*/
    .rebate{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        position: relative;
        height:100%;
        overflow: hidden;
    }
    .date-rebate{
        position: absolute;
        right: 0.42rem;
        top: 0.31rem;
        min-width: 0.42rem;
        height: 0.38rem;
        overflow: hidden;
        font-size: 0;
        background: url(../images/calendar.png) no-repeat right center;
        background-size: cover;
    }
    .rebate .rebate-msg{
        width:100%;
        height:1.07rem;
        overflow: hidden;
        background: #ededed;
        margin-top:1rem;
    }
    .rebate-msg ul{
        overflow: hidden;
        background: url(../images/rebate-line.png) no-repeat center;
        background-size: 1px 0.57rem;
    }
    .rebate-msg li{
        float: left;
        width:50%;
        height:1.07rem;
        text-align: center;
    }
    .rebate-msg li span{
        display: block;
        width:1.06rem;
        height: 0.34rem;
        overflow: hidden;
        font-size:0;
        margin:0.16rem auto 0.1rem;
    }
    .rebate-msg1 span{
        background: url("../images/rebate-msg1.png") no-repeat center;
        background-size: cover;
    }
    .rebate-msg2 span{
        background: url("../images/rebate-msg2.png") no-repeat center;
        background-size: cover;
    }
    .rebate-msg li div{
        line-height:0.3rem;
        font-size:0.24rem;
        color: #020202;
    }
    .rebate-view{
        display: flex;
        margin-top:0.2rem;
        overflow: hidden;
        flex:1;
        -webkit-box-flex: 1;
        flex-direction: column;
    }
    .view-t{
        width:100%;
        overflow: hidden;
        background: #e4e4e4;
        height:0.82rem;
    }
    .view-c{
        flex:1;
        -webkit-flex: 1;
        width:100%;
        position: relative;
    }
    .view-scroll {
        position: absolute;
        left:0;
        top:0;
        right: 0;
        bottom:0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .view-t ul{
        display: flex;
        display: -webkit-flex;
        border-bottom:1px solid #e4e4e4;
    }
    .view-c ul{

    }
    .view-t li,.view-c li{
        flex:1;
        -webkit-box-flex: 1;
        text-align: center;
        line-height:0.82rem;
        font-size:0.22rem;
        color: #020202;
    }
    .view-t li+li{
        border-left:1px solid #d2d2d2;
    }
    .view-c li{
        display: flex;
        display: -webkit-flex;
        height:0.7rem;
        line-height:0.7rem;
        overflow: hidden;
        border-bottom:1px solid #d2d2d2;
    }
    .view-c span{
        flex:1;
        font-size:0.24rem;
        color: #020202;
        display: inline-block;
        width:20%;
        overflow: hidden;
    }
    .view-c span:first-child{
        background: #f2f2f2;
        text-align: center;
        font-size:0.22rem;
        color: #6c6c6c;
    }
    .view-c li span+span{
        border-left:1px solid #d2d2d2;
    }
</style>
