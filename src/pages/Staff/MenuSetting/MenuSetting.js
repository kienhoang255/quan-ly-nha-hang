import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuSetting.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import { useStore } from '~/store';
import { sortTypeDuplicate } from '~/utils';
import Button from '~/components/Button/Button';
import ListFood from '~/components/ListFood/ListFood';
import { IoAdd } from 'react-icons/io5';
import ModalSettingFood from '~/components/Modal/ModalSettingFood/ModalSettingFood';
import { addFood } from '~/services/food';

const cx = classNames.bind(styles);

const MenuSetting = () => {
    const [state, dispatch] = useStore();
    useEffect(() => {
        document.title = 'Menu setting';
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

    //food form
    const [img, setImg] = useState();
    const handleSubmitAddNewFood = (e) => {
        e.preventDefault();
        const getData = new FormData(e.target);
        getData.append('image', img);
        const formFood = Object.fromEntries(getData.entries());
        addFood(formFood);
    };

    const handleSubmitUpdateFood = () => {};

    return (
        <ContentLayout title="Quản lý thực đơn">
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
                <ListFood type={type?.type} data={dataMenu} quantity={state.FOODSELECTED} setting />
            </div>
            <ModalSettingFood img={img} setImg={setImg} addNewFood={handleSubmitAddNewFood}>
                <Button className={cx('btn-add-table')}>
                    <IoAdd />
                </Button>
            </ModalSettingFood>
        </ContentLayout>
    );
};

export default MenuSetting;
