import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalUser.module.scss';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';
import ButtonInput from '../../ButtonInput/ButtonInput';

const cx = classNames.bind(styles);

const ModalUser = ({ children, data, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);
    const handleOnChildren = () => {
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
            {children && (
                <div className={cx('modal', { [className]: className })} onClick={handleOnChildren}>
                    {children}
                </div>
            )}
            {isOpen && (
                <div
                    className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                    onClick={handleOnChildren}
                >
                    <div
                        className={cx('main-content', isOpenAnimation ? 'openContent' : 'closeContent')}
                        onClick={handleStopPropagation}
                    >
                        <div className={cx('header-modal')}>profile</div>
                        <div className={cx('body-modal')}>
                            <div className={cx('body-modal-avatar')}>
                                <Avatar normal setting />
                                <ButtonInput type="file" value="AVATAR" className={cx('body-modal-avatar-file')} />
                            </div>
                            <div className={cx('body-modal-info')}>
                                <TextInput
                                    type={'text'}
                                    name={'username'}
                                    title={'Tên đầy đủ'}
                                    defaultValue={data.username}
                                    notify={''}
                                />
                                <TextInput
                                    type={'text'}
                                    name={'email'}
                                    title={'Email'}
                                    defaultValue={data.email}
                                    notify={''}
                                />
                                <TextInput
                                    type={'text'}
                                    name={'phone'}
                                    title={'Số điện thoại'}
                                    defaultValue={data.phone}
                                    notify={''}
                                />
                                <TextInput
                                    type={'text'}
                                    name={'phone'}
                                    title={'Công việc'}
                                    defaultValue={data.job}
                                    notify={''}
                                />
                                <TextInput
                                    type={'text'}
                                    name={'phone'}
                                    title={'Dia chi'}
                                    defaultValue={data.address}
                                    notify={''}
                                />
                            </div>
                        </div>
                        <div className={cx('footer-modal')}>
                            <Button variant="outline" onClick={handleOnChildren}>
                                CANCEL
                            </Button>
                            <Button>SAVE</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalUser;
