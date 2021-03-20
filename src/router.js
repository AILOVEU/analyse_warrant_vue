import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
    mode: "hash",
    routes: [
        {
            path: '/',
            name: 'index ',
            component: () => import('./nav.vue'),
            meta:{
                title: '首页'
            }
        },
        {
            path: '/selector',
            name: 'selector ',
            component: () => import('./views/selector/index.vue'),
            meta:{
                title: '窝轮筛选器'
            }
        },
        {
            path: '/decisionor',
            name: 'decisionor ',
            component: () => import('./views/decisionor/index.vue'),
            meta:{
                title: '决策器'
            }
        },
        {
            path: '/ajust',
            name: 'ajust ',
            component: () => import('./views/ajust/index.vue'),
            meta:{
                title: '调整计算器'
            }
        },
        {
            path: '/dev',
            name: 'dev',
            component: ()=> import('./views/volRemind/index.vue'),
            meta: {
                title: '开发中页面'
            }
        }
    ]
})

router.beforeEach((to,from,next)=> {
    if(to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})
export default router;
