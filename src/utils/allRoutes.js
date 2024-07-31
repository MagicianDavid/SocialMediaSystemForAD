const allRoutes = [
    { path: '/dashboard', component: 'Dashboard', menuName: 'Dashboard'},
    { path: '/employees', component: 'UserList', menuName: 'Users', children: [
            { path: '/users', menuName: 'User List' },
            { path: '/userProfile', menuName: 'User Profile' },
            { path: '/users/add', menuName: 'Add User' },
            { path: '/users/edit', menuName: 'Edit User' },
            { path: '/users/reports', menuName:'Reports'},
            { path: '/users/reportdetail', menuName:'Report Detail'},
        ] },
    { path: '/roles', component: 'RoleList', menuName: 'Roles', children: [
            { path: '/roles', menuName: 'Roles List' },
            { path: '/roles/add', menuName: 'Add Role' },
            { path: '/roles/edit', menuName: 'Edit Role' },
        ] },
    { path: '/auths', component: 'AuthList', menuName: 'Auths', children: [
            { path: '/auths', menuName: 'Auth List' },
            { path: '/auths/add', menuName: 'Add Auth' },
            { path: '/auths/edit', menuName: 'Edit Auth' },
        ] },
    { path: '/public', component: 'PostList', menuName: 'Public', children: [
            { path: '/mainmenu', menuName: 'New Feeds' },
            { path: '/friends', menuName: 'Friends' },
            { path: '/notificationlist', menuName: 'Notification' },
            { path: '/userdetails', menuName:'User Profile'},
            { path: '/postsdetails', menuName:"Post Details"}
        ] },
]

export const getAllRoutes = allRoutes;