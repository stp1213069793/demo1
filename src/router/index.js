import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [{
        path: '/htmlBank',
        name: 'htmlBank',
        // route level code-splitting 
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "htmlBank" */ '../views/QuestionBank/HtmlBankView.vue')
    },

    {
        path: '/cssBank',
        name: 'cssBank',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "cssBank" */ '@/views/QuestionBank/CssBankView.vue')
    },
    {
        path: '/jsBank',
        name: 'jsBank',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "jsBank" */ '@/views/QuestionBank/JsBankView.vue')
    },
    {
        path: '/questionBank',
        name: 'questionBank',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "questionBank" */ '@/views/QuestionBank/QuestionBankView.vue')
    },
    {
        path: '/personInfo',
        name: 'personInfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "personInfo" */ '@/views/PersonInfoView.vue')
    },
    {
        path: '/chatInterface',
        name: 'chatInterface',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "chatInterface" */ '../views/ChatInterfaceView.vue')
    },
    {
        path: '/AuthorityMmanagement',
        name: 'AuthorityMmanagement',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "AuthorityMmanagement" */ '../views/AuthorityMmanagement.vue')
    },
    {
        path: '/userInformationList',
        name: 'userInformationList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/UserInformationList.vue')
    },
    {
        path: '/ctreateTask',
        name: 'ctreateTask',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/task/CreateTaskView.vue')
    },
    {
        path: '/queryTask',
        name: 'queryTask',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/task/QueryTaskView.vue')
    },
    {
        path: '/taskDetails',
        name: 'taskDetails',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/task/TaskDetails.vue')
    },
    ]
},
{
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/LoginView.vue')
},
{
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/Register.vue')
},
{
    path: '/ceshi',
    name: 'ceshi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/CeShi.vue')
},



{
    path: '/newRole',
    name: 'newRole',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/role/NewRole.vue')
},
{
    path: '/addGroup',
    name: 'addGroup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/roleGroup/AddGroup.vue')
},
{
    path: '/uerDdetails',
    name: 'uerDdetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/UserDdetails.vue')
},


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router