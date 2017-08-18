<template>
    <div class="page-infinite">
        <Header_all person-title="提现记录" :icon-style="'myhome'"></Header_all>
        <div class="main-list">
            {{ homeApplyList }}
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
        </div>
    </div>
</template>

<script type="text/babel">
    import Header_all from '~components/header_all.vue'
    import Vue from 'vue'

    export default {
        data () {
            return {
                allLoaded: false
            }
        },
        methods: {

        },
        computed: {
            homeApplyList () {
                return this.$store.state.myHomeObj.homeApplyList
            }
        },
        components: {
            Header_all
        },
        mounted () {
        }
    }
</script>
