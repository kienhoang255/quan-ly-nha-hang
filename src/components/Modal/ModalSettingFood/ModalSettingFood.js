import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalSettingFood.module.scss';
import Button from '~/components/Button/Button';

import FileBase64 from 'react-file-base64';
import TextInput from '~/components/TextInput/TextInput';

const cx = classNames.bind(styles);

const ModalSettingFood = ({ className, onClick, children, img, setImg, addNewFood, data }) => {
    const imgPlaceHolder = require('~/assets/images/placeholder-400x400.png');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);
    const handleOpenModal = (e) => {
        e.preventDefault();
        setIsOpenAnimation(!isOpenAnimation);
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 150);
        setImg('');
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
                        onSubmit={addNewFood}
                    >
                        <div className={cx('header-modal')}>{data ? 'Cập nhật món ăn' : 'Thêm món ăn'}</div>
                        <div className={cx('body-modal')}>
                            <span className={cx('img-content')}>
                                <img
                                    src={img ? img : data ? data.image : imgPlaceHolder}
                                    alt=""
                                    className={cx('img')}
                                />
                                <FileBase64
                                    multiple={true}
                                    onDone={(base64) => {
                                        setImg(base64[0].base64);
                                    }}
                                />
                            </span>

                            <div>
                                <TextInput
                                    name="name"
                                    title="Tên món ăn"
                                    notify={''}
                                    className={cx('text-input')}
                                    defaultValue={data?.name}
                                />
                                <TextInput
                                    name="type"
                                    title="Loại"
                                    notify={''}
                                    className={cx('text-input')}
                                    defaultValue={data?.type}
                                />
                                <TextInput
                                    name="price"
                                    title="Giá"
                                    notify={''}
                                    className={cx('text-input')}
                                    defaultValue={data?.price}
                                />
                                <TextInput
                                    name="description"
                                    title="Mô tả"
                                    notify={''}
                                    className={cx('text-input')}
                                    defaultValue={data?.description}
                                />
                            </div>
                        </div>
                        <div className={cx('footer-modal')}>
                            <Button variant="outline" onClick={handleOpenModal}>
                                CANCEL
                            </Button>
                            <Button>SAVE</Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ModalSettingFood;
