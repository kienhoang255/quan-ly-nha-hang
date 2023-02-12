import React, { useMemo } from 'react';
import Button from '../../components/Button/Button';
import styles from './home.module.scss';
import classNames from 'classnames/bind';
import { useStore } from '~/store';
import { PAGES } from '~/routes';

const cx = classNames.bind(styles);

export default function Home() {
    const [state, dispatch] = useStore();

    const ROLES = [];

    useMemo(() => {
        state.USER.job?.forEach((role) => {
            PAGES.forEach((aRole) => {
                if (role === aRole.id) ROLES.push(aRole);
            });
        });
    }, [ROLES]);
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Button to="/info">Thông tin cá nhân</Button>
                {ROLES.map((e, key) => (
                    <Button key={key} to={e.path}>
                        {e.notify}
                    </Button>
                ))}
            </div>
        </div>
    );
}
