/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const My = () => import('~pages/my/My.vue'  /* webpackChunkName: "chunks/my" */)
// const BetList = () => import('~pages/my/BetList'  /* webpackChunkName: "chunks/betlist" */)
const Luckdraw = () => import('~pages/my/Luckdraw'  /* webpackChunkName: "chunks/luckdraw" */)
// const Charge = () => import('~pages/my/Charge'  /* webpackChunkName: "chunks/charge" */)
// const Message = () => import('~pages/my/Message'  /* webpackChunkName: "chunks/message" */)

// home
const homeContent = () => import('~pages/home/homeContent' /* webpackChunkName: "chunks/home_content" */)
const crazymain = () => import('~pages/home/crazymain' /* webpackChunkName: "chunks/home_crazymain" */)
const MatchList = () => import('~pages/home/MatchList' /* webpackChunkName: "chunks/home_matchlist" */)
const matchListHot = () => import('~pages/home/matchList_hot' /* webpackChunkName: "chunks/home_matchlist_hot" */)
const matchListPlay = () => import('~pages/home/matchList_play' /* webpackChunkName: "chunks/home_matchlist_pay" */)
const matchListNoEnd = () => import('~pages/home/matchList_noEnd' /* webpackChunkName: "chunks/home_matchilist_noend" */)
const matchListEnd = () => import('~pages/home/matchList_end' /* webpackChunkName: "chunks/home_matchlist_end" */)

// main
const Main = () => import('~pages/main/Main' /* webpackChunkName: "chunks/main" */)

const Help = () => import('~pages/Help' /* webpackChunkName: "chunks/main" */)

// mode 代表浏览器环境   路由是按顺序匹配的
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/my',
            component: My,
            requiresAuth: true,
            children: [
                // {
                //     path: 'betlist/:others?',
                //     component: BetList
                // },
                {
                    path: 'luckdraw/:others?',
                    component: Luckdraw
                },
                // {
                //     path: 'charge/:others?',
                //     component: Charge
                // },
                // {
                //     path: 'msg/:others?',
                //     component: Message
                // }
            ]
        },
        {
            path: '/h5',
            component: homeContent,
            requiresAuth: true,
            children: [
                {
                    path: 'home',
                    component: crazymain,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'hot/:others?',
                            component: matchListHot
                        },
                        {
                            path: 'play/:others?',
                            component: matchListPlay
                        }
                    ]
                },
                {
                    path: 'matchList',
                    component: MatchList,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'end/:others?',
                            component: matchListEnd
                        },
                        {
                            path: 'noEnd/:others?',
                            component: matchListNoEnd
                        }
                    ]
                },

                {
                    path: '*',
                    redirect: '/h5/home/hot'
                }

            ]
        },
        {
            path: '/main/:matchid',
            component: Main
        },
        {
            path: '/help',
            component: Help
        },
        {
            path: '*',
            redirect: '/h5/home/hot'
        }
    ]
})

// 注意暴露出来
export default router
