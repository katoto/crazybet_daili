<template>
    <div class="pop pop_jiajiang">
        <div class="pop_layer"></div>
        <div class="popIn">
            <div class="box">
                <img :src="setAwardImg" @error="imgOnErrorLogo">
            </div>
            <span class="close" v-tap="{ methods:showAwardBoxFn}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
            showAwardBoxFn () {
                this.$store.commit('showAwardbox', false)
            },
            imgOnErrorLogo (that) {
                that.target.setAttribute('src', 'https://crazybet.choopaoo.com/img/esun/upload/8c/70/8c705f765b1611e7b209.jpg')
            }
        },
        computed: {
            setAwardImg () {
                return this.$store.state.awardAllData.setAwardImg
            }
        },
        mounted () {
        }
    }
</script>
<style>
</style>
