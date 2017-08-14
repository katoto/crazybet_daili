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
    import {actionTypes, mutationTypes} from '~store/home'

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
<!--<style>-->
    /*body,*/
    /*p,*/
    /*h1,*/
    /*h2,*/
    /*h3,*/
    /*h4,*/
    /*h5,*/
    /*h6,*/
    /*ul,*/
    /*ol,*/
    /*li,*/
    /*dl,*/
    /*dt,*/
    /*dd,*/
    /*table,*/
    /*th,*/
    /*td,*/
    /*form,*/
    /*fieldset,*/
    /*legend,*/
    /*input,*/
    /*textarea,*/
    /*button,*/
    /*select {*/
        /*margin: 0;*/
        /*padding: 0;*/
    /*}*/

    /*body,*/
    /*input,*/
    /*textarea,*/
    /*select,*/
    /*button,*/
    /*table {*/
        /*font-size: 14px;*/
        /*line-height: 1.25em;*/
    /*}*/

    /*html {*/
        /*height: 100%;*/
    /*}*/

    /*body {*/
        /*min-width: 750px;*/
        /*font-size: 14px;*/
        /*font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;*/
        /*color: #333;*/
        /*-webkit-text-size-adjust: none;*/
        /*-webkit-user-select: none;*/
        /*-webkit-tap-highlight-color: transparent;*/
        /*height: 100%;*/
    /*}*/

    /*table {*/
        /*border-collapse: collapse;*/
        /*border-spacing: 0*/
    /*}*/

    /*fieldset,*/
    /*img,*/
    /*button {*/
        /*border: 0;*/
    /*}*/

    /*li {*/
        /*list-style: none*/
    /*}*/

    /*a {*/
        /*text-decoration: none;*/
        /*color: #333;*/
        /*outline: none*/
    /*}*/

    /*img {*/
        /*vertical-align: middle*/
    /*}*/

    /*h1,*/
    /*h2,*/
    /*h3,*/
    /*h4,*/
    /*h5,*/
    /*h6,*/
    /*input,*/
    /*textarea,*/
    /*select,*/
    /*button {*/
        /*font-size: 100%*/
    /*}*/

    /*::-webkit-input-placeholder {*/
        /*color: #bbb;*/
    /*}*/

    /*input[type="text"], input[type="number"], input[type="password"] {*/
        /*-webkit-appearance: none;*/
        /*border-radius: 0;*/
    /*}*/

    /*em,*/
    /*i {*/
        /*font-style: normal*/
    /*}*/
    /*.btn{*/
        /*display: block;*/
        /*text-align: center;*/
    /*}*/
    /*.font0{*/
        /*font-size:0;*/
        /*text-indent:-99999px;*/
    /*}*/
    /*.hide {*/
        /*display: none*/
    /*}*/
    /*.toast {*/
        /*line-height: 44px;*/
        /*width: 580px;*/
        /*padding: 30px 40px;*/
        /*background: rgba(0, 0, 0, .9);*/
        /*color: #fff;*/
        /*font-size: 32px;*/
        /*border-radius: 8px;*/
        /*position: fixed;*/
        /*left: 50%;*/
        /*top: 40%;*/
        /*z-index: 99;*/
        /*transform: translate(-50%, -50%);*/
        /*text-align: center;*/
    /*}*/
    /*.wrapper {*/
        /*position: relative;*/
        /*width:100%;*/
        /*height:100%;*/
        /*overflow: hidden;*/
    /*}*/
    /*!*头部开始*!*/
    /*.top{*/
        /*position: relative;*/
        /*background: #333;*/
        /*line-height:100px;*/
    /*}*/
    /*.back{*/
        /*position: absolute;*/
        /*left:20px;*/
        /*top:25px;*/
        /*width:31px;*/
        /*height:51px;*/
        /*background: url("../images/back.png") no-repeat center;*/
    /*}*/
    /*.login{*/
        /*position: absolute;*/
        /*right:35px;*/
        /*top:0;*/
        /*font-size:30px;*/
        /*color: #fff;*/
    /*}*/
    /*.top h1{*/
        /*text-align: center;*/
        /*font-size:36px;*/
        /*color: #fff;*/
        /*font-weight:normal;*/
    /*}*/
    /*!*头部结束*!*/
    /*.form{*/
        /*padding:0 40px;*/
    /*}*/
    /*.form .prompt{*/

    /*}*/
    /*.form h2{*/
        /*font-size:36px;*/
        /*color: #020202;*/
        /*font-weight:normal;*/
        /*line-height:48px;*/
    /*}*/
    /*.unable{*/
        /*color: #c0bfc4 !important;*/
        /*border-color: #c0bfc4 !important;*/
    /*}*/
    /*.use-msg{*/
        /*margin-top:30px;*/
    /*}*/
    /*.rebate-msg{*/
        /*margin-top:54px;*/
    /*}*/
    /*.reg-input,.login-input{*/
        /*position: relative;*/
        /*width:100%;*/
        /*height:78px;*/
        /*overflow: hidden;*/
        /*line-height:78px;*/
        /*border-bottom:1px solid #ededed;*/
    /*}*/
    /*.prompt{*/
        /*float: left;*/
        /*color: #f64176;*/
        /*font-size:28px;*/
    /*}*/
    /*.reg-tips{*/
        /*float: left;*/
        /*margin-left:15px;*/
        /*line-height:78px;*/
        /*font-size:28px;*/
        /*color: #c0bfc4;*/
    /*}*/
    /*.reg-input input{*/
        /*position: absolute;*/
        /*z-index:1;*/
        /*left:0;*/
        /*top:0;*/
        /*width:100%;*/
        /*height:100%;*/
        /*line-height:78px;*/
        /*font-size:28px;*/
        /*color: #000;*/
        /*outline:none;*/
        /*border:none;*/
        /*background: transparent;*/
        /*text-indent:30px;*/
    /*}*/
    /*.seng-code{*/
        /*position: absolute;*/
        /*z-index:2;*/
        /*right:8px;*/
        /*top:6px;*/
        /*width:252px;*/
        /*height:66px;*/
        /*overflow: hidden;*/
        /*border:1px solid #6569c6;*/
        /*-webkit-border-radius: 6px;*/
        /*-moz-border-radius: 6px;*/
        /*border-radius: 6px;*/
        /*font-size:28px;*/
        /*color: #6569c6;*/
        /*line-height:66px;*/
    /*}*/
    /*.forget-psw .seng-code{*/
        /*top:17px;*/
    /*}*/
    /*.eye{*/
        /*position: absolute;*/
        /*z-index:2;*/
        /*top:22px;*/
        /*right:30px;*/
        /*width:61px;*/
        /*height:35px;*/
        /*overflow: hidden;*/
    /*}*/
    /*.eye-on{*/
        /*background: url("../images/eye-on.png") no-repeat center;*/
        /*background-size: cover;*/
    /*}*/
    /*.eye-off{*/
    /*background: url("../images/eye-off.png") no-repeat center;*/
        /*background-size: cover;*/
    /*}*/
    /*.forget-psw .eye{*/
        /*top:32.5px;*/
    /*}*/
    /*.protocol{*/
        /*margin: 24px 0 66px 0;*/
        /*line-height:24px;*/
        /*font-size:24px;*/
        /*color: #808080;*/
    /*}*/
    /*.protocol2{*/
        /*font-size:24px;*/
        /*color: #6569c6;*/
        /*text-align: center;*/
        /*line-height:77px;*/
        /*margin-top:316px;*/
    /*}*/
    /*.protocol input[type="checkbox"]{*/
        /*display: block;*/
        /*float: left;*/
        /*width:23px;*/
        /*height:23px;*/
        /*overflow: hidden;*/
        /*background: #f0f0f0;*/
        /*border:1px solid #ddd;*/
    /*}*/
    /*.protocol a{*/
        /*color: #6569c6;*/
    /*}*/
    /*.reg-form>input,.check-refuse,.check-ing,.check-agree,.loginon>input,.forget-next,.forget-sure{*/
        /*display: block;*/
        /*width:100%;*/
        /*line-height:78px;*/
        /*text-align: center;*/
        /*-webkit-border-radius: 6px;*/
        /*-moz-border-radius: 6px;*/
        /*border-radius: 6px;*/
        /*font-size:36px;*/
        /*color: #fff;*/
        /*border:none;*/
        /*outline:none;*/
    /*}*/
    /*.reg-form>input,.check-agree,.loginon>input,.forget-next,.forget-sure{*/
        /*background: #6569c6;*/
    /*}*/
    /*.forget-next,.forget-sure{*/
        /*width:670px;*/
        /*margin:70px auto 0;*/
    /*}*/
    /*.check-refuse{*/
        /*background: #c0bfc4;*/
    /*}*/
    /*.check-ing{*/
        /*background: #a5a6d4;*/
    /*}*/
    /*.check-time{*/
        /*text-align: center;*/
        /*font-size:28px;*/
        /*color: #808080;*/
        /*line-height:60px;*/
    /*}*/
    /*.loginon>input{*/
         /*margin-top:80px;*/
     /*}*/
    /*.contact-us{*/
        /*position: absolute;*/
        /*left:0;*/
        /*bottom:50px;*/
        /*width:100%;*/
        /*text-align: center;*/
        /*font-size:24px;*/
        /*color: #808080;*/
    /*}*/
    /*!*注册信息*!*/
    /*.regMsg-form{*/
        /*color: #020202;*/
    /*}*/
    /*.reg-msg{*/
        /*line-height:58px;*/
        /*overflow: hidden;*/
        /*font-size:28px;*/
    /*}*/
    /*.reg-msg span{*/
        /*display: block;*/
        /*max-width:30%;*/
        /*float: left;*/
        /*color: #c0bfc4;*/
    /*}*/
    /*.reg-msg p{*/
        /*float: left;*/
        /*max-width:70%;*/
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
    /*}*/
    /*.user-phone{*/
        /*margin:40px 0 38px 0;*/
    /*}*/
    /*.com-msg{*/
        /*line-height:64px;*/
        /*font-size:36px;*/
    /*}*/
    /*.user-line{*/
        /*height:1px;*/
        /*background: #ececec;*/
        /*margin: 15px 0 10px 0;*/
    /*}*/
    /*!*登录*!*/
    /*.loginon h1{*/
        /*font-size:48px;*/
        /*color: #020202;*/
        /*text-align: center;*/
        /*margin: 92px 0 75px 0;*/
    /*}*/
    /*.login-tips{*/
        /*display: block;*/
        /*float: left;*/
        /*width:146px;*/
        /*font-size:28px;*/
        /*color: #020202;*/
    /*}*/
    /*.plaholder{*/
        /*font-size:28px;*/
        /*color: #c0bfc4;*/
    /*}*/
    /*.login-input input{*/
        /*position: absolute;*/
        /*width:524px;*/
        /*height:78px;*/
        /*overflow: hidden;*/
        /*top:0;*/
        /*left:146px;*/
        /*line-height:75px;*/
        /*outline:none;*/
        /*border:none;*/
        /*font-size:28px;*/
        /*color: #020202;*/
        /*background: transparent;*/
    /*}*/
    /*.loginon a{*/
        /*line-height:100px;*/
        /*font-size:28px;*/
        /*color: #808080;*/
    /*}*/
    /*!*忘记密码*!*/
    /*.forget-psw{*/
        /*background: #f2f2f2;*/
        /*padding-top:37px;*/
    /*}*/
    /*.forget-one,.forget-two{*/
        /*width:100%;*/
        /*background: #fff;*/
    /*}*/
    /*.forget-input{*/
        /*position: relative;*/
        /*margin:0 63px;*/
        /*line-height:94px;*/
        /*overflow: hidden;*/
    /*}*/
    /*.forget-input+.forget-input{*/
        /*border-top:1px solid #e2e2e2;*/
    /*}*/
    /*.forget-tips{*/
        /*display: block;*/
        /*float: left;*/
        /*overflow: hidden;*/
        /*background-size: cover;*/
        /*margin:27.5px 23px 0 0;*/
    /*}*/
    /*.forget-phone .forget-tips{*/
        /*width:28px;*/
        /*height:39px;*/
        /*background: url("../images/phone.png") no-repeat center;*/
    /*}*/
    /*.forger-code .forget-tips{*/
        /*width:30px;*/
        /*height:45px;*/
        /*background: url("../images/lock.png") no-repeat center;*/
    /*}*/
    /*.forget-password .forget-tips{*/
        /*margin:27.5px 23px 0 0;*/
        /*width:30px;*/
        /*height:47px;*/
        /*background: url("../images/unlock.png") no-repeat center;*/
    /*}*/
    /*.forget-placehold{*/
        /*font-size:28px;*/
        /*color: #c0bfc4;*/
    /*}*/
    /*.forget-input input{*/
        /*position: absolute;*/
        /*top:0;*/
        /*left:51px;*/
        /*width:570px;*/
        /*height:100%;*/
        /*outline:none;*/
        /*border:none;*/
        /*background: transparent;*/
        /*font-size:28px;*/
        /*color: #020202;*/
    /*}*/
