import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTable.module.scss';
import Button from '~/components/Button/Button';
import TableItem from '~/components/TableItem/TableItem';
import { AiOutlineSearch } from 'react-icons/ai';
import ModalClientCheckIn from '~/components/ModalClientCheckIn/ModalClientCheckIn';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import { actions, useStore } from '~/store';

const cx = classNames.bind(styles);

const ListTable = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'List Table';
    });
    const navigate = useNavigate();
    const from = '/menu';

    const submitTable = (e) => {
        e.preventDefault();
        const checkInForm = new FormData(e.target);
        const dataCheckIn = Object.fromEntries(checkInForm.entries());
    };

    const getStatus = (data) => {
        if (data.status === 'using') navigate(from);
    };

    const getDataTable = (data) => {
        dispatch(actions.setTableServing(data));
    };

    return (
        <ContentLayout title="list table">
            <div className={cx('list-button')}>
                <Button className={cx('btn-search')}>
                    <AiOutlineSearch />
                </Button>
                <Button className={cx('list-button-item')}>1</Button>
                <Button className={cx('list-button-item')}>1</Button>
            </div>

            <div className={cx('content')}>
                {state.TABLES?.map((data, index) => {
                    return (
                        <ModalClientCheckIn key={index} onSubmit={submitTable} onClick={() => getStatus(data)}>
                            <TableItem onClick={() => getDataTable(data)} data={data} index={index} />
                        </ModalClientCheckIn>
                    );
                })}
            </div>
        </ContentLayout>
    );
};

export default ListTable;
