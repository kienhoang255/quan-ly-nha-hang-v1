import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            children,
            variant = 'normal',
            full,
            zoom,
            to,
            className,
            leftIcon,
            rightIcon,
            notify,
            active = false,
            disable = false,
            ...props
        },
        ref,
    ) => {
        let Comp = 'button';
        if (to) {
            props.to = to;
            Comp = Link;
        }

        const variantMode = ['outline', 'normal', 'none', 'circle'];
        const getVariant = () => variantMode.filter((e) => e === variant).toString();

        const classes = cx('content', getVariant(), { [className]: className, full, zoom, active, disable });
        return (
            <>
                {notify ? (
                    <Tippy content={notify}>
                        <Comp className={classes} {...props}>
                            <div className={cx('title')}>{children}</div>
                        </Comp>
                    </Tippy>
                ) : (
                    <Comp ref={ref} className={classes} {...props}>
                        {leftIcon && <div className={cx('left-icon')}>{leftIcon}</div>}
                        <div className={cx('title')}>{children}</div>
                    </Comp>
                )}
            </>
        );
    },
);

export default Button;
