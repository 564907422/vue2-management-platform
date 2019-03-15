/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from '../App';
// import Index from './views/index/index';
import Table from '../views/table/index';
import Form from '../views/form/form';
import Login from '../views/common/login';
import Edit from '../views/form/edit';

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    component: App,
    children: [
      // {path: '/index', component: Index, name: 'index', class: 'fa-line-chart'},
      {path: '/index', component: Table, name: 'index', class: 'fa-table', meta: {title: '服务列表'}},
      {path: '/form', component: Form, name: 'form', class: 'fa-newspaper-o', meta: {title: '申请服务'}},
      {path: '/edit', component: Edit, name: 'edit', class: 'fa-newspaper-o', meta: {title: '查看服务'}}
      // {path: '/editor', component: ue, name: 'editor', class: 'fa-plug'}
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
];
const router = new VueRouter({
  // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
  'linkActiveClass': 'active',
  routes
});

export default router
