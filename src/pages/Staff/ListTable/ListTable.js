import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTable.module.scss';
import Button from '~/components/Button/Button';
import ModalClientCheckIn from '~/components/Modal/ModalClientCheckIn/ModalClientCheckIn';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import TableEmployeeItem from '~/components/Table/TableEmployeeItem/TableEmployeeItem';
import { actions, useStore } from '~/store';
import { useNavigate } from 'react-router-dom';

import { AiOutlineSearch } from 'react-icons/ai';
import { sortStageDuplicate } from '~/utils';

const cx = classNames.bind(styles);

const ListTable = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Danh sách bàn ăn';
    });
    const navigate = useNavigate();
    const from = '/menu';

    const [nameButtonStage, setNameButtonStage] = useState(sortStageDuplicate(state?.TABLES));

    const [stage, setStage] = useState(nameButtonStage[0]);
    useEffect(() => {
        onClickStage(stage);
    }, []);
    let dataTable = [];
    const onClickStage = (stageSel) => {
        setStage(stageSel);
        setNameButtonStage((prev) =>
            prev?.map((e) => {
                if (e.stage === stageSel.stage) {
                    return { ...e, active: true };
                }
                return { ...e, active: false };
            }),
        );
    };

    state.TABLES?.forEach((e) => {
        if (e?.stage === stage?.stage) {
            dataTable.push(e);
        }
    });

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
        <ContentLayout title="Danh sách bàn ăn">
            <div className={cx('list-button')}>
                <Button className={cx('btn-search')}>
                    <AiOutlineSearch />
                </Button>
                {nameButtonStage.map((e) => (
                    <Button
                        key={e?.stage}
                        variant="outline"
                        className={cx('list-button-item')}
                        onClick={() => onClickStage(e)}
                        active={e?.active}
                    >
                        {e?.stage}
                    </Button>
                ))}
            </div>

            <div className={cx('content')}>
                {dataTable?.map((data, index) => {
                    return (
                        <ModalClientCheckIn key={index} onSubmit={submitTable} onClick={() => getStatus(data)}>
                            <TableEmployeeItem onClick={() => getDataTable(data)} data={data} />
                        </ModalClientCheckIn>
                    );
                })}
            </div>
        </ContentLayout>
    );
};

export default ListTable;
