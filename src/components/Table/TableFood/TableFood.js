import React from 'react';
import classNames from 'classnames/bind';
import styles from './TableFood.module.scss';

const cx = classNames.bind(styles);

const TableFood = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div>No.</div>
                <div>Tên</div>
                <div>Số điện thoại</div>
                <div>Email</div>
                <div>Địa chỉ</div>
            </div>

            <div className={cx('body')}></div>
        </div>
    );
};

export default TableFood;
