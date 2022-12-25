import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListFood.module.scss';
import FoodItem from '../FoodItem/FoodItem';
import { FaShoppingCart } from 'react-icons/fa';
import ModalCardBill from '../Modal/ModalCardBill/ModalCardBill';

const cx = classNames.bind(styles);

const ListFood = ({
    type,
    data,
    quantity,
    onClickAddFood,
    onClickRemoveFood,
    setting,
    handleCheckFoodOrder,
    cart = false,
    handleCheckOut,
    billDetail,
    alertModal,
    handleSubmitUpdateFood,
    handleSubmitDeleteFood,
    notify,
    setNotify,
    img,
    setImg,
    refsById,
}) => {
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <p className={cx('food-type')}>{type}</p>
                {cart && (
                    <ModalCardBill
                        className={cx('icon')}
                        handleCheckFoodOrder={handleCheckFoodOrder}
                        handleCheckOut={handleCheckOut}
                        billDetail={billDetail}
                        alertModal={alertModal}
                    >
                        <FaShoppingCart />
                    </ModalCardBill>
                )}
            </div>
            <div className={cx('food-list')}>
                {data?.map((food) => (
                    <FoodItem
                        key={food._id}
                        id={food._id}
                        quantity={quantity}
                        food={food}
                        setting={setting}
                        onClickAddFood={onClickAddFood}
                        onClickRemoveFood={onClickRemoveFood}
                        handleSubmitUpdateFood={handleSubmitUpdateFood}
                        handleSubmitDeleteFood={handleSubmitDeleteFood}
                        notify={notify}
                        setNotify={setNotify}
                        img={img}
                        setImg={setImg}
                        refsById={refsById}
                    />
                ))}
                <div>123</div>
            </div>
        </div>
    );
};

export default ListFood;
