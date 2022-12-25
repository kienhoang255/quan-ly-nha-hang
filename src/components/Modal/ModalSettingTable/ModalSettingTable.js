import React, { forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalSettingTable.module.scss';
import TextInput from '~/components/TextInput/TextInput';
import Button from '~/components/Button/Button';
import ButtonInput from '~/components/ButtonInput/ButtonInput';

const cx = classNames.bind(styles);

const ModalSettingTable = forwardRef(
    (
        {
            className,
            onClick,
            children,
            img,
            setImg,
            addNewTable,
            data,
            notify,
            setNotify,
            setting = false,
            handleSubmitUpdateTable,
            handleSubmitDeleteTable,
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isOpenAnimation, setIsOpenAnimation] = useState(false);

        useImperativeHandle(ref, () => ({
            closeModal() {
                setIsOpenAnimation(false);
                setNotify({
                    stage: '',
                    numOfPeople: '',
                });
                setTimeout(() => {
                    setIsOpen(false);
                }, 150);
            },
        }));

        const handleOpenModal = (e) => {
            e.preventDefault();
            setNotify({
                stage: '',
                numOfPeople: '',
            });
            setIsOpenAnimation(!isOpenAnimation);
            setTimeout(() => {
                setIsOpen(!isOpen);
            }, 150);
        };
        const handleStopPropagation = (e) => {
            e.stopPropagation();
        };

        return (
            <>
                <div onClick={handleOpenModal} className={cx({ [className]: className })}>
                    {children}
                </div>
                {isOpen && (
                    <div
                        className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                        onClick={handleOpenModal}
                    >
                        <form
                            className={cx('main-content', isOpenAnimation ? 'openContent' : 'closeContent')}
                            onClick={handleStopPropagation}
                            onSubmit={setting ? (e) => handleSubmitUpdateTable(e, data._id) : addNewTable}
                            // onSubmit={(e) => {
                            //     if (setting) return handleSubmitUpdateTable(e, data._id);
                            //     else if (del) return handleSubmitDeleteTable(e, data._id, data.status);
                            //     else return addNewTable;
                            // }}
                        >
                            <div className={cx('header-modal')}>{setting ? 'Cập nhật bàn ăn' : 'Thêm bàn ăn'}</div>
                            <div className={cx('body-modal')}>
                                <TextInput
                                    name="stage"
                                    title="Tầng"
                                    notify={notify.stage}
                                    className={cx('text-input')}
                                    defaultValue={data?.stage}
                                    danger
                                />
                                <TextInput
                                    name="numOfPeople"
                                    title="Số lượng người "
                                    notify={notify.numOfPeople}
                                    className={cx('text-input')}
                                    defaultValue={data?.numOfPeople}
                                    danger
                                />
                                {/* <p className={cx('type-table')}>Loại bàn</p>
                            <SelectButton
                                title="Bình thường"
                                id={'special'}
                                name={'special'}
                                value={true}
                                defaultChecked
                            />
                            <SelectButton title="Đặc biệt" id={'normal'} name={'special'} value={false} /> */}
                            </div>
                            <div className={cx('footer-modal')}>
                                <Button variant="outline" onClick={handleOpenModal}>
                                    Hủy
                                </Button>
                                {setting && (
                                    <ButtonInput
                                        type="submit"
                                        value="Xoá"
                                        onClick={(e) => handleSubmitDeleteTable(e, data._id, data.status)}
                                    />
                                )}
                                <ButtonInput type="submit" value={setting ? 'Cập nhật' : 'Thêm'} />
                            </div>
                        </form>
                    </div>
                )}
            </>
        );
    },
);

export default ModalSettingTable;
