import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderedList.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';

const cx = classNames.bind(styles);

const OrderedList = () => {
    useEffect(() => {
        document.title = 'Order List';
    });
    return (
        <ContentLayout title={'Order List'}>
            <div>123</div>
        </ContentLayout>
    );
};

export default OrderedList;
