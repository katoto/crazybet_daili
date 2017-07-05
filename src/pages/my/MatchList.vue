<template>
    <div class="wraper"  >
        <button @click="goAllList">点击跳转list</button>
        <ul id="MatchListDom" style="border:1px solid black;">
            <li class="item" v-for="item in items" :style="objectStyle">
                {{item.name}}
                <span>name {{item.age}} </span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                items: [
                    {
                        userName: 'qwer',
                        age: '123'
                    },
                    {
                        userName: 'rrrr',
                        age: 'fsafsad'
                    },
                    {
                        userName: 'qwer',
                        age: '123'
                    },
                    {
                        userName: 'rrrr',
                        age: 'fsafsad'
                    },
                    {
                        userName: 'qwer',
                        age: '123'
                    },
                    {
                        userName: 'rrrr',
                        age: 'fsafsad'
                    }
                ],
                pgSize: 36,
                rawItems: [],
                pgNo: 1,
                objectStyle: {
                    border: '1px solid red'
                }
            }
        },
        mounted () {
            window.addEventListener('scroll', this.onScroll)
        },
        methods: {
            goAllList () {
                this.$router.replace(`/h5/matchList/allList/`)// 跳转页面
            },
            onScroll (event) {
                var offsetHeight = document.getElementById('MatchListDom').offsetHeight,
                    scrollHeight = event.target.scrollingElement.scrollHeight,
                    scrollTop = event.target.scrollingElement.scrollTop,
                    scrollBottom = offsetHeight + scrollTop + 10
//                scrollTop + offsetHeight >= scrollHeight
                if (scrollTop === 0) {
                    if (this.pgNo === 1) {
                        return
                    }
                }
                if (scrollBottom >= scrollHeight) {
                    console.log('到底在 可以去请求数据了')
                    this.throttle(this.changePgItems)
                }
            },
            throttle (method, context) {
//               函数节流
                clearTimeout(method.tId)
                method.tId = setTimeout(() => { method() }, 100)
            },
            changePgItems () {
//                这里应该是一个请求
                console.log('123213')
            }
        }
    }
</script>

<style>

</style>
