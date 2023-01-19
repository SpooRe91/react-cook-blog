import { useContext, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getMacros } from '../../services/mealService';
import { Macrotable } from './Macrotable';

import styles from './Macronutrients.module.css';

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { ScrollButton } from '../common/ScrollButton';
import { useNavigate } from 'react-router-dom';
export const Macronutrients = ({ isLoading, setIsLoading }) => {

    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length === 0) {
            setIsLoading(state => true);
            getMacros()
                .then(res => {
                    if (res.length > 0) {
                        setProducts(res);
                        setIsLoading(false);
                    }
                }).catch(error => {
                    console.log(error.message);
                    setIsLoading(false);
                    setErrorMessage('Данните не могат да бъдат достъпени в този момент!');
                });
        } else {
            return
        }
        return () => {
            setIsLoading(false);
        }
    }, [setErrorMessage, setProducts, products, setIsLoading]);

    const [filterValue, setFilterValue] = useState("");
    const [quantify, setQuantify] = useState("");

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase().trim());
    };

    const quantityHandler = (e) => {
        let value = Number(e.target.value);
        if (value <= 0) value = 0;
        setQuantify(value);
    };

    return (
        <>
            <title>Хранителни стойности</title>
            {errorMessage !== "" &&
                <div className={styles["error-container"]}>
                    <p className={styles["error-message"]}>
                        {errorMessage}
                        <button className={styles["btn"]} onClick={() => [setErrorMessage(''), navigate('/')]}>OK</button>
                    </p>
                </div>
            }
            <div className={styles['table-container']}>
                {
                    isLoading
                        ?
                        <>
                            <div className={styles["already-reg-loading"]}>
                                <h3 className={styles["already-reg"]}>Макронутриенти</h3>
                                <BeatLoader loading={() => isLoading} color={"white"} />
                                <p>Моля изчакайте...</p>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles["search-container"]}>
                                <h1 className={styles['table-headers']}>Търсене на продукти</h1>
                                <h3 className={styles['table-headers']}>На тази таблица можете да намерите основните хранителни
                                    стойности на най-често срещаните и употребявани продукти!
                                </h3>
                            </div>
                            <div className={styles["search-container"]}>
                                <form className={styles["search-nutrients"]} method="GET">
                                    <label htmlFor={styles['table-headers']}>
                                        Моля въведете име на Български
                                    </label>
                                    <input type="text" className={styles["nutrient-name"]} placeholder="пилешко..." name="search"
                                        value={filterValue} onChange={filterHandler}
                                    />
                                    <label htmlFor='quantity'>
                                        Моля въведете количество в грамове
                                    </label>
                                    <input type="number" className={styles["nutrient-qty"]} placeholder="1000гр..." name="quantity"
                                        value={quantify || ''} onChange={quantityHandler}
                                    />
                                </form>
                            </div>
                            <h3 className={styles['table-headers']}>
                                Стойностите са в грамове и се отнасят за 100гр. продукт!
                            </h3>

                            <div className="row">
                                <h3 className={styles['table-headers']}>!!!Важно:
                                    Данните са относителни, и може да същестува разминаване с други източници!
                                </h3>

                                <div className="col-xs-12">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Име на продукт</th>
                                                <th>Вода гр.</th>
                                                <th>Белтъчини гр.</th>
                                                <th>Мазнини гр.</th>
                                                <th>Въглехидрати гр.</th>
                                                <th>Калории гр.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* филтриране по време на писане, ако има нещо въведено в state 
                                            тогава работим с първия филтър, ако ли не изобразяваме всичко,
                                            също при въвеждане на стойност самостоятелно или с име, се променят и стойностите */}
                                            <>
                                                {
                                                    quantify !== 0 || filterValue
                                                        ?
                                                        products.filter(p => p.name.toLowerCase().includes(filterValue))
                                                            .map(row => <Macrotable key={row._id} {...row} value={quantify / 100} setErrorMessage={setErrorMessage} />)
                                                        : products.map(row => <Macrotable key={row._id} {...row} value={1} setErrorMessage={setErrorMessage} />)
                                                }
                                            </>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                }
                <ScrollButton />
            </div >
        </>
    );
}