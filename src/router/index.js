import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import ProfilePage from "../portfolio/pages/profile-page.component.vue";
import Portfolio from '../portfolio/pages/portfolio.component.vue'
import Dashboard from "../public/pages/dashboard.component.vue";
import LoginPage from "../users/pages/login-page.vue";
import RegisterPage from "../users/pages/register-page.vue";
import DesignerPaymentsPage from "../payments/pages/designer-payments.page.vue"
import ClientPaymentsPage from "../payments/pages/client-payments.page.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',     name: 'home',     component: HomeComponent,     meta: { title: 'Home' } },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/about',    name: 'about',    component: AboutComponent,    meta: { title: 'About us' } },
        { path: '/profile',  name: 'profile',  component: ProfilePage,       meta: { title: 'Profile' } },
        { path: '/portfolio', name: 'Portfolio', component: Portfolio },
        { path: '/', redirect: '/home' },
        { path: '/login', name: 'Login', component: LoginPage },
        {
            path: '/payments',
            name: 'designer-payments',
            component: DesignerPaymentsPage,
            meta: { title: 'Payments' }
        },
        {
            path: '/client/payments',
            name: 'client-payments',
            component: ClientPaymentsPage 
        },
        { path: '/register', name: 'Register', component: RegisterPage }
    ]
});

router.beforeEach((to, from, next) => {
    const baseTitle = 'CreateLink';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;
