import React from 'react';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import Avatar from '../Avatar/Avatar';
import ModalUser from '../ModalUser/ModalUser';

const cx = classNames.bind(styles);

const Table = ({ data }) => {
    const table = data;
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div>No.</div>
                <div>Tên</div>
                <div>Số điện thoại</div>
                <div>Email</div>
                <div>Địa chỉ</div>
            </div>

            <div className={cx('body')}>
                {table?.map((tableItem, index) => {
                    return (
                        <ModalUser className={cx('content')} data={tableItem} key={index}>
                            <div>{index + 1}</div>
                            <div>
                                <Avatar />
                                <span className={cx('name')}>{tableItem.username}</span>
                            </div>
                            <div>{tableItem.phone}</div>
                            <div>{tableItem.email}</div>
                            <div>{tableItem.address}</div>
                        </ModalUser>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
