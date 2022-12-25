import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderedList.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import Button from '~/components/Button/Button';
import { useStore } from '~/store';
import { updateFoodCancelApi, updateFoodServedApi } from '~/services/foodOrder';
import moment from 'moment';

const cx = classNames.bind(styles);

const OrderedList = () => {
    const [state, dispatch] = useStore();
    const [filter, setFilter] = useState('cooking');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let FO = [];
    useEffect(() => {
        document.title = 'Danh sách đặt món';
    });

    useMemo(() => {
        state?.FOODS.forEach((element) => {
            state.FOOD_ORDERED?.forEach((elementFO) => {
                if (element._id === elementFO.id_food) {
                    FO.push({
                        _id: elementFO._id,
                        name: element.name,
                        image: element.image,
                        quantity: elementFO.quantity,
                        status: elementFO.status,
                        time: moment(elementFO.createdAt).format('HH:mm:ss'),
                    });
                }
            });
        });
    }, [FO, state?.FOODS, state.FOOD_ORDERED]);

    const handleServed = (data) => {
        updateFoodServedApi({ id_foodOrdered: data });
    };

    const handleCancel = (data) => {
        updateFoodCancelApi({ id_foodOrdered: data });
    };

    return (
        <ContentLayout title={'Danh sách đặt món'}>
            <div className={cx('container')}>
                <div className={cx('order-title')}>
                    <div className={cx('order-title-name')}>tên món ăn</div>
                    <div className={cx('order-title-quantity')}>số lượng</div>
                    <div className={cx('order-title-note')}>thời gian đặt</div>
                    <div className={cx('order-title-status')}>trạng thái</div>
                    <div className={cx('order-title-buttons-action')}>
                        <Button className={cx('btn-filter-cooking')} onClick={() => setFilter('cooking')}>
                            Cook
                        </Button>
                        <Button className={cx('btn-filter-served')} onClick={() => setFilter('served')}>
                            Served
                        </Button>
                        <Button className={cx('btn-filter-cancel')} onClick={() => setFilter('cancel')}>
                            Cancel
                        </Button>
                    </div>
                </div>
                <div className={cx('wrap')}>
                    {FO?.filter((e) => e.status === filter)
                        ?.sort((a, b) => a.time.localeCompare(b.time))
                        .map((e, key) => (
                            <div className={cx('order-item')} key={key}>
                                <img className={cx('order-item-image')} src={e.image} alt="" />
                                <div className={cx('order-item-name')}>{e.name}</div>
                                <div className={cx('order-item-quantity')}>{e.quantity}</div>
                                <div className={cx('order-item-note')}>{e?.time}</div>
                                <div className={cx('order-item-status', `${e.status}`)}>{e.status}</div>
                                <div className={cx('order-item-buttons-action')}>
                                    <Button
                                        variant="outline"
                                        className={cx('btn-cancel')}
                                        onClick={() => handleCancel(e._id)}
                                        disable={e.status === 'served' || e.status === 'cancel'}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button
                                        className={cx('btn-confirm')}
                                        onClick={() => handleServed(e._id)}
                                        disable={e.status === 'served' || e.status === 'cancel'}
                                    >
                                        Hoàn thành
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </ContentLayout>
    );
};

export default OrderedList;
