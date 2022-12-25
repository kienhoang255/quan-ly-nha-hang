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

const cx = classNames.bind(styles);

const IsFetching = ({ data, children }) => {
    const [IsFetch, setIsFetch] = useState(false);
    const [state, dispatch] = useStore();
    const [socket, setSocket] = useState();
    const from = '/home';

    const navigate = useNavigate();

    useEffect(() => {
        let token = document.cookie;
        let decode = decodeToken(token);

        if (decode?.job.find((e) => e === 'table')) {
            socket?.on('table', (table) => {
                dispatch(actions.updateTableUsing(table));
            });
            socket?.on('bill', (bill) => {
                dispatch(actions.addNewBill(bill));
            });
        }

        socket?.on('foodOrdered', (data) => {
            dispatch(actions.addItemFO(data));
            // getFoodOrderApi().then((res) => dispatch(actions.addFO(res)));
        });

        socket?.on('foodServed', (data) => {
            dispatch(actions.updateFO(data.foodOrdered));
            dispatch(
                actions.addNotification({
                    nameFood: data.nameFood,
                    nameTable: data.nameTable,
                    time: data.time,
                    read: false,
                    id_food: data.id_food,
                }),
            );
        });

        socket?.on('foodCancel', (data) => {
            dispatch(actions.updateFO(data.foodOrdered));
        });
    }, [socket]);

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
            setSocket(io('ws://localhost:8000'));
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
