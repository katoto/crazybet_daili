<template>
    <div class="listBox" v-if="matchList_end">
        <template v-for="item in matchList_end" class="item" >
            <matchListTemplate  :matchData="item">
            </matchListTemplate>
        </template>
    </div>
    <div v-else>
        <img src="~static/images/loading.gif" alt="" style="margin: 0.9rem auto;display: block;width: 0.4rem;height: 0.4rem">
    </div>
</template>

<script>
import MatchListTemplate from '~components/matchlist-template.vue'
import {actionTypes} from '~store/home'
export default {
    data () {
        return {
            time: ''
        }
    },
    components: {
        MatchListTemplate
    },
    watch: {
        'hasLogin':()=>{
            setTimeout(()=>{
                this.$store.dispatch(actionTypes.getFootballMatchList_end);
            },20)
        },
    },
    methods: {
    },
    computed: {
        matchList_end () {
            return this.$store.state.home.matchList_end
        },
        hasLogin () {
            return !!this.$store.state.ck
        }
    },
    mounted () {
//            end 换成
        this.$store.dispatch(actionTypes.getFootballMatchList_end)
        this.$store.dispatch(actionTypes.setIntervalFn, { type: 'end', time: 20000 })
    },
    filters: {
        matchTimeFormat (time, baseTime, format = 'MM月dd日 HH:mm') {
            baseTime = baseTime || new Date(new Date().toLocaleDateString()).getTime()
            let t = new Date(+time)
            let tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            let leftTime = function (ms) {
                let hour = 0
                let minute = 0
                ms = +ms
                let allHour = Math.floor(ms / 1000 / 60 / 60)
                if (allHour > 0) {
                    hour = allHour
                    minute = Math.floor(ms / 1000 / 60) - hour * 60
                    return tf(hour) + ':' + tf(minute)
                }
                minute = Math.floor(ms / 1000 / 60)
                return tf(hour) + ':' + tf(minute)
            }
            switch (Math.ceil((t.getTime() - baseTime) / 86400000)) {
            case 1: return '今天' + leftTime(t.getTime() - baseTime)
            case 2: return '明天' + leftTime(t.getTime() - baseTime)
            case 3: return '后天' + leftTime(t.getTime() - baseTime)
            }

            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear())
                case 'MM':
                    return tf(t.getMonth() + 1)
                case 'mm':
                    return tf(t.getMinutes())
                case 'dd':
                    return tf(t.getDate())
                case 'HH':
                    return tf(t.getHours())
                case 'ss':
                    return tf(t.getSeconds())
                }
            })
        }
    }
}
</script>
<style>
</style>
