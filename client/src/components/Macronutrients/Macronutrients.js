import { useContext, useEffect, useMemo, useState } from 'react';
import LoadingComponent from '../common/LoadingComponent';
import styles from './Macronutrients.module.css';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../contexts/ErrorMessageContext';
import { ScrollButton } from '../common/ScrollButton';
import { useAllMacros } from '../../hooks/useMacros';
const MAX_QUANTITY_LENGTH = 7;
export const Macronutrients = ({ isLoading, setIsLoading }) => {
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();

    const { getAllMacros, loading } = useAllMacros();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        getAllMacros(controller, signal)
            .then((res) => {
                if (res && res.length > 0) {
                    setProducts(res);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                if (controller.signal.aborted) {
                    return;
                }
                console.log(error.message);
                setErrorMessage(error.message);
            });

        return () => {
            setIsLoading(false);
            setErrorMessage('');
            controller.abort();
        };
    }, [loading, setErrorMessage, setIsLoading]);

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase().trim());
    };

    const quantityHandler = (e) => {
        const { value } = e.target;
        if (value && value.length > MAX_QUANTITY_LENGTH) return;
        if (!value) {
            setQuantity(0);
        }
        setQuantity(value);
    };

    const calculatedMacros = useMemo(() => {
        if (quantity && products.length > 0) {
            return products.map((product) => ({
                ...product,
                water: (product.water * (quantity / 100)).toFixed(2),
                protein: (product.protein * (quantity / 100)).toFixed(2),
                fat: (product.fat * (quantity / 100)).toFixed(2),
                carb: (product.carb * (quantity / 100)).toFixed(2),
                calories: (product.calories * (quantity / 100)).toFixed(2),
            }));
        }
        return products;
    }, [quantity, products]);
    return (
        <>
            <title>Хранителни стойности</title>
            {errorMessage !== '' && (
                <div className={styles['error-container']}>
                    <p className={styles['error-message']}>
                        {errorMessage}
                        <button
                            className={styles['btn']}
                            onClick={() => [setErrorMessage(''), navigate('/')]}
                        >
                            OK
                        </button>
                    </p>
                </div>
            )}
            <div className={styles['table-container']}>
                {isLoading ? (
                    <LoadingComponent {...{ isLoading }} />
                ) : (
                    <>
                        <div className={styles['search-container']}>
                            <h1 className={styles['table-headers']}>Търсене на продукти</h1>
                            <h3 className={styles['table-headers']}>
                                На тази таблица можете да намерите основните хранителни стойности на най-често
                                срещаните и употребявани продукти!
                            </h3>
                        </div>
                        <div className={styles['search-container']}>
                            <form className={styles['search-nutrients']} method='GET'>
                                <label htmlFor={styles['table-headers']}>
                                    Моля въведете име на Български
                                </label>
                                <input
                                    type='text'
                                    className={styles['nutrient-name']}
                                    placeholder='пилешко...'
                                    name='search'
                                    value={filterValue}
                                    onChange={filterHandler}
                                />
                                <label htmlFor='quantity'>Моля въведете количество в грамове</label>
                                <input
                                    type='number'
                                    className={styles['nutrient-qty']}
                                    placeholder='1000гр...'
                                    name='quantity'
                                    value={quantity || ''}
                                    onChange={quantityHandler}
                                    maxLength='6'
                                />
                            </form>
                        </div>
                        <div className={styles['table-headers']}>
                            <h3 className={styles['table-headers']}>
                                Стойностите са в грамове и се отнасят за 100гр. продукт!
                            </h3>
                            <h3 className={styles['table-headers']}>
                                !!!Важно: Данните са относителни, и може да същестува разминаване с други
                                източници!
                            </h3>
                        </div>
                        <div className={styles['items-container']}>
                            {calculatedMacros
                                .filter((p) => p.name.toLowerCase().includes(filterValue))
                                .map((product) => (
                                    <div key={product._id} className={styles['product-item']}>
                                        <div className={styles['product-name']}>{product.name}</div>
                                        <div className={styles['product-nutrition']}>
                                            <p>Вода: {product.water} г</p>
                                            <p>Белтъчини: {product.protein} г</p>
                                            <p>Мазнини: {product.fat} г</p>
                                            <p>Въглехидрати: {product.carb} г</p>
                                            <p>Калории: {product.calories} ккал</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
                <ScrollButton />
            </div>
        </>
    );
};
