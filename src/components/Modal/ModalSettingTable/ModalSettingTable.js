import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalSettingTable.module.scss';
import TextInput from '~/components/TextInput/TextInput';
import Button from '~/components/Button/Button';
import RadioButton from '~/components/RadioButton/RadioButton';

const cx = classNames.bind(styles);

const ModalSettingTable = ({ className, onClick, children, img, setImg, addNewTable, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);
    const handleOpenModal = (e) => {
        e.preventDefault();
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
                        onSubmit={addNewTable}
                    >
                        <div className={cx('header-modal')}>{data ? 'Cập nhật bàn ăn' : 'Thêm bàn ăn'}</div>
                        <div className={cx('body-modal')}>
                            <TextInput
                                name="stage"
                                title="Tầng"
                                notify={''}
                                className={cx('text-input')}
                                defaultValue={data?.stage}
                            />
                            <TextInput
                                name="numOfPeople"
                                title="Số lượng người "
                                notify={''}
                                className={cx('text-input')}
                                defaultValue={data?.numOfPeoples}
                            />
                            <p className={cx('type-table')}>Loại bàn</p>
                            <RadioButton
                                title="Bình thường"
                                id={'special'}
                                name={'special'}
                                value={true}
                                defaultChecked
                            />
                            <RadioButton title="Đặc biệt" id={'normal'} name={'special'} value={false} />
                        </div>
                        <div className={cx('footer-modal')}>
                            <Button variant="outline" onClick={handleOpenModal}>
                                Hủy
                            </Button>
                            <Button>Đồng ý</Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ModalSettingTable;
