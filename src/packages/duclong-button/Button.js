import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

export default function Button({
    openNewTab = false,
    to = '',
    href = '',
    title = '',
    onClick = () => {},
    type = 'primary',
    disabled = false,
    size = 'm',
    underline = false,
    actived = false
}) {
    const classNames = [styles.wrapper, styles[type], disabled ? styles.disabled : '', styles[size], underline ? styles.underline : '', actived ? styles.actived : '']
    const props = {}
    let Component = 'button'
    if (to) {
        Component = Link
        props.to = to
    }
    if (href) {
        Component = 'a'
        props.href = href
        if (openNewTab) {
            props.target = '_blank'
        }
    }
    return (
        <Component {...props} className={classNames.join(' ')} onClick={onClick}>
            <span>{title}</span>
        </Component>
    )
}