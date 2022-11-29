import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalClientCheckIn.module.scss';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const ClientCheckIn = ({ children, className, onSubmit, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);
    const handleOnChildren = () => {
        setIsOpenAnimation(!isOpenAnimation);
        onClick();
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 150);
    };

    const closeModal = () => {
        setIsOpenAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
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
                    onClick={closeModal}
                >
                    <div
                        className={cx('content', isOpenAnimation ? 'openContent' : 'closeContent')}
                        onClick={handleStopPropagation}
                    >
                        <div className={cx('title')}>check in</div>
                        <form onSubmit={onSubmit}>
                            <TextInput type="text" name="email" placeholder="Email/Phone..." notify={''} />
                            <Button variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button>Check In</Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClientCheckIn;
