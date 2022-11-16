import Contact from '~/pages/Client/Contact/Contact';
import Menu from '~/pages/Client/Menu/Menu';
import Home from '~/pages/Home';
import HomeStaff from '~/pages/Staff/Home';
import Info from '~/pages/Staff/Info/Info';
import listEmployee from '~/pages/Staff/ListEmployee/ListEmployee';
import ListTable from '~/pages/Staff/ListTable/ListTable';
import { OrderedList } from '~/pages/Staff/OrderedList/OrderedList';
import { isRequiredStaff } from '~/utils/specialRoute';

const publicRoutes = [{ path: '/', component: Home }];

const privateRoutesClient = [
    { path: '/contact', component: Contact },
    { path: '/menu', component: Menu },
];

const privateRoutesStaff = [
    { path: '/home', component: HomeStaff },
    { path: '/info', component: Info },
    { path: '/order-list', component: OrderedList },
    { path: '/list-table', component: ListTable },
    { path: '/list-employee', component: listEmployee },
    { path: '/order-service', component: OrderedList },
];

export { privateRoutesStaff, privateRoutesClient, publicRoutes };
