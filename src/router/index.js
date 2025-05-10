import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import ProfilePage from "../portfolio/pages/profile-page.component.vue";
import Portfolio from '../portfolio/pages/portfolio.component.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',     name: 'home',     component: HomeComponent,     meta: { title: 'Home' } },
        { path: '/about',    name: 'about',    component: AboutComponent,    meta: { title: 'About us' } },
        { path: '/profile',  name: 'profile',  component: ProfilePage,       meta: { title: 'Profile' } },
        { path: '/portfolio', name: 'Portfolio', component: Portfolio },
        { path: '/', redirect: '/home' }
    ]
});

router.beforeEach((to, from, next) => {
    const baseTitle = 'CreateLink';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;
