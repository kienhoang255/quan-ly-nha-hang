/* eslint-disable react-hooks/rules-of-hooks */
import Login from '~/pages/Login/Login';
import HomeStaff from '~/pages/Staff/Home';
import Info from '~/pages/Staff/Info/Info';
import listEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import Menu from '~/pages/Staff/Menu/Menu';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';
import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import { getToLocalStorage } from '~/utils/saveToBrowser';

const publicRoutes = [{ path: '/', component: Login }];

const PAGES = [
    {
        id: '1000',
        path: '/order-service',
        component: OrderServices,
    },
    {
        id: '2000',
        path: '/list-table',
        component: ListTable,
    },
    {
        id: '3000',
        path: '/list-employee',
        component: listEmployee,
    },
    {
        id: '4000',
        path: '/order-list',
        component: OrderedList,
    },
];

const isRoles = getToLocalStorage('user')?.job;

const privateRoutesLv1 = [
    { path: '/home', component: HomeStaff },
    { path: '/info', component: Info },
];

const privateRoutesLv2 = [];
isRoles?.forEach((element) => {
    PAGES?.forEach((page) => {
        if (element === page.id) {
            privateRoutesLv2.push(page);
        }
    });
});

export { privateRoutesLv1, privateRoutesLv2, publicRoutes };
