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
        font-size: 14px;
        line-height: 1.25em;
    }
    html {
        height: 100%;
    }

    body {
        min-width: 750px;
        font-size: 14px;
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

input[type="text"], input[type="number"], input[type="password"] {
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
    text-indent:-99999px;
}
.hide {
    display: none
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
    line-height:100px;
}
.back{
    position: absolute;
    left:20px;
    top:25px;
    width:31px;
    height:51px;
    background-image: url("~static/images/icon-sp.png");
    background-size: 178px 51px;
    background-position: 0 0;
}
.login{
    position: absolute;
    right:35px;
    top:0;
    font-size:30px;
    color: #fff;
}
.top h1{
    text-align: center;
    font-size:36px;
    color: #fff;
    font-weight:normal;
}
/*头部结束*/
.form{
    padding:0 40px;
}
.form .prompt{

}
.form h2{
    font-size:36px;
    color: #020202;
    font-weight:normal;
    line-height:48px;
}
.unable{
    color: #c0bfc4 !important;
    border-color: #c0bfc4 !important;
}
.use-msg{
    margin-top:30px;
}
.rebate-msg{
    margin-top:54px;
}
.reg-input{
    position: relative;
    width:100%;
    height:78px;
    overflow: hidden;
    line-height:75px;
    border-bottom:1px solid #ededed;
}
.prompt{
    float: left;
    color: #f64176;
    font-size:28px;
}
.tips{
    float: left;
    margin-left:15px;
    line-height:78px;
    font-size:28px;
    color: #c0bfc4;
}
.reg-input input[type="text"]{
    position: absolute;
    z-index:1;
    left:0;
    top:0;
    width:100%;
    height:100%;
    line-height:78px;
    font-size:28px;
    color: #000;
    outline:none;
    border:none;
    background: transparent;
    text-indent:30px;
}
.seng-code{
    position: absolute;
    z-index:2;
    right:8px;
    top:6px;
    width:252px;
    height:66px;
    overflow: hidden;
    border:1px solid #6569c6;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    font-size:28px;
    color: #6569c6;
    line-height:66px;
}
.eye{
    position: absolute;
    z-index:2;
    top:22px;
    right:30px;
    width:61px;
    height:35px;
    overflow: hidden;
    background-image: url("~static/images/icon-sp.png");
    background-size: 178px 51px;
    background-repeat: no-repeat;
}
.eye-on{
    background-position:-65px 0;
}
.eye-off{
    background-position: -116px 0;
}
.protocol{
    margin: 24px 0 66px 0;
    line-height:24px;
    font-size:24px;
    color: #808080;
}
.protocol input{
    width:23px;
    height:23px;
    overflow: hidden;
    background: #f0f0f0;
    border:1px solid #ddd;
}
.protocol a{
    color: #6569c6;
}
.reg-form input[type="submit"]{
    display: block;
    width:100%;
    line-height:78px;
    text-align: center;
    background: #6569c6;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    font-size:36px;
    color: #fff;
    border:none;
    outline:none;
}
.check-time{
    text-align: center;
    font-size:28px;
    color: #808080;
    line-height:60px;
}
.contact-us{
    position: absolute;
    left:0;
    bottom:50px;
    width:100%;
    text-align: center;
    font-size:24px;
    color: #808080;
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
    input[type="text"], input[type="number"], input[type="password"] {
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
        text-indent:-99999px;
    }
    .hide {
        display: none
    }
    .toast {
        line-height: 44px;
        width: 580px;
        padding: 30px 40px;
        background: rgba(0, 0, 0, .9);
        color: #fff;
        font-size: 32px;
        border-radius: 8px;
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
        line-height:100px;
    }
    .back{
        position: absolute;
        left:20px;
        top:25px;
        width:31px;
        height:51px;
        background: url("../images/back.png") no-repeat center;
        background-size: cover;
    }
    .login{
        position: absolute;
        right:35px;
        top:0;
        font-size:30px;
        color: #fff;
    }
    .top h1{
        text-align: center;
        font-size:36px;
        color: #fff;
        font-weight:normal;
    }
    /*头部结束*/
    .form{
        padding:0 40px;
    }
    .form .prompt{

    }
    .form h2{
        font-size:36px;
        color: #020202;
        font-weight:normal;
        line-height:48px;
    }
    .unable{
        color: #c0bfc4 !important;
        border-color: #c0bfc4 !important;
    }
    .use-msg{
        margin-top:30px;
    }
    .rebate-msg{
        margin-top:54px;
    }
    .reg-input{
        position: relative;
        width:100%;
        height:78px;
        overflow: hidden;
        line-height:75px;
        border-bottom:1px solid #ededed;
    }
    .prompt{
        float: left;
        color: #f64176;
        font-size:28px;
    }
    .tips{
        float: left;
        margin-left:15px;
        line-height:78px;
        font-size:28px;
        color: #c0bfc4;
    }
    .reg-input input{
        position: absolute;
        z-index:1;
        left:0;
        top:0;
        width:100%;
        height:100%;
        line-height:78px;
        font-size:28px;
        color: #000;
        outline:none;
        border:none;
        background: transparent;
        text-indent:30px;
    }
    .seng-code{
        position: absolute;
        z-index:2;
        right:8px;
        top:6px;
        width:252px;
        height:66px;
        overflow: hidden;
        border:1px solid #6569c6;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        font-size:28px;
        color: #6569c6;
        line-height:66px;
    }
    .eye{
        position: absolute;
        z-index:2;
        top:22px;
        right:30px;
        width:61px;
        height:35px;
        overflow: hidden;
        background-size: cover;
    }
    .eye-on{
        background: url("../images/eye-on.png") no-repeat center;
    }
    .eye-off{
        background: url("../images/eye-off.png") no-repeat center;
    }
    .protocol{
        margin: 24px 0 66px 0;
        line-height:24px;
        font-size:24px;
        color: #808080;
    }
    .protocol input{
        width:23px;
        height:23px;
        overflow: hidden;
        background: #f0f0f0;
        border:1px solid #ddd;
    }
    .protocol a{
        color: #6569c6;
    }
    .reg-form input[type="submit"]{
        display: block;
        width:100%;
        line-height:78px;
        text-align: center;
        background: #6569c6;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        font-size:36px;
        color: #fff;
        border:none;
        outline:none;
    }
    .check-time{
        text-align: center;
        font-size:28px;
        color: #808080;
        line-height:60px;
    }
    .contact-us{
        position: absolute;
        left:0;
        bottom:50px;
        width:100%;
        text-align: center;
        font-size:24px;
        color: #808080;
    }
</style>
