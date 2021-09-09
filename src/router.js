import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: "hash",
    routes: [
        {
            path: '/',
            name: 'index ',
            redirect: () => {
                return { path: '/nav' }
            }
        },
        {
            path: '/nav',
            name: 'nav',
            component: () => import(/* webpackChunkName: "nav" */ /* webpackPrefetch: true */'./views/nav.vue'),
            meta: {
                title: '首页'
            }

        },
        {
            path: '/selector',
            name: 'selector ',
            component: () => import(/* webpackChunkName: "selector" */ /* webpackPrefetch: true */'./views/selector/index.vue'),
            meta: {
                title: '窝轮筛选器'
            }
        },
        {
            path: '/decisionor',
            name: 'decisionor ',
            component: () => import(/* webpackChunkName: "decisionor" */ /* webpackPrefetch: true */'./views/decisionor/index.vue'),
            meta: {
                title: '决策器'
            }
        },
        {
            path: '/salary',
            name: 'salary ',
            component: () => import(/* webpackChunkName: "salary" */ /* webpackPrefetch: true */'./views/salary/index.vue'),
            meta: {
                title: '薪资计算器'
            }
        },
        {
            path: '/dev',
            name: 'dev',
            component: () => import('./views/rise/index.vue'),
            meta: {
                title: '开发中页面'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})
export default router;
