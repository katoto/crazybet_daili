<template>
    <div class="listBox">
        <div v-if="matchlist_play && parseInt(matchlist_play.length)>0">
            <template  v-for="item in matchlist_play">
                <matchListTemplate  :matchData="item">
                </matchListTemplate>
            </template>
        </div>
    </div>
</template>

<script>
    import MatchListTemplate from '~components/matchlist-template.vue'
    import {actionTypes} from '~store/home'
    export default {
        data () {
            return {
                title: ''
            }
        },
        components: {
            MatchListTemplate
        },
        watch: {
            socketData (data) {
                Object.assign(data, {'matchStyle': 'run'})
                this.$store.dispatch(actionTypes.sockDataFn, data)
            },
            matchIDStr (matchIDStr, oldMatchIdStr) {
                oldMatchIdStr && this.$store.dispatch('unsubscribe', {
                    ptype: 'list',
                    body: oldMatchIdStr
                })
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: matchIDStr
                })
            }
        },
        methods: {

        },
        computed: {
            socketData () {
                return this.$store.state.socket.data
            },
            matchlist_play () {
                return this.$store.state.home.matchList_play
            },
            matchlist_hot () {
                return this.$store.state.home.matchList_hot
            },
            matchIDStr () {
                let matchIDStr = ''
                if (this.matchlist_play) {
                    for (let i = 0, len = this.matchlist_play.length; i < len; i++) {
                        matchIDStr += this.matchlist_play[i].MatchID + '|'
                    }
                }
                return matchIDStr
            }
        },
        mounted () {
            if (this.matchIDStr) {
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: this.matchIDStr
                })
            }
            this.$store.dispatch(actionTypes.getFootballMatchList, 'run')
        },
        beforeDestroy () {
//            取消订阅
//            this.$store.dispatch('unsubscribe', {
//                ptype: 'list',
//                body: this.matchIDStr
//            })

        }
    }
</script>
<style>
</style>
