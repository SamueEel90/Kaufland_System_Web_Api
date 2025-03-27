import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrijemTovaru.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderCategory } from '../../orderCategorySlice';

enum OrderCategory {
    Zelenina = 'Zelenina',
    Pulty = 'Pulty',
    SB = 'SB'
}

const PrijemTovaru: React.FC = () => {
    const [showList, setShowList] = useState(false);
    const [orderCategory, setOrderCategoryState] = useState<OrderCategory | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (orderCategory) {
            dispatch(setOrderCategory(orderCategory));
        }
    }, [orderCategory, dispatch]);

    return (
        <div className={styles.page}>
            <div className={styles.buttonContainer}>
                <div className={styles.link}
                    onMouseEnter={() => setShowList(true)}
                    onMouseLeave={() => setShowList(false)}>
                    <button className={styles.button}>Pravidelne Objednavky</button>
                    {showList && (
                        <ul className={styles.dropdown}>
                            <li><Link to="PravidelneObjednavky"><button className={styles.dropdownButton}
                                onClick={() => setOrderCategoryState(OrderCategory.Zelenina)}>Zelenina</button></Link></li>
                            <li><Link to="PravidelneObjednavky"><button className={styles.dropdownButton}
                                onClick={() => setOrderCategoryState(OrderCategory.Pulty)}>Pulty</button></Link></li>
                            <li><Link to="PravidelneObjednavky"><button className={styles.dropdownButton}
                                onClick={() => setOrderCategoryState(OrderCategory.SB)}>SB</button></Link></li>
                        </ul>

                    )}
                </div>
                <div className={styles.link}
                    onMouseEnter={() => setShowList(true)}
                    onMouseLeave={() => setShowList(false)}>
                    <button className={styles.button}>Prijem bez Objednavky</button>
                    {showList && (
                        <ul className={styles.dropdown}>
                            <li><Link to="MimoriadneObjednavky"><button className={styles.dropdownButton}>Mimoriadne Objednavky</button></Link></li>
                            <li><Link to="MediaPrint"><button className={styles.dropdownButton}>MediaPrint</button></Link></li>
                            <li><Link to="ExternyDodavatelia"><button className={styles.dropdownButton}>ExternyDodavatelia</button></Link></li>
                        </ul>

                    )}
                </div>

            </div>
        </div>
    );
};
export default PrijemTovaru;