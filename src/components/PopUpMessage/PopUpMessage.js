import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PopUpMessage.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

export default function PopUp({ children, notify, pm = 'right', className, warn = false, danger = false }) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (notify === '') setIsVisible(false);
        else setIsVisible(true);
    }, [notify]);
    const classes = cx('content', { [className]: className, warn, danger });
    return (
        <Tippy placement={pm} visible={isVisible} content={<div className={classes}>{notify}</div>} delay={[0, 2000]}>
            {children}
        </Tippy>
    );
}
