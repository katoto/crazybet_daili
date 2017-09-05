<template>
    <div>
        <Header_all person-title="合伙人登陆" :icon-style="'regis'"></Header_all>
        <div class="form loginon">
            <h1>使用账号密码登录</h1>
            <div class="login-input login-phone">
                <span class="login-tips">账号</span>
                <span class="plaholder">手机号</span>
                <input type="tel" v-model="loginTel" name="phone" @blur="checkTel" @input="inpEvent">
            </div>
            <div class="login-input login-psw">
                <span class="login-tips">密码</span>
                <span class="plaholder">请输入登录密码</span>
                <input id="passDomLogin" v-model="loginPassWord" type="password" @blur="checkPassWord" @input="inpEvent" name="password">
                <a href="javascript:;" v-tap="{ methods:showCodeFn}" class="btn eye" :class="{ 'eye-on':showCode ,'eye-off':!showCode }"></a>
            </div>
            <input type="submit" name="submit" value="提交"  v-tap="{ methods:LoginFn }" >
            <a href="javascript:;" class="btn" v-tap="{ methods:getPassFn}" >忘记密码</a>
        </div>
    </div>
</template>

<script>
    import Header_all from '~components/header_all.vue'
    import { convertToQueryString} from '~common/util'
    export default {
        data () {
            return {
                showCode: false,
                loginTel: '',
                loginPassWord: ''
            }
        },
        watch: {
            loginAjaxData (loginAjaxData) {
                console.log(loginAjaxData);
                if (loginAjaxData) {
                    if (loginAjaxData.v_status === '0') {
                        /* 可以到后台 */
                        this.$store.commit('ck', loginAjaxData.token);
                        this.$router.push(`/myhome`);
                        setTimeout(() => {
                            this.$store.dispatch('getUserInfo')
                        }, 10)
                    } else {
                        /* 审核页面 */
                        console.log(convertToQueryString(loginAjaxData))
                        localStorage.setItem('regisMsg', convertToQueryString(loginAjaxData))
                        this.$router.push(`/registerMsg`)
                    }
                }
            }
        },
        computed: {
            loginAjaxData () {
                return this.$store.state.formObj.loginAjaxData
            }
        },
        methods: {
            getPassFn () {
                this.$router.push(`/forgetPass`)
            },
            LoginFn () {
                /* function  登陆拿ck */
                let loginData = null;
            /* 提交 */
                if (this.loginTel === '') {
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '请输入手机号'
                    });
                    return false
                } else if (this.loginPassWord === '') {
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '请输入密码'
                    });
                    return false
                }
                /* 提交数据 */
                loginData = Object.assign({}, { mobile: this.loginTel, passwd: this.loginPassWord });
                console.log(loginData);

                this.$store.dispatch('doLogin', loginData)
            },
            showCodeFn (e) {
                /* 显示隐藏密码 */
                if (this.showCode) {
                    document.getElementById('passDomLogin').setAttribute('type', 'password')
                } else {
                    document.getElementById('passDomLogin').setAttribute('type', 'text')
                }
                this.showCode = !(this.showCode)
            },
            inpEvent (e) {
                if (e.target.value != '') {
                    e.target.previousElementSibling.style.display = 'none'
                } else {
                    e.target.previousElementSibling.style.display = 'block'
                }
                if (e.target.name === 'phone') {
                    if (e.target.value.length > 11) {
                        this.loginTel = e.target.value.slice(0, 11)
                    }
                }
                if (e.target.name === 'password') {
                    if (e.target.value.length > 25) {
                        this.loginPassWord = e.target.value.slice(0, 25)
                    }
                }
            },
            checkPassWord (e) {
                let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                if (e.target.value != '') {
                    e.target.previousElementSibling.style.display = 'none';
                    if (!(pass_reg.test(e.target.value))) {
                        this.$store.dispatch('showToast', {
                            duration: 1000,
                            message: '请输入密码'
                        })
                    }
                } else {
                    e.target.previousElementSibling.style.display = 'block'
                }
            },
            checkTel (e) {
                let tel_reg = /^1[34578]\d{9}$/;
                if (e.target.value != '') {
                    e.target.previousElementSibling.style.display = 'none';
                    if (!(tel_reg.test(e.target.value))) {
                        this.$store.dispatch('showToast', {
                            duration: 1000,
                            message: '请输入正确的手机号'
                        })
                    }
                } else {
                    e.target.previousElementSibling.style.display = 'block'
                }
            }
        },
        components: {
            Header_all
        }
    }
</script>
<style scoped>
.wrapper{
    height:100%;
    overflow: hidden;
}
</style>
