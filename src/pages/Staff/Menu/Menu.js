import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ListFood from '~/components/ListFood/ListFood';
import Button from '~/components/Button/Button';
import MenuLayout from '~/layout/MenuLayout/MenuLayout';
import { actions, useStore } from '~/store';
import { sortTypeDuplicate } from '~/utils';
import Cart from '~/components/Cart/Cart';
import TextInput from '~/components/TextInput/TextInput';

const cx = classNames.bind(styles);

const Menu = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Menu';
    });

    const [nameButtonType, setNameButtonType] = useState(sortTypeDuplicate(state?.FOODS));

    const [type, setType] = useState(nameButtonType[0]);

    useEffect(() => {
        onClickType(type);
    }, []);
    let dataMenu = [];
    const onClickType = (typeSel) => {
        setType(typeSel);

        setNameButtonType((prev) =>
            prev.map((e) => {
                if (e.type === typeSel.type) {
                    return { ...e, active: true };
                }
                return { ...e, active: false };
            }),
        );
    };

    state?.FOODS?.forEach((food) => {
        if (food.type === type.type) {
            dataMenu.push(food);
        }
    });

    const addFood = (food) => {
        dispatch(actions.addFoodSelected(food));
    };

    const removeFood = (food) => {
        dispatch(actions.removeFoodSelected(food));
    };
    const clickBack = () => {
        dispatch(actions.clearFoodSelected());
    };

    let totalPrice = state.FOODSELECTED?.reduce((sum, current) => sum + current.price * current.quantity, 0);
    return (
        <MenuLayout title="menu" state={state.TABLESERVING} onClickBack={clickBack}>
            <div className={cx('container')}>
                <div className={cx('select-type')}>
                    {nameButtonType?.map((type) => (
                        <Button
                            key={type.type}
                            variant="none"
                            full
                            className={cx('select-btn')}
                            onClick={() => onClickType(type)}
                            active={type.active}
                        >
                            {type.type}
                        </Button>
                    ))}
                </div>
                <ListFood
                    type={type?.type}
                    data={dataMenu}
                    quantity={state.FOODSELECTED}
                    onClickAddFood={addFood}
                    onClickRemoveFood={removeFood}
                />
                <Cart data={state.FOODSELECTED} totalPrice={totalPrice ? totalPrice : 0} />
            </div>
        </MenuLayout>
    );
};

export default Menu;
