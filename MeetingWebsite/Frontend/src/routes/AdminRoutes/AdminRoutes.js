import React from 'react';

const User = React.lazy(() => import('../components/admin/User/User'));

const routes = [
    { path: '/admin/users', name: 'User', component: User }
];

export default routes;
