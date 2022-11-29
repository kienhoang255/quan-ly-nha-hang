import OrderServices from '~/pages/Staff/OrderServices/OrderServices';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import ListEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import Menu from '~/pages/Staff/Menu/Menu';
import OrderedList from '~/pages/Staff/OrderedList/OrderedList';

import { AiOutlineTable } from 'react-icons/ai';
import { MdFastfood, MdOutlineRoomService, MdPeopleAlt } from 'react-icons/md';
import { BiFoodMenu } from 'react-icons/bi';

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
            notify: 'Danh sách bàn',
            active: false,
        },
        {
            id: '3000',
            path: '/list-employee',
            component: ListEmployee,
            active: false,
            title: <MdPeopleAlt />,
            notify: 'Danh sách nhân viên',
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
            notify: 'Menu',
            active: false,
        },
    ],
    MESSAGE: {},
    EMPLOYEE: [],
    TABLESERVING: {},
    TABLES: [
        {
            NoP: 9,
            status: 'using',
            stage: 1,
            id_client: '',
            id_table: '1',
            id_bill: '',
            nameClient: 'Kien',
        },
        {
            NoP: 4,
            status: 'empty',
            stage: 1,
            id_client: '',
            id_table: '2',
            id_bill: '',
        },
        {
            NoP: 5,
            status: 'booked',
            stage: 1,
            id_client: '',
            id_table: '4',
            id_bill: '',
        },
        {
            NoP: 9,
            status: 'using',
            stage: 1,
            id_client: '',
            id_table: '5',
            id_bill: '',
            nameClient: 'Tuyen@gmail.com',
        },
    ],
    FOODS: [
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Ga ran',
            price: 2,
            type: 'do chien',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Ga ran2',
            price: 2,
            type: 'do chien',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Ga ran',
            price: 2,
            type: 'Lẩu',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Khoai',
            price: 2,
            type: 'Rau cu',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Kem',
            price: 2,
            type: 'Trang mieng',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Pepsi',
            price: 2,
            type: 'Nuoc',
            image: 'asd',
            description: '123',
        },
        {
            _id: '63842a4d7a0216cddb63dba4',
            name: 'Coca',
            price: 2,
            type: 'Nuoc',
            image: 'asd',
            description: '123',
        },
    ],
};
