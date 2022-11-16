import React from 'react';
import styles from './Missing.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const Missing = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('gif')}></div>
            <div className={cx('content')}>
                <p className={cx('err')}>ERROR 404</p>
                <p className={cx('msg')}>The page you are looking doesn't exist</p>
                <Button className={cx('btn')} to="/">
                    Home
                </Button>
            </div>
        </div>
    );
};

export default Missing;
