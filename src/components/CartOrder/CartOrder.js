import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { formatVND } from '~/utils';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const cx = classNames.bind(styles);

const CartOrder = ({ data, totalPrice, handleOrderFood, onClickAddFood, onClickRemoveFood }) => {
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
                <AiOutlineShoppingCart />
                {formatVND(totalPrice)}
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
                            <div className={cx('body')}>
                                {data?.map((food, index) => (
                                    <div className={cx('item')} key={index}>
                                        <div className={cx('item-num')}>{index + 1}</div>
                                        <div className={cx('item-name')}>{food?.name}</div>
                                        <div className={cx('item-quantity')}>
                                            <Button
                                                className={cx('item-quantity-btn')}
                                                onClick={() => onClickRemoveFood(food)}
                                            >
                                                <MdKeyboardArrowLeft />
                                            </Button>
                                            {food?.quantity}
                                            <Button
                                                className={cx('item-quantity-btn')}
                                                onClick={() => onClickAddFood(food)}
                                            >
                                                <MdKeyboardArrowRight />
                                            </Button>
                                        </div>
                                        <div className={cx('item-total')}>
                                            {formatVND(food?.price * food?.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('footer')}>
                                <div>Tổng</div>
                                <div>{formatVND(totalPrice)}</div>
                            </div>
                        </div>
                        <div className={cx('action-btn')}>
                            <Button variant="outline" onClick={handleSetModal}>
                                Đóng
                            </Button>
                            <Button
                                onClick={() => {
                                    handleSetModal();
                                    handleOrderFood();
                                }}
                            >
                                Đặt món
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartOrder;
