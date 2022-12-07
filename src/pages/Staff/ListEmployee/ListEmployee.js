import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListEmplyee.module.scss';
import { getAllEmployee } from '~/services/employee';
import { useStore } from '~/store';
import Button from '~/components/Button/Button';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import TableEmployee from '~/components/Table/TableEmployee/TableEmployee';

const cx = classNames.bind(styles);

const ListEmployee = () => {
    useEffect(() => {
        document.title = 'List Employee';
    });
    const [state, dispatch] = useStore();
    const handleGetEmployee = () => {
        getAllEmployee(dispatch);
    };

    return (
        <ContentLayout title={'employee'} className={cx('content')}>
            <TableEmployee data={state?.EMPLOYEE} />
            <Button onClick={handleGetEmployee} style={{ marginTop: '20px' }}>
                Refresh
            </Button>
        </ContentLayout>
    );
};

export default ListEmployee;
