import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Manager.module.scss';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';
import Button from '~/components/Button/Button';
import TextInput from '~/components/TextInput/TextInput';
import TableFood from '~/components/Table/TableFood/TableFood';
import ModalMenu from '~/components/Modal/ModalMenu/ModalMenu';

const cx = classNames.bind(styles);

const Manager = () => {
    return (
        <ContentLayout title="quản lý">
            <div className={cx('container')}>
                <ModalMenu />
            </div>
        </ContentLayout>
    );
};

export default Manager;
