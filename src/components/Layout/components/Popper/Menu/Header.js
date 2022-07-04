import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cx('header')} onClick={onBack}>
            <span className={cx('back-btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;
