import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ListFood from '~/components/ListFood/ListFood';
import Button from '~/components/Button/Button';
import MenuLayout from '~/layout/MenuLayout/MenuLayout';
import { actions, useStore } from '~/store';
import { sortTypeDuplicate } from '~/utils';
import CartOrder from '~/components/CartOrder/CartOrder';
import { checkFoodOrderApi, orderFoodApi } from '~/services/foodOrder';
import { checkOutApi } from '~/services/bill';
import { getClientApi } from '~/services/client';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Menu = () => {
    useEffect(() => {
        document.title = 'Menu';
    });
    const [state, dispatch] = useStore();
    const [billDetail, setBillDetail] = useState({
        email: '',
        FODetail: [],
        timeStart: '',
        timeEnd: '',
        total: '',
    });
    const [alertModal, setAlertModal] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let dataMenu = [];
    const [nameButtonType, setNameButtonType] = useState(sortTypeDuplicate(state?.FOODS));
    const [type, setType] = useState(nameButtonType[0]);

    const onClickType = (typeSel) => {
        setType(typeSel);

        setNameButtonType((prev) =>
            prev.map((e) => {
                if (e?.type === typeSel?.type) {
                    return { ...e, active: true };
                }
                return { ...e, active: false };
            }),
        );
    };

    useMemo(() => {
        state?.FOODS?.forEach((food) => {
            if (food.type === type.type) {
                dataMenu.push(food);
            }
        });
    }, [dataMenu, state?.FOODS, type?.type]);

    const addFood = (food) => {
        dispatch(actions.addFoodSelected(food));
    };

    const removeFood = (food) => {
        dispatch(actions.removeFoodSelected(food));
    };
    const clickBack = () => {
        dispatch(actions.clearFoodSelected());
    };

    //order food
    const handleOrderFood = () => {
        let foods = [];
        state.FOODSELECTED.forEach((food) => {
            foods.push({ id_food: food._id, quantity: food.quantity, price: food.price });
        });
        let data = { id_table: state.TABLESERVING._id, id_bill: state.TABLESERVING.id_bill[0], foods: foods };
        orderFoodApi(data);
        dispatch(actions.clearFoodSelected());
    };

    //check bill
    const handleCheckFoodOrder = async () => {
        let detail = [];
        var id_client;
        var timeStart;
        var timeEnd;
        const promise1 = state?.BILLS?.forEach((bill) => {
            if (bill?._id === state?.TABLESERVING?.id_bill[0]) {
                id_client = bill?.id_client;
                timeStart = moment(bill?.createdAt).format('DD/MM/YYYY HH:mm');
                timeEnd = moment(bill?.updatedAt).format('DD/MM/YYYY HH:mm');
            }
        });
        const info = await getClientApi(id_client);
        const promise2 = checkFoodOrderApi(state.TABLESERVING?.id_bill).then((res) => {
            res.forEach((detailRes) => {
                state.FOODS.forEach((detailFood) => {
                    if (detailRes.id_food === detailFood._id)
                        detail.push({
                            name: detailFood.name,
                            quantity: detailRes.quantity,
                            price: detailFood.price,
                            status: detailRes.status,
                        });
                });
            });
        });

        Promise.all([info, promise1, promise2]).then(() => {
            setBillDetail({ email: info.email || info.phone, timeStart, timeEnd, FODetail: detail });
        });
    };

    //Client check out
    const from = '/list-table';
    const navigate = useNavigate();
    const handleCheckOut = () => {
        const find = billDetail.FODetail.find((e) => e.status === 'cooking');
        if (!find) {
            checkOutApi(dispatch, { id_bill: state.TABLESERVING.id_bill[0] }).then(() =>
                navigate(from, { replace: true }),
            );
        } else {
            setAlertModal(true);
        }
    };

    useMemo(() => {
        handleCheckFoodOrder();
    }, []);

    let totalPrice = state.FOODSELECTED?.reduce((sum, current) => sum + current.price * current.quantity, 0);
    return (
        <MenuLayout title="thực đơn" nameClient={billDetail.email} onClickBack={clickBack}>
            <div className={cx('container')}>
                <div className={cx('select-type')}>
                    {nameButtonType?.map((type) => (
                        <Button
                            key={type?.type}
                            variant="none"
                            full
                            className={cx('select-btn')}
                            onClick={() => onClickType(type)}
                            active={type?.active}
                        >
                            {type?.type}
                        </Button>
                    ))}
                </div>
                <ListFood
                    cart={true}
                    handleCheckFoodOrder={handleCheckFoodOrder}
                    type={type?.type}
                    data={dataMenu}
                    quantity={state.FOODSELECTED}
                    onClickAddFood={addFood}
                    onClickRemoveFood={removeFood}
                    handleCheckOut={handleCheckOut}
                    billDetail={billDetail}
                    alertModal={alertModal}
                />
                <CartOrder
                    data={state.FOODSELECTED}
                    totalPrice={totalPrice ? totalPrice : 0}
                    handleOrderFood={handleOrderFood}
                    onClickAddFood={addFood}
                    onClickRemoveFood={removeFood}
                />
            </div>
        </MenuLayout>
    );
};

export default Menu;
