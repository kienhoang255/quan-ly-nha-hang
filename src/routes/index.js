/* eslint-disable react-hooks/rules-of-hooks */
import { AiOutlineTable } from 'react-icons/ai';
import { MdFastfood, MdManageSearch, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';
import { decodeToken } from 'react-jwt';
import Home from '~/pages/Home';
import Login from '~/pages/Login/Login';
import Info from '~/pages/Staff/Info/Info';
import ListEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import MenuSetting from '~/pages/Staff/MenuSetting/MenuSetting';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';
import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import TableSetting from '~/pages/Staff/TableSetting/TableSetting';
import { getToLocalStorage } from '~/utils/saveToBrowser';

const publicRoutes = [{ path: '/', component: Login }];

export const PAGES = [
    {
        id: '1000',
        path: '/order-service',
        component: OrderServices,
        title: <MdOutlineRoomService />,
        notify: 'Danh sách phục vụ',
        active: false,
    },
    {
        id: '2000',
        path: '/list-table',
        component: ListTable,
        title: <AiOutlineTable />,
        notify: 'Bàn ăn',
        active: false,
    },
    {
        id: '3000',
        path: '/list-employee',
        component: ListEmployee,
        active: false,
        title: <MdPeopleAlt />,
        notify: 'Nhân viên',
    },
    {
        id: '4000',
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
        id: '8000',
        path: '/setting-table',
        component: TableSetting,
        title: <AiOutlineTable />,
        notify: 'Quản lý bàn ăn',
        active: false,
    },
    {
        id: '9000',
        path: '/setting-menu',
        component: MenuSetting,
        title: <MdManageSearch />,
        notify: 'Quản lý thực đơn',
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
