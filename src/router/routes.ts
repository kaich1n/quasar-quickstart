import { RouteRecordRaw } from 'vue-router';

const generateRoutes = () => {
  const modules = import.meta.glob('../pages/*.vue');
  // console.log(modules);

  return Object.keys(modules).map((key) => {
    const fileNameWithExt = key.split('/').pop() as string;
    const fileName = fileNameWithExt.substring(0, fileNameWithExt.length - 4);
    return {
      path: fileName,
      component: modules[key],
    };
  });
};

console.log('res = ', generateRoutes());

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
