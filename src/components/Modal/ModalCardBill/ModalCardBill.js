import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalCardBill.module.scss';
import Button from '~/components/Button/Button';
import CartOrder from '~/components/CartOrder/CartOrder';
import Logo from '~/components/Logo/Logo';
import ModalAlert from '../ModalAlert/ModalAlert';
import { formatVND } from '~/utils';

const cx = classNames.bind(styles);

const ModalCardBill = ({ children, className, handleCheckFoodOrder, handleCheckOut, billDetail, alertModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAnimation, setIsOpenAnimation] = useState(false);
    const handleOpenModal = () => {
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
            <div
                onClick={() => {
                    handleOpenModal();
                    handleCheckFoodOrder();
                }}
                className={cx({ [className]: className })}
            >
                {children}
            </div>
            {isOpen && (
                <div
                    className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                    onClick={handleOpenModal}
                >
                    <div
                        onClick={handleStopPropagation}
                        className={cx('content', isOpenAnimation ? 'openContent' : 'closeContent')}
                    >
                        <div className={cx('header')}>
                            <Logo className={cx('logo')} />
                            <div className={cx('info')}>
                                <div>
                                    Email/SDT: <span className={cx('detail')}>{billDetail?.email}</span>
                                </div>
                                <div>
                                    Thời gian bắt đầu: <span className={cx('detail')}>{billDetail?.timeStart}</span>
                                </div>
                                <div>
                                    Thời gian kết thúc <span className={cx('detail')}>{billDetail?.timeEnd}</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('list-title')}>
                                <div className={cx('list-title-num')}> No.</div>
                                <div className={cx('list-title-name')}>Tên</div>
                                <div className={cx('list-title-quantity')}>Số lượng</div>
                                <div className={cx('list-title-status')}>Trạng thái</div>
                                <div className={cx('list-title-price')}>Giá</div>
                            </div>
                            <div className={cx('wrap')}>
                                {billDetail?.FODetail?.map((e, key) => (
                                    <div className={cx('item')} key={key}>
                                        <div className={cx('item-num')}> {key + 1}</div>
                                        <div className={cx('item-name')}> {e?.name}</div>
                                        <div className={cx('item-quantity')}>{e?.quantity}</div>
                                        <div className={cx('item-status', `${e.status}`)}>{e?.status}</div>
                                        <div className={cx('item-price')}>{formatVND(e?.price * e?.quantity)}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('total')}>
                                <div>Tổng</div>
                                <div>
                                    {formatVND(
                                        billDetail.FODetail.reduce(
                                            (sum, current) => sum + current.price * current.quantity,
                                            0,
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <Button variant="outline" onClick={handleOpenModal}>
                                Hủy
                            </Button>
                            {alertModal ? (
                                <ModalAlert title={'Vẫn còn đồ ăn chưa được phục vụ'}>
                                    <Button onClick={handleCheckOut}>Thanh toán</Button>
                                </ModalAlert>
                            ) : (
                                <Button onClick={handleCheckOut}>Thanh toán</Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCardBill;
