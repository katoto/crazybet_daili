<template>
    <!--<div class="page-infinite">
        <h1 class="page-title">Infinite Scroll</h1>
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="item in list" class="page-infinite-listitem">{{ item }}</li>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
            </p>
        </div>
    </div>-->
    <div class="page-infinite">
        <div class="top">
            <a href="javascript:;" class="btn font0 back">返回</a>
            <a href="#" class="btn home">主页</a>
            <h1>提现记录</h1>
        </div>
        <div class="main-list">
            <ul>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">200000002222222202000000000元</span>
                    <span class="list-status">提现成功</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
                <li>
                    <span class="list-date">2017-06-28</span>
                    <span class="list-money">2000000000元</span>
                    <span class="list-status">提现处理中</span>
                </li>
            </ul>
            <a href="javascript:;" class="btn more more-no">查看更多</a>
        </div>
    </div>
</template>

<script type="text/babel">
    import Vue from 'vue'
    import { InfiniteScroll } from 'mint-ui';
    Vue.use(InfiniteScroll);

    export default {
        data() {
            return {
                list: [],
                loading: false,
                allLoaded: false,
                wrapperHeight: 0
            };
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 500);
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            for (let i = 1; i <= 20; i++) {
                this.list.push(i);
            }
        }
    };
</script>
