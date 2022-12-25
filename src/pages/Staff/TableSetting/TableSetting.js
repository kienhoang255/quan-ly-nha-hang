import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TableSetting.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import Button from '~/components/Button/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { actions, useStore } from '~/store';
import { IoAdd } from 'react-icons/io5';
import ModalSettingTable from '~/components/Modal/ModalSettingTable/ModalSettingTable';
import { sortStageDuplicate } from '~/utils';
import TableItem from '~/components/Table/TableItem/TableItem';
import isEmpty from '~/validation/isEmpty';
import { addNewTableApi, deleteTableApi, updateTableApi } from '~/services/Table/tableProvider';

const cx = classNames.bind(styles);

const TableSetting = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Quản lý';
    });
    const [notify, setNotify] = useState({
        stage: '',
        numOfPeople: '',
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

    const refsById = useMemo(() => {
        const refs = {};
        state?.TABLES.forEach((item) => {
            refs[item._id] = React.createRef(null);
        });
        return refs;
    }, [state?.TABLES]);

    const addTableRef = useRef();

    state?.TABLES?.forEach((e) => {
        if (e?.stage === stage?.stage) {
            dataTable.push(e);
        }
    });

    const handleSubmitAddNewTable = (e) => {
        e.preventDefault();
        const getData = new FormData(e.target);
        const formTable = Object.fromEntries(getData.entries());

        const checkStage = isEmpty(formTable, 'stage');
        const checkNOP = isEmpty(formTable, 'numOfPeople');
        const checkNumberStage = Number(formTable.stage);
        const checkNumberNOP = Number(formTable.numOfPeople);
        const checkMaxNOP = formTable.numOfPeople < 40;

        if (!checkStage) {
            setNotify((prev) => ({ ...prev, stage: 'Không được để trống' }));
        } else {
            if (!checkNumberStage) setNotify((prev) => ({ ...prev, stage: 'Số tầng không hợp lý' }));
            else setNotify((prev) => ({ ...prev, stage: '' }));
        }

        if (!checkNOP) {
            setNotify((prev) => ({ ...prev, numOfPeople: 'Không được để trống' }));
        } else {
            if (!checkNumberNOP) setNotify((prev) => ({ ...prev, numOfPeople: 'Số người không hợp lý' }));
            else {
                if (!checkMaxNOP) setNotify((prev) => ({ ...prev, numOfPeople: 'Số người quá lớn' }));
                else setNotify((prev) => ({ ...prev, numOfPeople: '' }));
            }
        }

        if (checkMaxNOP && checkNumberStage) {
            addNewTableApi(formTable).then((res) => {
                if (res.message === 'success') {
                    dispatch(actions.addTable(res.createTable));
                    dispatch(actions.setMessage({ message: 'Thêm thành công' }));
                    addTableRef.current.closeModal();
                }
            });
        }
    };

    const handleSubmitUpdateTable = (e, _id) => {
        e.preventDefault();
        const getData = new FormData(e.target);
        getData.append('_id', _id);
        const formTable = Object.fromEntries(getData.entries());

        const checkStage = isEmpty(formTable, 'stage');
        const checkNOP = isEmpty(formTable, 'numOfPeople');
        const checkNumberStage = Number(formTable.stage);
        const checkNumberNOP = Number(formTable.numOfPeople);
        const checkMaxNOP = formTable.numOfPeople < 40;

        if (!checkStage) {
            setNotify((prev) => ({ ...prev, stage: 'Không được để trống' }));
        } else {
            if (!checkNumberStage) setNotify((prev) => ({ ...prev, stage: 'Số tầng không hợp lý' }));
            else setNotify((prev) => ({ ...prev, stage: '' }));
        }

        if (!checkNOP) {
            setNotify((prev) => ({ ...prev, numOfPeople: 'Không được để trống' }));
        } else {
            if (!checkNumberNOP) setNotify((prev) => ({ ...prev, numOfPeople: 'Số người không hợp lý' }));
            else {
                if (!checkMaxNOP) setNotify((prev) => ({ ...prev, numOfPeople: 'Số người quá lớn' }));
                else setNotify((prev) => ({ ...prev, numOfPeople: '' }));
            }
        }

        if (checkMaxNOP && checkNumberStage) {
            updateTableApi(formTable).then((res) => {
                if (res.message === 'success') {
                    dispatch(actions.updateTable(res.updateTable));
                    dispatch(actions.setMessage({ message: 'Cập nhật thành công' }));
                    refsById[_id].current.closeModal();
                }
            });
        }
    };

    const handleSubmitDeleteTable = (e, _id, status) => {
        e.preventDefault();
        const checkStatus = status === 'empty';

        if (checkStatus) {
            deleteTableApi(_id).then((res) => {
                if (res.message === 'success') {
                    dispatch(actions.deleteTable({ _id: _id }));
                    dispatch(actions.setMessage({ message: 'Xoá thành công' }));
                    refsById[_id].current.closeModal();
                }
            });
        } else {
            dispatch(actions.setMessage({ message: 'Bàn đang được sử dụng, không thể xoá', typeMes: 'error' }));
            refsById[_id].current.closeModal();
        }
    };

    return (
        <ContentLayout title="Quản lý bàn ăn">
            <div className={cx('list-button')}>
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
                        <ModalSettingTable
                            key={index}
                            data={data}
                            notify={notify}
                            setNotify={setNotify}
                            handleSubmitUpdateTable={handleSubmitUpdateTable}
                            handleSubmitDeleteTable={handleSubmitDeleteTable}
                            ref={refsById[data._id]}
                            setting
                        >
                            <TableItem data={data} />
                        </ModalSettingTable>
                    );
                })}
            </div>
            <ModalSettingTable
                addNewTable={handleSubmitAddNewTable}
                notify={notify}
                setNotify={setNotify}
                ref={addTableRef}
            >
                <Button className={cx('btn-add-table')}>
                    <IoAdd />
                </Button>
            </ModalSettingTable>
        </ContentLayout>
    );
};

export default TableSetting;
