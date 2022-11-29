import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListFood.module.scss';
import FoodItem from '../FoodItem/FoodItem';

const cx = classNames.bind(styles);

const ListFood = ({ type, data }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('food-type')}>{type}</div>
            <div className={cx('food-list')}>
                {data?.map((food) => (
                    <FoodItem food={food} />
                ))}
            </div>
        </div>
    );
};

export default ListFood;
