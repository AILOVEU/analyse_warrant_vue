import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
    mode: "history",
    routes: [
        // {
        //     path: '/',
        //     name: 'index ',
        //     component: () => import('./App.vue'),
        //     meta:{
        //         title: '首页'
        //     }
        // },
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
