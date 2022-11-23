import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListEmplyee.module.scss';
import Table from '~/components/Table/Table';
import { getAllEmployee } from '~/services/employee';
import { useStore } from '~/store';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const ListEmployee = () => {
    const [state, dispatch] = useStore();
    const handleGetEmployee = () => {
        getAllEmployee(dispatch);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <span>Nhân viên</span>
            </div>
            <div className={cx('content')}>
                <Table data={state?.EMPLOYEE} />
            </div>
            <Button onClick={handleGetEmployee} style={{ marginTop: '20px' }}>
                Refresh
            </Button>
        </div>
    );
};

export default ListEmployee;
