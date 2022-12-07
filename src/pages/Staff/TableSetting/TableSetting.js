import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TableSetting.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import Button from '~/components/Button/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import TableEmployeeItem from '~/components/Table/TableEmployeeItem/TableEmployeeItem';
import { useStore } from '~/store';
import { IoAdd } from 'react-icons/io5';
import ModalSettingTable from '~/components/Modal/ModalSettingTable/ModalSettingTable';
import { sortStageDuplicate } from '~/utils';

const cx = classNames.bind(styles);

const TableSetting = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Quản lý';
    });

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

    state?.TABLES?.forEach((e) => {
        if (e?.stage === stage?.stage) {
            dataTable.push(e);
        }
    });

    const handleSubmitAddNewTable = (e) => {
        e.preventDefault();
        const getData = new FormData(e.target);
        const formTable = Object.fromEntries(getData.entries());
    };

    return (
        <ContentLayout title="Quản lý bàn ăn">
            <div className={cx('list-button')}>
                <Button className={cx('btn-search')}>
                    <AiOutlineSearch />
                </Button>
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
                        <ModalSettingTable key={index} data={data}>
                            <TableEmployeeItem data={data} />
                        </ModalSettingTable>
                    );
                })}
            </div>
            <ModalSettingTable addNewTable={handleSubmitAddNewTable}>
                <Button className={cx('btn-add-table')}>
                    <IoAdd />
                </Button>
            </ModalSettingTable>
        </ContentLayout>
    );
};

export default TableSetting;
