import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTable.module.scss';
import Button from '~/components/Button/Button';
import ModalClientCheckIn from '~/components/Modal/ModalClientCheckIn/ModalClientCheckIn';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import isEmpty from '~/validation/isEmpty';

import { actions, useStore } from '~/store';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { sortStageDuplicate } from '~/utils';
import { clientCheckIn } from '~/services/bill';
import TableItem from '~/components/Table/TableItem/TableItem';
import isEmail from '~/validation/isEmail';
import { isPhoneNumber } from '~/validation/isPhone';

const cx = classNames.bind(styles);

const ListTable = () => {
    const [state, dispatch] = useStore();
    const [notify, setNotify] = useState('');
    useEffect(() => {
        document.title = 'Danh sách bàn ăn';
    });
    const navigate = useNavigate();
    const from = '/menu';

    const [nameButtonStage, setNameButtonStage] = useState(sortStageDuplicate(state.TABLES));

    const [stageTable, setStageTable] = useState(nameButtonStage[0]);
    let dataTable = [];
    const onClickStage = (stageSel) => {
        setStageTable(stageSel);
        setNameButtonStage((prev) =>
            prev?.map((e) => {
                if (e?.stage === stageSel?.stage) {
                    return { ...e, active: true };
                }
                return { ...e, active: false };
            }),
        );
    };
    useEffect(() => {
        onClickStage(nameButtonStage[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    state.TABLES?.forEach((e) => {
        if (e?.stage === stageTable?.stage) {
            dataTable.push(e);
        }
    });

    const getStatus = (data) => {
        if (data.status === 'using') navigate(from);
    };

    const getDataTable = (data) => {
        dispatch(actions.setTableServing(data));
    };

    const handleOnLoad = () => {
        setNameButtonStage(sortStageDuplicate(state.TABLES));
    };

    const submitTable = (e) => {
        e.preventDefault();
        const checkInForm = new FormData(e.target);
        checkInForm.append('id_table', state.TABLESERVING._id);
        const dataCheckIn = Object.fromEntries(checkInForm.entries());
        if (!isEmpty(dataCheckIn, 'email')) {
            setNotify('Không được để trống');
        } else if (!isEmail(dataCheckIn, 'email')) {
            if (isPhoneNumber(dataCheckIn, 'email')) {
                setNotify('Đây không phải là email');
            } else {
                clientCheckIn(dispatch, dataCheckIn);
                navigate(from);
            }
        } else {
            clientCheckIn(dispatch, dataCheckIn);
            navigate(from);
        }
    };

    return (
        <ContentLayout title="Danh sách bàn ăn">
            <div className={cx('list-button')} onLoad={handleOnLoad}>
                {/* <Button className={cx('btn-search')}>
                    <AiOutlineSearch />
                </Button> */}
                {nameButtonStage?.map((e) => (
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
                        <ModalClientCheckIn
                            key={index}
                            onSubmit={submitTable}
                            //redirect users to menu page
                            onClick={() => getStatus(data)}
                            notify={notify}
                            setNotify={setNotify}
                        >
                            <TableItem onClick={() => getDataTable(data)} data={data} />
                        </ModalClientCheckIn>
                    );
                })}
            </div>
        </ContentLayout>
    );
};

export default ListTable;
