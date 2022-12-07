import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import ListEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import Menu from '~/pages/Staff/Menu/Menu';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';

import { AiOutlineTable } from 'react-icons/ai';
import { MdFastfood, MdManageAccounts, MdManageSearch, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';
import { BiFoodMenu } from 'react-icons/bi';
import Manager from '~/pages/Staff/Manager/Manager';
import MenuSetting from '~/pages/Staff/MenuSetting/MenuSetting';
import TableSetting from '~/pages/Staff/TableSetting/TableSetting';

export const initState = {
    PAGES: [
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
            id: '5000',
            path: '/menu',
            component: Menu,
            title: <BiFoodMenu />,
            notify: 'Thực đơn',
            active: false,
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
    ],
    MESSAGE: {},
    EMPLOYEE: [],
    TABLESERVING: {},
    TABLES: [],
    FOODS: [],
    FOODSELECTED: [],
};
