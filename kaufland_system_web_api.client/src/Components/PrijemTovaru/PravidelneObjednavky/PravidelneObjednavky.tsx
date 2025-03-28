import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./PravidelneObjednavky.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
interface RegularOrderData {
    id: number;
    nazov: string;
    eanKod: string;
    zasoba: number;
    minZasoba: number;
    maxZasoba: number;
}
const API_URL = 'https://localhost:7016/api/Product/RegularOrder';
const PravidelneObjednavky: React.FC = () => {
    const [regularOrderData, setRegularOrderData] = useState<RegularOrderData[]>([]);
    const category = useSelector((state: RootState) => state.orderCategory.orderCategory);

    const fetchRegularOrder = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    category: category,
                },
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.data;
            setRegularOrderData(data);
        } catch (error) {
            console.error("Error fetching regular order:", error);
        }
    };

    const handleRemoveItem = (id: number) => {
        setRegularOrderData(prevData => prevData.filter(item => item.id !== id));
    };

    useEffect(() => {
        fetchRegularOrder();
        console.log(category);
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{category} na objednávku</h2>
            <button>Potvrdit Objednavku</button>
            {regularOrderData.length === 0 && <p className={styles.noData}>Dnesna objednaka je odoslana</p>}
            {regularOrderData.map((item) => (
                <div key={item.id} className={styles.card}>
                    <h3 className={styles.productName}>{item.nazov}</h3>
                    <p className={styles.productInfo}>EAN kód: <span>{item.eanKod}</span></p>
                    <p className={styles.productInfo}>Zásoba: <span>{item.zasoba}</span></p>
                    <p className={styles.productInfo}>Minimálna zásoba: <span>{item.minZasoba}</span></p>
                    <p className={styles.productInfo}>Maximálna zásoba: <span>{item.maxZasoba}</span></p>
                    <p className={styles.orderAmount}>Objedná sa: <span>{item.maxZasoba - item.zasoba}</span></p>
                    <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>Odstrániť</button>
                </div>
            ))}
        </div>
    );
}

export default PravidelneObjednavky;