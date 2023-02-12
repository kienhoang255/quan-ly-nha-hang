import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IsFetching.module.scss';
import Logo from '../Logo/Logo';
import { actions, useStore } from '~/store';
import { getTableProvider } from '~/services/Table/tableProvider';
import { getMenuProvider } from '~/services/Menu/menuProvider';
import { decodeToken } from 'react-jwt';
import { getBillApi } from '~/services/bill';
import { useNavigate } from 'react-router-dom';
import { getFoodOrderApi } from '~/services/foodOrder';
import { io } from 'socket.io-client';
import { getAllEmployee } from '~/services/employee';
import { getToLocalStorage } from '~/utils/saveToBrowser';
import Pusher from 'pusher-js';

const cx = classNames.bind(styles);

const IsFetching = ({ data, children }) => {
    const [IsFetch, setIsFetch] = useState(false);
    const [state, dispatch] = useStore();
    const [socket, setSocket] = useState();
    const from = '/home';

    const navigate = useNavigate();

    // useEffect(() => {
    //     let token = document.cookie;
    //     let decode = decodeToken(token);

    //     // if (decode?.job.find((e) => e === 'table')) {
    //     //     socket?.on('table', (table) => {
    //     //         dispatch(actions.updateTableUsing(table));
    //     //     });
    //     //     socket?.on('bill', (bill) => {
    //     //         dispatch(actions.addNewBill(bill));
    //     //     });
    //     // }

    //     // socket?.on('foodOrdered', (data) => {
    //     //     dispatch(actions.addItemFO(data));
    //     //     getFoodOrderApi().then((res) => dispatch(actions.addFO(res)));
    //     // });

    //     // socket?.on('foodServed', (data) => {
    //     //     dispatch(actions.updateFO(data.foodOrdered));
    //     //     dispatch(
    //     //         actions.addNotification({
    //     //             nameFood: data.nameFood,
    //     //             nameTable: data.nameTable,
    //     //             time: data.time,
    //     //             read: false,
    //     //             id_food: data.id_food,
    //     //         }),
    //     //     );
    //     // });

    //     // socket?.on('foodCancel', (data) => {
    //     //     dispatch(actions.updateFO(data.foodOrdered.foodOrdered));
    //     // });
    // }, [socket]);

    useEffect(() => {
        var pusher = new Pusher('4cae476ea6d452113730', {
            cluster: 'ap1',
        });
        var FO_Channel = pusher.subscribe('FO');
        var bill_Channel = pusher.subscribe('bill');
        var table_Channel = pusher.subscribe('table');

        FO_Channel.bind('FO_order-event', function (data) {
            console.log('data', data);
            dispatch(actions.addItemFO(data.food));
            getFoodOrderApi().then((res) => dispatch(actions.addFO(res)));
        });
        FO_Channel.bind('FO_served-event', function (data) {
            console.log('data', data);
            dispatch(actions.updateFO(data.foodOrdered.foodOrdered));
            dispatch(
                actions.addNotification({
                    nameFood: data.foodOrdered.nameFood,
                    nameTable: data.foodOrdered.nameTable,
                    time: data.foodOrdered.time,
                    read: false,
                    id_food: data.foodOrdered.id_food,
                }),
            );
        });

        FO_Channel.bind('FO_cancel-event', function (data) {
            console.log('data', data);
            dispatch(actions.updateFO(data.foodOrdered));
        });

        bill_Channel.bind('bill-event', function (data) {
            console.log('data', data);
            dispatch(actions.addNewBill(data.bill));
        });

        table_Channel.bind('table-event', function (data) {
            dispatch(actions.updateTableUsing(data.table));
            console.log(data);
        });
    }, []);

    useEffect(() => {
        let token = document.cookie;
        let decode = decodeToken(token);
        let promises = [];
        let avatar = getToLocalStorage('avatar');
        dispatch(
            actions.setUser({
                username: decode?.username,
                address: decode?.address,
                email: decode?.email,
                phone: decode?.phone,
                job: decode?.job,
                avatar: avatar || null,
            }),
        );
        const tablePromise = getTableProvider().then((res) => dispatch(actions.getTable(res)));
        const menuPromise = getMenuProvider().then((res) => dispatch(actions.getFood(res)));
        const billPromise = getBillApi().then((res) => dispatch(actions.addBill(res)));
        const FOPromise = getFoodOrderApi().then((res) => dispatch(actions.addFO(res)));
        const employeePromise = getAllEmployee(dispatch);
        decode?.job.forEach((element) => {
            if (element === 'table' || element === 'Mtable') {
                promises.push(tablePromise);
                promises.push(billPromise);
            } else if (element === 'menu' || element === 'Mmenu') promises.push(menuPromise);
            else if (element === 'FO') promises.push(FOPromise);
            else if (element === 'employee' || element === 'Memployee') promises.push(employeePromise);
        });

        if (token) {
            setIsFetch(true);
            setSocket(
                io('https://quan-ly-nha-hang-socket-io.vercel.app/', {
                    autoConnect: false,
                    reconnection: false,
                }),
            );
            const newPromises = [...new Set(promises)];
            Promise.all(newPromises).then((value) => {
                setIsFetch(false);
                navigate(from, { replace: true });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {IsFetch ? (
                <div className={cx('container')}>
                    <Logo className={cx('logo')} />
                    <div className={cx('content')}>
                        <div className={cx('main')}>
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default IsFetching;
