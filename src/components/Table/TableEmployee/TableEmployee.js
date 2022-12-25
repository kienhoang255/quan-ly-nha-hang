import React from 'react';
import classNames from 'classnames/bind';
import styles from './TableEmployee.module.scss';
import Avatar from '../../Avatar/Avatar';
import ModalUser from '../../Modal/ModalUser/ModalUser';

const cx = classNames.bind(styles);

const TableEmployee = ({
    data,
    submitUpdateEmployee,
    submitDeleteEmployee,
    notify,
    setNotify,
    refsById,
    looking,
    imageSel,
    setImageSel,
}) => {
    const table = data;
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div>No.</div>
                <div>Tên</div>
                <div>Số điện thoại</div>
                <div>Email</div>
                <div>Địa chỉ</div>
            </div>

            <div className={cx('body')}>
                {table?.map((tableItem, index) => {
                    return (
                        <ModalUser
                            ref={refsById ? refsById[tableItem._id] : null}
                            className={cx('content')}
                            data={tableItem}
                            key={index}
                            submitUpdateEmployee={submitUpdateEmployee}
                            submitDeleteEmployee={submitDeleteEmployee}
                            notify={notify ? notify : null}
                            setNotify={setNotify ? setNotify : null}
                            looking={looking}
                            imageSel={imageSel ? imageSel : null}
                            setImageSel={setImageSel ? setImageSel : null}
                        >
                            <div className={cx('content-no')}>{index + 1}</div>
                            <div className={cx('content-avatar_name')}>
                                <Avatar img={tableItem?.avatar} />
                                <span className={cx('name')}>{tableItem.username}</span>
                            </div>
                            <div className={cx('content-phone')}>{tableItem.phone}</div>
                            <div className={cx('content-email')}>{tableItem.email}</div>
                            <div className={cx('content-address')}>{tableItem.address}</div>
                        </ModalUser>
                    );
                })}
            </div>
        </div>
    );
};

export default TableEmployee;
