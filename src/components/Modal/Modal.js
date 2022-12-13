import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children }) => {
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
            <div onClick={handleOpenModal}>{children}</div>
            {isOpen && (
                <div
                    className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                    onClick={handleOpenModal}
                >
                    <div onClick={handleStopPropagation}></div>
                </div>
            )}
        </>
    );
};

export default Modal;
