import React, { forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalSettingFood.module.scss';
import Button from '~/components/Button/Button';

import FileBase64 from 'react-file-base64';
import TextInput from '~/components/TextInput/TextInput';
import PopUp from '../../PopUpMessage/PopUpMessage';
import ButtonInput from '~/components/ButtonInput/ButtonInput';

const cx = classNames.bind(styles);

const ModalSettingFood = forwardRef(
    (
        {
            className,
            onClick,
            children,
            img,
            setImg,
            addNew = false,
            addNewFood,
            data,
            updateFood = false,
            handleSubmitUpdateFood,
            handleSubmitDeleteFood,
            notify,
            setNotify,
        },
        ref,
    ) => {
        const imgPlaceHolder = require('~/assets/images/placeholder-400x400.png');
        const [isOpen, setIsOpen] = useState(false);
        const [isOpenAnimation, setIsOpenAnimation] = useState(false);

        useImperativeHandle(ref, () => ({
            closeModal() {
                setIsOpenAnimation(!isOpenAnimation);
                setNotify({
                    name: '',
                    type: '',
                    price: '',
                    desc: '',
                    img: '',
                });
                setImg('');
                setTimeout(() => {
                    setIsOpen(!isOpen);
                }, 150);
            },
        }));

        const handleOpenModal = (e) => {
            e.preventDefault();
            setIsOpenAnimation(!isOpenAnimation);
            setNotify({
                name: '',
                type: '',
                price: '',
                desc: '',
                img: '',
            });
            setImg('');
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
                            onSubmit={addNew ? addNewFood : (e) => handleSubmitUpdateFood(e, data._id, data.image)}
                        >
                            <div className={cx('header-modal')}>{data ? 'Cập nhật món ăn' : 'Thêm món ăn'}</div>
                            <div className={cx('body-modal')}>
                                <PopUp pm="left" notify={notify.img} danger>
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
                                </PopUp>

                                <div>
                                    <TextInput
                                        name="name"
                                        title="Tên món ăn"
                                        notify={notify.name}
                                        className={cx('text-input')}
                                        defaultValue={data?.name}
                                        danger
                                    />
                                    <TextInput
                                        name="type"
                                        title="Loại"
                                        notify={notify.type}
                                        className={cx('text-input')}
                                        defaultValue={data?.type}
                                        danger
                                    />
                                    <TextInput
                                        name="price"
                                        title="Giá"
                                        notify={notify.price}
                                        className={cx('text-input')}
                                        defaultValue={data?.price}
                                        danger
                                    />
                                    <TextInput
                                        name="description"
                                        title="Mô tả"
                                        notify={notify.desc}
                                        className={cx('text-input')}
                                        defaultValue={data?.description}
                                        danger
                                    />
                                </div>
                            </div>
                            <div className={cx('footer-modal')}>
                                <Button variant="outline" onClick={handleOpenModal}>
                                    Huỷ
                                </Button>
                                {updateFood && (
                                    <ButtonInput
                                        type="button"
                                        value="Xoa"
                                        onClick={() => handleSubmitDeleteFood(data._id)}
                                    />
                                )}
                                {addNew ? <Button>Thêm</Button> : <Button>Cập nhật</Button>}
                            </div>
                        </form>
                    </div>
                )}
            </>
        );
    },
);

export default ModalSettingFood;
