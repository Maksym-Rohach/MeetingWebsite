import React from 'react';

const User = React.lazy(() => import('../components/admin/User/User'));
const Login = React.lazy(() => import('../../components/pages/login'));


const routes = [
    { path: '/admin/users', name: 'User', component: User },
    { path: '/login', name: 'Login', component: Login }
];

export default routes;
