import React from 'react';
import classNames from 'classnames/bind';
import styles from './TableItem.module.scss';

import { MdPeopleAlt } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';

const cx = classNames.bind(styles);

const TableItem = ({ data, index,onClick }) => {
    return (
        <div className={cx('content')} onClick={onClick}>
            <div className={cx('num-table')}>1-{index}</div>
            <div className={cx('status', data?.status)}>
                <GoPrimitiveDot />
            </div>
            <div className={cx('people')}>
                <MdPeopleAlt />
                {data?.NoP}
            </div>
        </div>
    );
};

export default TableItem;