<!--</style>-->
<style>
    body, p, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd, table, th, td, form, fieldset, legend, input, textarea, button, select {
        margin: 0;
        padding: 0;
    }
    body, input, textarea, select, button, table {
        font-size: 0.14rem;
        line-height: 1.25em;
    }
    html {
        height: 100%;
    }
    body {
        min-width: 7.5rem;
        font-size: 0.14rem;
        font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        color: #333;
        -webkit-text-size-adjust: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        height: 100%;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    fieldset, img, button {
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
    h1, h2, h3, h4, h5, h6, input, textarea, select, button {
        font-size: 100%
    }
    ::-webkit-input-placeholder {
        color: #bbb;
    }
    input[type="text"], input[type="number"], input[type="password"] {
        -webkit-appearance: none;
        border-radius: 0;
    }
    em, i {
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
        height:100%;
        overflow: hidden;
    }
    /*头部开始*/
    .top{
        position: relative;
        background: #333;
        line-height:1rem;
    }
    .back{
        position: absolute;
        left:0.2rem;
        top:0.25rem;
        width:0.31rem;
        height:0.51rem;
        background: url("../images/back.png") no-repeat center;
    }
    .login{
        position: absolute;
        right:0.35rem;
        top:0;
        font-size:0.3rem;
        color: #fff;
    }
    .top h1{
        text-align: center;
        font-size:0.36rem;
        color: #fff;
        font-weight:normal;
    }
    /*头部结束*/
    .form{
        padding:0 0.4rem;
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
        margin-top:0.3rem;
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
        border-bottom:0.01rem solid #ededed;
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
        top:0.06rem;
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
        top:0.17rem;
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
        top:32.0.05rem;
    }
    .protocol{
        margin: 0.24rem 0 0.66rem 0;
        line-height:0.24rem;
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
        width:0.23rem;
        height:0.23rem;
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
        position: absolute;
        left:0;
        bottom:0.5rem;
        width:100%;
        text-align: center;
        font-size:0.24rem;
        color: #808080;
    }
    /*注册信息*/
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
        margin:0.4rem 0 0.38rem 0;
    }
    .com-msg{
        line-height:0.64rem;
        font-size:0.36rem;
    }
    .user-line{
        height:0.01rem;
        background: #ececec;
        margin: 0.15rem 0 0.1rem 0;
    }
    /*登录*/
    .loginon h1{
        font-size:0.48rem;
        color: #020202;
        text-align: center;
        margin: 0.92rem 0 0.75rem 0;
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
    /*忘记密码*/
    .forget-psw{
        background: #f2f2f2;
        padding-top:0.37rem;
    }
    .forget-one,.forget-two{
        width:100%;
        background: #fff;
    }
    .forget-input{
        position: relative;
        margin:0 0.63rem;
        line-height:0.94rem;
        overflow: hidden;
    }
    .forget-input+.forget-input{
        border-top:0.01rem solid #e2e2e2;
    }
    .forget-tips{
        display: block;
        float: left;
        overflow: hidden;
        background-size: cover;
        margin:27.0.05rem 0.23rem 0 0;
    }
    .forget-phone .forget-tips{
        width:0.28rem;
        height:0.39rem;
        background: url("../images/phone.png") no-repeat center;
    }
    .forger-code .forget-tips{
        width:0.3rem;
        height:0.45rem;
        background: url("../images/lock.png") no-repeat center;
    }
    .forget-password .forget-tips{
        margin:27.0.05rem 0.23rem 0 0;
        width:0.3rem;
        height:0.47rem;
        background: url("../images/unlock.png") no-repeat center;
    }
    .forget-placehold{
        font-size:0.28rem;
        color: #c0bfc4;
    }
    .forget-input input{
        position: absolute;
        top:0;
        left:0.51rem;
        width:5.7rem;
        height:100%;
        outline:none;
        border:none;
        background: transparent;
        font-size:0.28rem;
        color: #020202;
    }
</style>
