import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalMenu.module.scss';
import { TfiArrowCircleDown, TfiArrowCircleUp } from 'react-icons/tfi';
import FileBase64 from 'react-file-base64';
import TextInput from '~/components/TextInput/TextInput';
import Button from '~/components/Button/Button';
import TableFood from '~/components/Table/TableFood/TableFood';

const cx = classNames.bind(styles);

const ModalMenu = () => {
    const [isMenu, setIsMenu] = useState(false);

    const handleOnMenu = () => {
        setIsMenu(!isMenu);
    };
    return (
        <>
            <div className={cx('menu')} onClick={handleOnMenu}>
                Thực đơn
                <span className={cx('menu-icon')}>{isMenu ? <TfiArrowCircleUp /> : <TfiArrowCircleDown />}</span>
            </div>
            {isMenu && (
                <div className={cx('menu-container')}>
                    <form className={cx('form-food')}>
                        <div className={cx('preview-img')}>
                            <img src="" alt="" />
                            <FileBase64 />
                            <TextInput title="Tên món ăn" notify={''} className={cx('text-input')} />
                            <TextInput title="Giá" notify={''} className={cx('text-input')} />
                            <TextInput title="Mô tả" notify={''} className={cx('text-input')} />
                            <Button variant="outline">Hủy</Button>
                            <Button>Thêm</Button>
                        </div>
                    </form>
                    <TableFood />
                </div>
            )}
        </>
    );
};

export default ModalMenu;
