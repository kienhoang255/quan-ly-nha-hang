import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListFood.module.scss';
import FoodItem from '../FoodItem/FoodItem';

const cx = classNames.bind(styles);

const ListFood = ({ type, data, quantity, onClickAddFood, onClickRemoveFood, setting }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('food-type')}>{type}</div>
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
                    />
                ))}
                <div>123</div>
            </div>
        </div>
    );
};

export default ListFood;
