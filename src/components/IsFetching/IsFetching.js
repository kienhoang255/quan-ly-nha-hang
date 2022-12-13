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

const cx = classNames.bind(styles);

const IsFetching = ({ data, children }) => {
    const [IsFetch, setIsFetch] = useState(false);
    const [state, dispatch] = useStore();
    const [role, setRole] = useState([]);
    const from = '/home';

    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    useEffect(() => {
        let token = document.cookie;
        let decode = decodeToken(token);
        let promises = [];
        dispatch(actions.setUser(decode));
        const tablePromise = getTableProvider().then((res) => dispatch(actions.getTable(res)));
        const menuPromise = getMenuProvider().then((res) => dispatch(actions.getFood(res)));
        const billPromise = getBillApi().then((res) => dispatch(actions.addBill(res)));
        const FOPromise = getFoodOrderApi().then((res) => dispatch(actions.addFO(res)));
        decode.job.forEach((element) => {
            if (element === '2000' || element === '8000') {
                promises.push(tablePromise);
                promises.push(billPromise);
            } else if (element === '5000' || element === '9000') promises.push(menuPromise);
            else if (element === '4000') promises.push(FOPromise);
        });

        if (token) {
            setIsFetch(true);
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
