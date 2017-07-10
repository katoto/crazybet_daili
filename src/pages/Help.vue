<template>
    <div id="app" class="popFull help">
        <p> 登陆组 </p>
        <div>
            <h1>aaaaa</h1>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                title: '',
                helpSel: {
                    helpSel_1: true,
                    helpSel_2: false,
                    helpSel_3: false,
                    helpSel_4: false,
                    helpSel_5: false,
                    helpSel_6: false,
                    helpSel_7: false
                }
            }
        },
        watch: {},
        methods: {
            helpItem ({helpSel}) {
//                切换帮助里头的选项
                switch (helpSel) {
                case 'helpSel_1':
                    this.helpSel.helpSel_1 = !this.helpSel.helpSel_1
                    break
                case 'helpSel_2':
                    this.helpSel.helpSel_2 = !this.helpSel.helpSel_2
                    break
                case 'helpSel_3':
                    this.helpSel.helpSel_3 = !this.helpSel.helpSel_3
                    break
                case 'helpSel_4':
                    this.helpSel.helpSel_4 = !this.helpSel.helpSel_4
                    break
                case 'helpSel_5':
                    this.helpSel.helpSel_5 = !this.helpSel.helpSel_5
                    break
                case 'helpSel_6':
                    this.helpSel.helpSel_6 = !this.helpSel.helpSel_6
                    break
                case 'helpSel_7':
                    this.helpSel.helpSel_7 = !this.helpSel.helpSel_7
                    break
                case 'backHistory':
                    window.history.back()
                    break
                }
            }
        },
        computed: {},
        mounted () {
        }
    }
</script>
<style>
    /*750  30px   */
    p{
        /* 750px */
        font-size: 0.2rem;
    }
    h1{
        font-size: 0.3rem;
    }
</style>
