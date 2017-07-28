<template>
    <div class="page-infinite">
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
