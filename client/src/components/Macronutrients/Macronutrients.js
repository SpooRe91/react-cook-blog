import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getMacros } from '../../services/mealService';
import styles from './Macronutrients.module.css';

export const Macronutrients = ({ isLoading,
    setIsLoading,
    setErrorMessage,
    errorMessage,
    products,
    setProducts }) => {

    useEffect(() => {
        if (products.length === 0) {
            getMacros()
                .then(res => {
                    console.log(res);
                    if (res.length > 0) {
                        setProducts(res);
                        setIsLoading(false);
                    }
                }).catch(error => {
                    console.log(error.message);
                    setErrorMessage({ error: error.message });
                });
        } else {
            return
        }
    }, [setErrorMessage, setProducts, products, setIsLoading]);

    const [filterValue, setFilterValue] = useState("")

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };


    return (
        <>
            <div className={styles['table-container']}>
                {
                    isLoading
                        ? <><BeatLoader loading={() => isLoading} /></>
                        : <>
                            < h1 className="already-reg">Търсене на продукти</h1>
                            < h3 className="already-reg">Моля въведете име на продукт:</h3>
                            <form className="search" method="GET">
                                <input type="text" placeholder="Търси..." name="search"
                                    value={filterValue} onChange={filterHandler} />
                                <input type="submit" value={"Търси"} />
                            </form>
                            <h3 className="already-reg">На тази таблица можете да намерите основните хранителни
                                стойности на най-често срещаните и употребявани храни и продукти!</h3>
                            <div className="row">
                                <div className="col-xs-12">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Име на продукт</th>
                                                <th>Вода</th>
                                                <th>Белтъчини</th>
                                                <th>Мазнини</th>
                                                <th>Въглехидрати</th>
                                                <th>Калории</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* филтриране по време на писане, ако има нещо въведено в state 
                                            тогава работим с първия филтър, ако ли не изобразяваме всичко */}

                                            {filterValue
                                                ? products.filter(p => p.name.toLowerCase().includes(filterValue))
                                                    .map(p => <tr key={p._id}>
                                                        <td className='row-name' name={p.name}>{p.name}</td>
                                                        <td className="row-values">{p.water}</td>
                                                        <td className="row-values">{p.protein}</td>
                                                        <td className="row-values">{p.fat}</td>
                                                        <td className="row-values">{p.carb}</td>
                                                        <td className='row-values'>{p.calories}</td>
                                                    </tr>)
                                                : products.map(x =>
                                                    <tr key={x._id}>
                                                        <td className='row-name' name={x.name}>{x.name}</td>
                                                        <td className="row-values">{x.water}</td>
                                                        <td className="row-values">{x.protein}</td>
                                                        <td className="row-values">{x.carb}</td>
                                                        <td className="row-values">{x.fat}</td>
                                                        <td className='row-values'>{x.calories}</td>
                                                    </tr>
                                                )
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                }
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
            </div >
        </>
    );
}