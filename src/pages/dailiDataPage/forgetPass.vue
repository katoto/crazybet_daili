<template>
    <div>
        <p>忘记密码，找回密码</p>
        <div>
        </div>
        <mt-button type="primary" @click="showAlert">primary</mt-button>
        <mt-button type="danger" @click="showTips">danger</mt-button>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui'
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                value1: '',
                value2: '',
            };
        },
        watch: {},
        methods: {
            showTips(){
                Indicator.open({
                    spinnerType: 'fading-circle'
                });
            },
            showAlert(){
                MessageBox('提示', '操作成功');
            },
        },
        computed: {},
        mounted(){

        }
    }
</script>
<style>
</style>
