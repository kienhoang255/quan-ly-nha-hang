import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ListFood from '~/components/ListFood/ListFood';
import Button from '~/components/Button/Button';
import MenuLayout from '~/layout/MenuLayout/MenuLayout';
import { useStore } from '~/store';
import { sortTypeDuplicate } from '~/utils';

const cx = classNames.bind(styles);

const Menu = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Menu';
    });
    const nameButtonType = sortTypeDuplicate(state?.FOODS);

    const [type, setType] = useState(nameButtonType[0]);

    let dataMenu = [];
    const onClickType = (type) => {
        setType(type);
    };

    state?.FOODS?.forEach((food) => {
        if (food.type === type) {
            dataMenu.push(food);
        }
    });

    const typeFood = nameButtonType?.map((type) => (
        <Button key={type} variant="none" full className={cx('select-btn')} onClick={() => onClickType(type)}>
            {type}
        </Button>
    ));

    return (
        <MenuLayout title="menu" state={state.TABLESERVING}>
            <div className={cx('container')}>
                <div className={cx('select-type')}>{typeFood}</div>
                <ListFood type={type} data={dataMenu} />
            </div>
        </MenuLayout>
    );
};

export default Menu;
