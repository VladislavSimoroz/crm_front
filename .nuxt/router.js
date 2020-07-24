import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5653843a = () => interopDefault(import('..\\pages\\messages\\index.vue' /* webpackChunkName: "pages/messages/index" */))
const _60f6411e = () => interopDefault(import('..\\pages\\roles\\index.vue' /* webpackChunkName: "pages/roles/index" */))
const _69821974 = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _0e1a4f6d = () => interopDefault(import('..\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages/auth/login/index" */))
const _5957f0f6 = () => interopDefault(import('..\\pages\\auth\\registration\\index.vue' /* webpackChunkName: "pages/auth/registration/index" */))
const _a9179b02 = () => interopDefault(import('..\\pages\\settings\\__.vue' /* webpackChunkName: "pages/settings/__" */))
const _592396be = () => interopDefault(import('..\\pages\\settings\\__\\account.vue' /* webpackChunkName: "pages/settings/__/account" */))
const _ca9c7b02 = () => interopDefault(import('..\\pages\\settings\\__\\basic.vue' /* webpackChunkName: "pages/settings/__/basic" */))
const _2b03580c = () => interopDefault(import('..\\pages\\settings\\__\\billing.vue' /* webpackChunkName: "pages/settings/__/billing" */))
const _0735a10e = () => interopDefault(import('..\\pages\\settings\\__\\company.vue' /* webpackChunkName: "pages/settings/__/company" */))
const _1095cdd6 = () => interopDefault(import('..\\pages\\settings\\__\\permissions.vue' /* webpackChunkName: "pages/settings/__/permissions" */))
const _57d85c34 = () => interopDefault(import('..\\pages\\users\\__\\index.vue' /* webpackChunkName: "pages/users/__/index" */))
const _5480db86 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/messages",
    component: _5653843a,
    name: "messages"
  }, {
    path: "/roles",
    component: _60f6411e,
    name: "roles"
  }, {
    path: "/users",
    component: _69821974,
    name: "users"
  }, {
    path: "/auth/login",
    component: _0e1a4f6d,
    name: "auth-login"
  }, {
    path: "/auth/registration",
    component: _5957f0f6,
    name: "auth-registration"
  }, {
    path: "/settings/:_?",
    component: _a9179b02,
    name: "settings-_",
    children: [{
      path: "account",
      component: _592396be,
      name: "settings-_-account"
    }, {
      path: "basic",
      component: _ca9c7b02,
      name: "settings-_-basic"
    }, {
      path: "billing",
      component: _2b03580c,
      name: "settings-_-billing"
    }, {
      path: "company",
      component: _0735a10e,
      name: "settings-_-company"
    }, {
      path: "permissions",
      component: _1095cdd6,
      name: "settings-_-permissions"
    }]
  }, {
    path: "/users/:_",
    component: _57d85c34,
    name: "users-_"
  }, {
    path: "/",
    component: _5480db86,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
