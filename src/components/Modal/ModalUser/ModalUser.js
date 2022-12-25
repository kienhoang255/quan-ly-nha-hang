import React, { forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalUser.module.scss';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';
import ButtonInput from '../../ButtonInput/ButtonInput';
import SelectButton from '~/components/SelectButton/SelectButton';
import { imageToBase64 } from '~/utils/imageToBase64';

const cx = classNames.bind(styles);

const ModalUser = forwardRef(
    (
        {
            children,
            data,
            className,
            submitUpdateEmployee,
            submitDeleteEmployee,
            notify,
            setNotify,
            submitCreateNew,
            looking = false,
            addNew = false,
            imageSel,
            setImageSel,
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isOpenAnimation, setIsOpenAnimation] = useState(false);
        useImperativeHandle(ref, () => ({
            closeModal() {
                setIsOpenAnimation(false);
                setNotify({
                    username: '',
                    email: '',
                    phone: '',
                });
                if (setImageSel) {
                    setImageSel('');
                }
                setTimeout(() => {
                    setIsOpen(false);
                }, 150);
            },
        }));
        const handleOnChildren = () => {
            setIsOpenAnimation(!isOpenAnimation);
            if (!looking) {
                setNotify({
                    username: '',
                    email: '',
                    phone: '',
                });
            }
            if (setImageSel) {
                setImageSel('');
            }
            setTimeout(() => {
                setIsOpen(!isOpen);
            }, 150);
        };

        const handleStopPropagation = (e) => {
            e.stopPropagation();
        };

        const checkBoxData = [
            { title: 'Xem bàn', id: 'table', name: 'table' },
            { title: 'Quản lý bàn', id: 'Mtable', name: 'Mtable' },
            { title: 'Xem menu', id: 'menu', name: 'menu' },
            { title: 'Quản lý menu', id: 'Mmenu', name: 'Mmenu' },
            { title: 'Xem nhân viên', id: 'employee', name: 'employee' },
            { title: 'Quản lý nhân viên', id: 'Memployee', name: 'Memployee' },
            { title: 'Xem món đã đặt', id: 'FO', name: 'FO' },
            { title: 'Quản lý món đã đặt', id: 'MFO', name: 'MFO' },
            { title: 'Xem danh sách đặt bàn', id: 'booking', name: 'booking' },
            { title: 'Quản lý danh sách đặt bàn', id: 'Mbooking', name: 'Mbooking' },
        ];
        return (
            <>
                {children && (
                    <div className={cx('modal', { [className]: className })} onClick={handleOnChildren}>
                        {children}
                    </div>
                )}
                {isOpen && (
                    <div
                        className={cx('container', isOpenAnimation ? 'openContainer' : 'closeContainer')}
                        onClick={handleOnChildren}
                    >
                        <form
                            className={cx('main-content', isOpenAnimation ? 'openContent' : 'closeContent')}
                            onClick={handleStopPropagation}
                            onSubmit={
                                addNew
                                    ? (e) => submitCreateNew(e)
                                    : (e) => submitUpdateEmployee(e, data._id, data.avatar)
                            }
                        >
                            <div className={cx('header-modal')}>
                                {addNew ? 'Thêm thông tin nhân viên' : 'Cập nhật thông tin nhân viên'}
                            </div>
                            <div className={cx('body-modal')}>
                                <div className={cx('body-modal-avatar')}>
                                    <Avatar normal setting img={imageSel || data?.avatar} />
                                    <ButtonInput
                                        type="file"
                                        name="avatar"
                                        value="ảnh đại diện"
                                        className={cx('body-modal-avatar-file')}
                                        onChange={(e) =>
                                            imageToBase64(e.target.files[0], (base64) => {
                                                setImageSel(base64);
                                            })
                                        }
                                    />
                                    {/* <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" /> */}
                                    <div className={cx('job-note')}>
                                        <p className={cx('job-note-title')}>Chức năng</p>
                                        <span className={cx('job-note-selected')}>Đã chọn</span>
                                        <span className={cx('job-note-not')}>Chưa chọn</span>
                                    </div>

                                    <div className={cx('body-modal-avatar-role')}>
                                        {checkBoxData.map((e) => (
                                            <SelectButton
                                                key={e.id}
                                                type="checkbox"
                                                title={e.title}
                                                id={e.id}
                                                name={e.name}
                                                defaultChecked={data?.job.find((role) => role === e.id)}
                                                value={e.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('body-modal-info')}>
                                    <TextInput
                                        type={'text'}
                                        name={'username'}
                                        title={'Tên đầy đủ'}
                                        defaultValue={data?.username}
                                        notify={looking ? '' : notify?.username}
                                        danger
                                    />
                                    {/* <input type="hidden" name={'_id'} defaultValue={data?._id} readOnly /> */}
                                    <TextInput
                                        type={'text'}
                                        name={'email'}
                                        title={'Email'}
                                        defaultValue={data?.email}
                                        notify={looking ? '' : notify?.email}
                                        danger
                                    />
                                    <TextInput
                                        type={'text'}
                                        name={'phone'}
                                        title={'Số điện thoại'}
                                        defaultValue={data?.phone}
                                        notify={looking ? '' : notify?.phone}
                                        danger
                                    />
                                    <TextInput
                                        type={'text'}
                                        name={'role'}
                                        title={'Công việc'}
                                        // defaultValue={data?.job}
                                        notify={''}
                                        danger
                                    />
                                    <TextInput
                                        type={'text'}
                                        name={'address'}
                                        title={'địa chỉ'}
                                        defaultValue={data?.address}
                                        notify={''}
                                        danger
                                    />
                                </div>
                            </div>
                            {looking ? (
                                <ButtonInput type="button" value="XÁC NHẬN" onClick={handleOnChildren} />
                            ) : (
                                <div className={cx('footer-modal')}>
                                    <ButtonInput
                                        type="button"
                                        value="HỦY"
                                        variant="outline"
                                        onClick={handleOnChildren}
                                    />
                                    {addNew ? (
                                        ''
                                    ) : (
                                        <ButtonInput
                                            type="button"
                                            value="Xoá"
                                            onClick={() => submitDeleteEmployee(data._id)}
                                        />
                                    )}
                                    <ButtonInput type="submit" value={addNew ? 'THÊM' : 'XÁC NHẬN'} />
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </>
        );
    },
);

export default ModalUser;
