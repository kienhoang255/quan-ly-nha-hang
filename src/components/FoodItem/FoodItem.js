import React from 'react';
import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
import Button from '../Button/Button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AiFillSetting } from 'react-icons/ai';
import ModalSettingFood from '../Modal/ModalSettingFood/ModalSettingFood';
import { formatVND } from '~/utils';

const cx = classNames.bind(styles);

const FoodItem = ({
    food,
    quantity,
    id,
    onClickAddFood,
    onClickRemoveFood,
    setting,
    handleSubmitUpdateFood,
    handleSubmitDeleteFood,
    notify,
    setNotify,
    img,
    setImg,
    refsById,
}) => {
    let amount;
    quantity.forEach((element) => {
        if (element._id === id) {
            amount = element.quantity;
        }
    });

    return (
        <div className={cx('content')}>
            <div className={cx('food-img')}>
                <img
                    className={cx('img')}
                    src={
                        food.image
                            ? food.image
                            : 'https://haidilaovietnam.com/wp-content/uploads/2022/05/set-lau-4-nguoi-1024x1024.jpg'
                    }
                    alt="123"
                />
            </div>
            <div className={cx('title')}>
                <div className={cx('food-name')}>{food?.name}</div>
                <div className={cx('food-price')}>{formatVND(food?.price)}</div>
            </div>
            {setting ? (
                <ModalSettingFood
                    ref={refsById[food._id]}
                    className={cx('action-btn')}
                    data={food}
                    handleSubmitUpdateFood={handleSubmitUpdateFood}
                    handleSubmitDeleteFood={handleSubmitDeleteFood}
                    updateFood
                    notify={notify}
                    setNotify={setNotify}
                    img={img}
                    setImg={setImg}
                >
                    <Button className={cx('setting-btn')}>
                        <AiFillSetting />
                    </Button>
                    {/* <ButtonInput value={AiFillSetting } /> */}
                </ModalSettingFood>
            ) : (
                <div className={cx('action-btn')}>
                    <Button
                        className={cx('add-btn')}
                        onClick={() => {
                            onClickRemoveFood(food);
                        }}
                    >
                        <MdKeyboardArrowLeft />
                    </Button>
                    <div className={cx('food-status')}>X{amount ? amount : 0}</div>
                    <Button
                        className={cx('add-btn')}
                        onClick={() => {
                            onClickAddFood(food);
                        }}
                    >
                        <MdKeyboardArrowRight />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FoodItem;
