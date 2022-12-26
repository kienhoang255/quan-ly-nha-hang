import React, { forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalClientCheckIn.module.scss';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

const cx = classNames.bind(styles);

const ModalClientCheckIn = forwardRef(({ children, className, onSubmit, onClick, notify, setNotify }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);

    useImperativeHandle(ref, () => ({
        closeModal() {
            handleOnChildren();
        },
    }));

    const handleOnChildren = () => {
        setIsOpenAnimation(!isOpenAnimation);
        onClick();
        setNotify('');
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
                        <form onSubmit={onSubmit} className={cx('form')}>
                            <TextInput
                                type="text"
                                name="email"
                                placeholder="Email/Phone..."
                                notify={notify}
                                className={cx('text')}
                            />
                            <Button variant="outline" onClick={closeModal}>
                                Hủy
                            </Button>
                            <Button>Check in</Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
});

export default ModalClientCheckIn;
