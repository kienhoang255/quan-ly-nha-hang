import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EmployeeSetting.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import Button from '~/components/Button/Button';
import TableEmployee from '~/components/Table/TableEmployee/TableEmployee';
import { actions, useStore } from '~/store';
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '~/services/employee';
import { IoAdd } from 'react-icons/io5';
import ModalUser from '~/components/Modal/ModalUser/ModalUser';
import isEmpty from '~/validation/isEmpty';
import isEmail from '~/validation/isEmail';
import { isPhoneNumber } from '~/validation/isPhone';
import { imageToBase64 } from '~/utils/imageToBase64';

const cx = classNames.bind(styles);

const EmployeeSetting = () => {
    useEffect(() => {
        document.title = 'Quản lý nhân viên';
    });
    const [state, dispatch] = useStore();
    const [imageSel, setImageSel] = useState();
    const [notify, setNotify] = useState({
        username: '',
        email: '',
        phone: '',
    });

    const modalRef = useRef();

    const refsById = useMemo(() => {
        const refs = {};
        state?.EMPLOYEE.forEach((item) => {
            refs[item._id] = React.createRef(null);
        });
        return refs;
    }, [state?.EMPLOYEE]);

    const handleGetEmployee = () => {
        getAllEmployee(dispatch);
    };

    const submitUpdateEmployee = async (e, id, img) => {
        e.preventDefault();
        let jobFilter = [];
        const { address, email, phone, username, ...props } = Object.fromEntries(new FormData(e.target).entries());
        for (const role in props) {
            jobFilter.push(role);
        }
        const emptyUsername = isEmpty({ username: username }, 'username');
        const emptyEmail = isEmpty({ email: email }, 'email');
        const emptyPhone = isEmpty({ phone: phone }, 'phone');
        const checkEmail = isEmail({ email: email }, 'email');
        const checkPhone = isPhoneNumber(phone);

        if (!emptyUsername) {
            setNotify((prev) => {
                return { ...prev, username: 'Không được để trống!' };
            });
        } else
            setNotify((prev) => {
                return { ...prev, username: '' };
            });

        if (!email && !phone) {
            setNotify((prev) => {
                return { ...prev, email: 'Điền 1 trong 2', phone: 'Điền 1 trong 2' };
            });
        } else
            setNotify((prev) => {
                return { ...prev, email: '', phone: '' };
            });

        if (email) {
            if (!emptyEmail) {
                setNotify((prev) => {
                    return { ...prev, email: 'Không được để trống' };
                });
            } else {
                if (!checkEmail) {
                    setNotify((prev) => {
                        return { ...prev, email: 'Đây không phải email' };
                    });
                }
            }
        }

        if (phone) {
            if (!emptyPhone) {
                setNotify((prev) => {
                    return { ...prev, phone: 'Không được để trống' };
                });
            } else {
                if (!checkPhone) {
                    setNotify((prev) => {
                        return { ...prev, phone: 'Đây không phải phone' };
                    });
                }
            }
        }

        if (emptyUsername && (checkEmail || checkPhone)) {
            const update = await updateEmployee(dispatch, {
                address,
                email,
                avatar: imageSel || img,
                phone,
                username,
                _id: id,
                job: jobFilter,
            });
            if (update.message === 'success') {
                refsById[id].current.closeModal();
            } else {
                for (const key in update) {
                    setNotify((prev) => {
                        return { ...prev, [key]: update[key] };
                    });
                }
            }
        }
    };

    const submitCreateNew = async (e) => {
        e.preventDefault();
        let jobFilter = [];
        const { address, avatar, email, phone, username, _id, ...props } = Object.fromEntries(
            new FormData(e.target).entries(),
        );
        for (const role in props) {
            jobFilter.push(role);
        }

        const emptyUsername = isEmpty({ username: username }, 'username');
        const emptyEmail = isEmpty({ email: email }, 'email');
        const emptyPhone = isEmpty({ phone: phone }, 'phone');
        const checkEmail = isEmail({ email: email }, 'email');
        const checkPhone = isPhoneNumber(phone);

        if (!emptyUsername) {
            setNotify((prev) => {
                return { ...prev, username: 'Không được để trống!' };
            });
        } else
            setNotify((prev) => {
                return { ...prev, username: '' };
            });

        if (!email && !phone) {
            setNotify((prev) => {
                return { ...prev, email: 'Điền 1 trong 2', phone: 'Điền 1 trong 2' };
            });
        } else
            setNotify((prev) => {
                return { ...prev, email: '', phone: '' };
            });

        if (email) {
            if (!emptyEmail) {
                setNotify((prev) => {
                    return { ...prev, email: 'Không được để trống' };
                });
            } else {
                if (!checkEmail) {
                    setNotify((prev) => {
                        return { ...prev, email: 'Đây không phải email' };
                    });
                }
            }
        }

        if (phone) {
            if (!emptyPhone) {
                setNotify((prev) => {
                    return { ...prev, phone: 'Không được để trống' };
                });
            } else {
                if (!checkPhone) {
                    setNotify((prev) => {
                        return { ...prev, phone: 'Đây không phải phone' };
                    });
                }
            }
        }

        if (emptyUsername && (checkEmail || checkPhone)) {
            const create = await createEmployee(dispatch, {
                address,
                email,
                phone,
                avatar: imageSel,
                password: email || phone,
                username,
                _id,
                job: jobFilter,
            });
            if (create.message === 'success') {
                modalRef.current.closeModal();
            } else {
                for (const key in create) {
                    setNotify((prev) => {
                        return { ...prev, [key]: create[key] };
                    });
                }
            }
        }
    };

    const submitDeleteEmployee = async (id) => {
        await deleteEmployee(id).then((res) => {
            if (res.message === 'success') {
                dispatch(actions.delEmployee(res.delEmployee));
                refsById[id].current.closeModal();
                dispatch(actions.setMessage({ message: 'Xóa thành công' }));
            }
        });
    };

    return (
        <ContentLayout title="Quản lý nhân viên" className={cx('content')}>
            <TableEmployee
                refsById={refsById}
                data={state?.EMPLOYEE}
                submitUpdateEmployee={submitUpdateEmployee}
                submitDeleteEmployee={submitDeleteEmployee}
                notify={notify}
                setNotify={setNotify}
                imageSel={imageSel}
                setImageSel={setImageSel}
            />
            <Button onClick={handleGetEmployee} style={{ marginTop: '20px' }}>
                Refresh
            </Button>
            <ModalUser
                notify={notify}
                setNotify={setNotify}
                ref={modalRef}
                submitCreateNew={submitCreateNew}
                addNew
                imageSel={imageSel}
                setImageSel={setImageSel}
            >
                <Button className={cx('btn-add')}>
                    <IoAdd />
                </Button>
            </ModalUser>
        </ContentLayout>
    );
};

export default EmployeeSetting;
