import { AiOutlineTable } from 'react-icons/ai';
import { MdFastfood, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';
import listEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import { OrderedList } from '~/pages/Staff/OrderedList/OrderedList';
import OrderServices from '~/pages/Staff/OrderServices/OrderServices';

export const initState = {
    PAGES: [
        {
            id: '1000',
            path: '/order-service',
            component: OrderServices,
            title: <MdOutlineRoomService />,
            notiy: 'Danh sách phục vụ',
            active: false,
        },
        {
            id: '2000',
            path: '/list-table',
            component: ListTable,
            title: <AiOutlineTable />,
            notify: 'Danh sách bàn',
            active: false,
        },
        {
            id: '3000',
            path: '/list-employee',
            component: listEmployee,
            title: <MdPeopleAlt />,
            notify: 'Danh sách nhân viên',
            active: false,
        },
        {
            id: '4000',
            path: '/order-list',
            component: OrderedList,
            title: <MdFastfood />,
            notify: 'Danh sách những món ăn đã đặt',
            active: false,
        },
    ],
    MESSAGE: {},
    EMPLOYEE: [],
};
