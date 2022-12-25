/* eslint-disable react-hooks/rules-of-hooks */
import { AiOutlineTable } from 'react-icons/ai';
import { MdFastfood, MdManageSearch, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';
import { decodeToken } from 'react-jwt';
import Home from '~/pages/Home';
import Login from '~/pages/Login/Login';
import EmployeeSetting from '~/pages/Staff/EmployeeSetting/EmployeeSetting';
import Info from '~/pages/Staff/Info/Info';
import ListEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import MenuSetting from '~/pages/Staff/MenuSetting/MenuSetting';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';
import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import TableSetting from '~/pages/Staff/TableSetting/TableSetting';

const publicRoutes = [{ path: '/', component: Login }];

export const PAGES = [
    {
        id: 'Mmenu',
        path: '/setting-menu',
        component: MenuSetting,
        title: <MdManageSearch />,
        notify: 'Quản lý thực đơn',
        active: false,
    },
    {
        id: 'OS',
        path: '/order-service',
        component: OrderServices,
        title: <MdOutlineRoomService />,
        notify: 'Danh sách phục vụ',
        active: false,
    },

    {
        id: 'employee',
        path: '/list-employee',
        component: ListEmployee,
        active: false,
        title: <MdPeopleAlt />,
        notify: 'Nhân viên',
    },
    {
        id: 'Memployee',
        path: '/setting-employee',
        component: EmployeeSetting,
        active: false,
        title: <MdPeopleAlt />,
        notify: 'Quản lý nhân viên',
    },
    {
        id: 'FO',
        path: '/order-list',
        component: OrderedList,
        title: <MdFastfood />,
        notify: 'Món ăn đã đặt',
        active: false,
    },
    {
        // id: '5000',
        // path: '/menu',
        // component: Menu,
        // title: <BiFoodMenu />,
        // notify: 'Thực đơn',
        // active: false,
    },
    {
        id: 'table',
        path: '/list-table',
        component: ListTable,
        title: <AiOutlineTable />,
        notify: 'Bàn ăn',
        active: false,
    },
    {
        id: 'Mtable',
        path: '/setting-table',
        component: TableSetting,
        title: <AiOutlineTable />,
        notify: 'Quản lý bàn ăn',
        active: false,
    },
];

let token = document.cookie;
let isRoles = decodeToken(token);
const privateRoutesLv1 = [
    { path: '/home', component: Home },
    { path: '/info', component: Info },
];

const privateRoutesLv2 = [];
isRoles?.job?.forEach((element) => {
    PAGES?.forEach((page) => {
        if (element === page.id) {
            privateRoutesLv2.push(page);
        }
    });
});

export { privateRoutesLv1, privateRoutesLv2, publicRoutes };
