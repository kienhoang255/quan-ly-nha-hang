import React, { useState } from 'react';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';

const cx = classNames.bind(styles);

const Cart = ({ data, totalPrice }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);

    const handleSetModal = () => {
        setIsOpenAnimation(!isOpenAnimation);
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 150);
    };

    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleCloseModal = () => {
        setIsOpenAnimation(false);
        setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    return (
        <>
            <div className={cx('container')} onClick={handleSetModal}>
                <div>
                    <AiOutlineShoppingCart />
                    {totalPrice}
                </div>
                {/* <Button>Đặt hàng</Button> */}
            </div>
            {isOpen && (
                <div
                    className={cx('container-modal', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                    onClick={handleCloseModal}
                >
                    <div
                        className={cx('content', isOpenAnimation ? 'openContent' : 'closeContent')}
                        onClick={handleStopPropagation}
                    >
                        <Logo className={cx('logo')} />
                        <div className={cx('list-ordered')}>
                            <div className={cx('header')}>
                                <div>No.</div>
                                <div>Tên</div>
                                <div>Số lượng</div>
                                <div>Giá</div>
                            </div>
                            {data?.map((food, index) => (
                                <div className={cx('body')} key={index}>
                                    <div>{index + 1}</div>
                                    <div>{food.name}</div>
                                    <div>{food.quantity}</div>
                                    <div>{food.price * food.quantity}</div>
                                </div>
                            ))}
                            <div className={cx('footer')}>
                                <div>Tổng</div>
                                <div>{totalPrice}</div>
                            </div>
                        </div>
                        <div className={cx('action-btn')}>
                            <Button variant="outline">Đóng</Button>
                            <Button>Đặt món</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
