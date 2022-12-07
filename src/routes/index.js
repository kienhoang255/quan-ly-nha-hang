/* eslint-disable react-hooks/rules-of-hooks */
import Home from '~/pages/Home';
import Login from '~/pages/Login/Login';
import Info from '~/pages/Staff/Info/Info';
import listEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import Manager from '~/pages/Staff/Manager/Manager';
import MenuSetting from '~/pages/Staff/MenuSetting/MenuSetting';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';
import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import TableSetting from '~/pages/Staff/TableSetting/TableSetting';
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
    {
        id: '9000',
        path: '/setting-menu',
        component: MenuSetting,
    },
    {
        id: '8000',
        path: '/setting-table',
        component: TableSetting,
    },
];

const isRoles = getToLocalStorage('user')?.job;

const privateRoutesLv1 = [
    { path: '/home', component: Home },
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
