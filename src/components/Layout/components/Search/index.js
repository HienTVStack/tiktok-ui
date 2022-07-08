import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadLessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';

import AccountItem from '~/components/AccountItem';
import PopperWrapper from '~/components/Layout/components/Popper/Wrapper';
import styles from './Search.module.scss';
// import axios from 'axios';
import * as request from '~/utils/request';
import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            if (!debounced.trim()) {
                setSearchResult([]);
                return;
            }
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };
        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             },
        //         });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }

        // .then((res) => res.json())
        // .then((res) => {
        //     setSearchResult(res.data);
        //     setLoading(false);
        // })
        // .catch(() => {
        //     setLoading(false);
        // });
        // };
        fetchApi();

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideSide = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <HeadLessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Tài khoản</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideSide}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    // onChange={handleChange}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <span className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
            </div>
        </HeadLessTippy>
    );
}

export default Search;
