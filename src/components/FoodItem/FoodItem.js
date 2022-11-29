import React from 'react';
import classNames from 'classnames/bind';
import styles from './FoodItem.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const FoodItem = ({ food }) => {
    return (
        <div className={cx('content')}>
            <div className={cx('food-img')}>
                <img
                    className={cx('img')}
                    src="https://haidilaovietnam.com/wp-content/uploads/2022/05/set-lau-4-nguoi-1024x1024.jpg"
                    alt="123"
                />
            </div>
            <div className={cx('title')}>
                <div className={cx('food-name')}>{food?.name}</div>
                <div className={cx('food-price')}>{food?.price}$</div>
                <div className={cx('food-status')}>status</div>
            </div>
            <Button className={cx('add-btn')}>ADD</Button>
        </div>
    );
};

export default FoodItem;
