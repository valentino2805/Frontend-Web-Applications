import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../public/pages/home.component.vue";
import ProfilePage from "../portfolio/pages/profile-page.component.vue";
import Portfolio from '../portfolio/pages/portfolio.component.vue';

import LoginPage from "../users/pages/login-page.vue";
import RegisterPage from "../users/pages/register-page.vue";
import DesignerPaymentsPage from "../payments/pages/designer-payments.page.vue";
import ClientPaymentsPage from "../payments/pages/client-payments.page.vue";
import FindDesignerPage from "../find-designer/pages/categories.page.vue";
import CategoryResultPage from "../find-designer/pages/category-results.page.vue";
import DesignerDetailPage from "../find-designer/pages/designer-detail.page.vue";
import ProfileView from "../portfolio/pages/profiel-view.component.vue";
import IntroView from "../public/pages/intro-view.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: IntroView }, // ✅ Solo esta debe quedarse para `/`
        { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },

        {
            path: '/profile/:profileId',
            name: 'profile',
            component: () => import('../portfolio/components/profile-card.component.vue'),
            props: true
        },
        { path: '/portfolio', name: 'Portfolio', component: Portfolio },
        { path: '/find-designers', name: 'users', component: ProfileView, meta: { title: 'Other Users' } },

        { path: '/login', name: 'Auth', component: () => import('../users/pages/AuthView.vue'), meta: { title: 'Auth' } },
        { path: '/register', name: 'Register', component: RegisterPage },

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
        {
            path: '/find-designer',
            name: 'find-designer-categories',
            component: FindDesignerPage,
            meta: { title: 'Find Designer' }
        },
        {
            path: '/find-designer/:category',
            name: 'designer-category-results',
            component: CategoryResultPage,
            meta: { title: 'Designers' }
        },
        {
            path: '/find-designer/:category/:id',
            name: 'designer-detail',
            component: DesignerDetailPage
        },
    ]
});

router.beforeEach((to, from, next) => {
    const baseTitle = 'CreateLink';
    document.title = `${baseTitle} | ${to.meta['title'] || ''}`;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Redirección condicional al entrar a '/'
    if (to.path === '/') {
        if (currentUser?.role === 'client') {
            return next('/find-designer');
        } else if (currentUser?.role === 'profile') {
            return next('/home');
        }
    }

    next();
});

export default router;
