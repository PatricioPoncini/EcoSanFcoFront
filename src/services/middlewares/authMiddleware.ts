import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        next('/');
    } else {
        next();
    }
}
