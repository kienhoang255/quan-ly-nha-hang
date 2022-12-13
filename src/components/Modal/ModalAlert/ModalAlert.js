import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalAlert.module.scss';
import Button from '~/components/Button/Button';
import { BiError } from 'react-icons/bi';

const cx = classNames.bind(style);

const ModalAlert = ({ children, title }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenAnimation, setIsOpenAnimation] = useState(true);
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
            {children && <div onClick={handleOpenModal}>{children}</div>}
            {isOpen && (
                <div
                    className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                    onClick={handleOpenModal}
                >
                    <div
                        className={cx('content', isOpenAnimation ? 'openContent' : 'closeContent')}
                        onClick={handleStopPropagation}
                    >
                        <BiError className={cx('icon')} />
                        <div className={cx('body')}>{title}</div>

                        <div className={cx('footer')}>
                            <Button onClick={handleOpenModal} className={cx('btn')}>
                                Đồng ý
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAlert;
