import React from 'react';
import classNames from 'classnames/bind';
import styles from './TableEmployeeItem.module.scss';

import { MdPeopleAlt } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';

const cx = classNames.bind(styles);

const TableEmployeeItem = ({ data, onClick }) => {
    return (
        <div className={cx('content')} onClick={onClick}>
            <div className={cx('num-table')}>{data.name}</div>
            <div className={cx('status', data?.status)}>
                <GoPrimitiveDot />
            </div>
            <div className={cx('people')}>
                <MdPeopleAlt />
                {data?.numOfPeople}
            </div>
        </div>
    );
};

export default TableEmployeeItem;
