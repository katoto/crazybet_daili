<template>
    <div>
        <div class="toast" v-show="toastMsg">{{ toastMsg }}</div>
        <router-view v-if="ready||1"></router-view>
    </div>
</template>
<script>
//    import '~static/css/bet.css'
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
    @charset "utf-8";



    /* CSS Document */
    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td img{
        margin: 0;
        padding: 0;
        border: 0;
    }
    * {
        font-family:"Microsoft YaHei", "微软雅黑", '\65B0\5B8B\4F53', '\5B8B\4F53', Verdana;
    }
    fieldset, img {
        border: 0;
    }
    abbr, acronym {
        border: 0;
        font-variant: normal;
    }
    a {
        color:#fff;
    }
    body {
        line-height: 1.5;
        font-size: 14px;
    }
    ol, ul {
        list-style: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    caption, th {
        text-align: left;
    }
    sup, sub {
        font-size: 100%;
        vertical-align: baseline;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after, q:before, q:after {
        content: '';
        content: none;
    }
    :link, :visited {
        text-decoration: none;
    }
    :focus {
        outline: 0;
    }
    body {
        width: 100%;
        height: 100%;
        margin:0 auto;
    }
    /*清除浮动*/
    .clearfix:after {content:""; display:block; clear:both;}
    .clearfix {zoom:1;}
    .opacity30 {
        filter:alpha(opacity=30);
        -moz-opacity:0.3;
        -khtml-opacity:0.3;
        opacity: 0.3;
    }

</style>
