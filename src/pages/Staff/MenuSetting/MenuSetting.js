import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuSetting.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import { actions, useStore } from '~/store';
import { sortTypeDuplicate } from '~/utils';
import Button from '~/components/Button/Button';
import ListFood from '~/components/ListFood/ListFood';
import { IoAdd } from 'react-icons/io5';
import ModalSettingFood from '~/components/Modal/ModalSettingFood/ModalSettingFood';
import { addFoodApi, deleteFoodApi, updateFoodApi } from '~/services/food';
import isEmpty from '~/validation/isEmpty';

const cx = classNames.bind(styles);

const MenuSetting = () => {
    const [state, dispatch] = useStore();
    const addFoodRef = useRef();
    const refsById = useMemo(() => {
        const refs = {};
        state?.FOODS.forEach((item) => {
            refs[item._id] = React.createRef(null);
        });
        return refs;
    }, [state?.FOODS]);
    useEffect(() => {
        document.title = 'Quản lý thực đơn';
    });
    const [notify, setNotify] = useState({
        name: '',
        type: '',
        price: '',
        desc: '',
        img: '',
    });
    const [nameButtonType, setNameButtonType] = useState(sortTypeDuplicate(state?.FOODS));
    const [type, setType] = useState(nameButtonType[0]);
    useEffect(() => {
        onClickType(type);
    }, []);
    useEffect(() => {
        setNameButtonType(sortTypeDuplicate(state?.FOODS));
    }, [state.FOODS]);
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

    useMemo(() => {
        state?.FOODS?.forEach((food) => {
            if (food.type === type.type) {
                dataMenu.push(food);
            }
        });
    }, [dataMenu, state?.FOODS, type?.type]);

    //food form
    const [img, setImg] = useState();
    const handleSubmitAddNewFood = (e) => {
        e.preventDefault();
        const getData = new FormData(e.target);
        getData.append('image', img);
        const formFood = Object.fromEntries(getData.entries());

        const checkEmptyName = isEmpty(formFood, 'name');
        const checkEmptyType = isEmpty(formFood, 'type');
        const checkEmptyPrice = isEmpty(formFood, 'price');
        const checkEmptyDesc = isEmpty(formFood, 'description');
        const checkEmptyImg = isEmpty(formFood, 'image');

        const checkNum = Number(formFood.price);

        if (!checkEmptyName) setNotify((prev) => ({ ...prev, name: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, name: '' }));

        if (!checkEmptyType) setNotify((prev) => ({ ...prev, type: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, type: '' }));

        if (!checkEmptyPrice) setNotify((prev) => ({ ...prev, price: 'Không được để trống' }));
        else {
            if (!checkNum) {
                setNotify((prev) => ({ ...prev, price: 'Đây không phải số' }));
            } else setNotify((prev) => ({ ...prev, price: '' }));
        }

        if (!checkEmptyDesc) setNotify((prev) => ({ ...prev, desc: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, desc: '' }));

        if (!checkEmptyImg) setNotify((prev) => ({ ...prev, img: 'Chưa chọn ảnh' }));
        else setNotify((prev) => ({ ...prev, img: '' }));

        if (checkEmptyType && checkNum && checkEmptyName && checkEmptyDesc && checkEmptyImg) {
            addFoodApi(formFood).then((res) => {
                if (res.message === 'success') {
                    addFoodRef.current.closeModal();
                    dispatch(actions.setMessage({ message: 'Thêm thành công' }));
                    dispatch(actions.addFood(res.createFood));
                }
            });
        }
    };

    const handleSubmitUpdateFood = (e, _id, image) => {
        e.preventDefault();

        const formFood = Object.fromEntries(new FormData(e.target).entries());
        const data = {
            _id,
            image: img || image,
            name: formFood.name,
            type: formFood.type,
            price: formFood.price,
            description: formFood.description,
        };

        const checkEmptyName = isEmpty(formFood, 'name');
        const checkEmptyType = isEmpty(formFood, 'type');
        const checkEmptyPrice = isEmpty(formFood, 'price');
        const checkEmptyDesc = isEmpty(formFood, 'description');
        const checkEmptyImg = isEmpty(formFood, 'image');
        const checkNum = Number(formFood.price);

        const checkChange = () => {
            let result = false;
            const rawData = state.FOODS.filter((e) => e._id === _id)[0];
            if (
                data.image !== rawData.image ||
                data.name !== rawData.name ||
                data.type !== rawData.type ||
                Number(data.price) !== Number(rawData.price) ||
                data.description !== rawData.description
            ) {
                result = true;
            }
            return result;
        };

        if (!checkEmptyName) setNotify((prev) => ({ ...prev, name: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, name: '' }));

        if (!checkEmptyType) setNotify((prev) => ({ ...prev, type: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, type: '' }));

        if (!checkEmptyPrice) setNotify((prev) => ({ ...prev, price: 'Không được để trống' }));
        else {
            if (!checkNum) {
                setNotify((prev) => ({ ...prev, price: 'Đây không phải số' }));
            } else setNotify((prev) => ({ ...prev, price: '' }));
        }

        if (!checkEmptyDesc) setNotify((prev) => ({ ...prev, desc: 'Không được để trống' }));
        else setNotify((prev) => ({ ...prev, desc: '' }));

        if (!checkEmptyImg) setNotify((prev) => ({ ...prev, img: 'Chưa chọn ảnh' }));
        else setNotify((prev) => ({ ...prev, img: '' }));

        if (checkEmptyType && checkNum && checkEmptyName && checkEmptyDesc && checkEmptyImg) {
            if (checkChange()) {
                updateFoodApi(data).then((res) => {
                    if (res.message === 'success') {
                        dispatch(actions.updateFood(res.updateFood));
                        refsById[_id].current.closeModal();
                        dispatch(actions.setMessage({ message: 'Cập nhật thành công' }));
                    }
                });
            } else {
                refsById[_id].current.closeModal();
            }
        }
    };

    const handleSubmitDeleteFood = (_id) => {
        deleteFoodApi(_id).then((res) => {
            if (res.message === 'success') {
                dispatch(actions.deleteFood(res.deleteFood));
                refsById[_id].current.closeModal();
                dispatch(actions.setMessage({ message: 'Xoá thành công' }));
            }
        });
    };

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
                <ListFood
                    type={type?.type}
                    data={dataMenu}
                    quantity={state.FOODSELECTED}
                    handleSubmitUpdateFood={handleSubmitUpdateFood}
                    handleSubmitDeleteFood={handleSubmitDeleteFood}
                    notify={notify}
                    setNotify={setNotify}
                    img={img}
                    setImg={setImg}
                    refsById={refsById}
                    setting
                />
            </div>
            <ModalSettingFood
                ref={addFoodRef}
                img={img}
                setImg={setImg}
                addNewFood={handleSubmitAddNewFood}
                addNew={true}
                notify={notify}
                setNotify={setNotify}
            >
                <Button className={cx('btn-add-table')}>
                    <IoAdd />
                </Button>
            </ModalSettingFood>
        </ContentLayout>
    );
};

export default MenuSetting;
