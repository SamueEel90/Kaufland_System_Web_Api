import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DenneUlohy.module.css';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    nazov: string;
    eanKod: string;
    kategoria: string;
    vyrobca: string;
    cena: number;
    zasoba: number;
    minZasoba: number;
    pocetPredanych: number;
    druhListovania: string;
}

const API_URL = 'https://localhost:7145/api/Product';

const DenneUlohy: React.FC = () => {
    const navigate = useNavigate();
    const [nulovaZasoba, setNulovaZasoba] = useState<Product[]>([]);
    const [minusovaZasoba, setMinusovaZasoba] = useState<Product[]>([]);
    const [vybranyProduktKontext, setVybranyProduktKontext] = useState<Product | null>(null);

    useEffect(() => {
        const fetchNulovaZasoba = async () => {
            try {
                const response = await axios.get(`${API_URL}/NulovaZasoba`);
                const data = response.data;
                setNulovaZasoba(data);
            } catch (error) {
                console.error('Error fetching NulovaZasoba:', error);
            }
        };

        const fetchMinusovaZasoba = async () => {
            try {
                const response = await axios.get(`${API_URL}/MinusovaZasoba`);
                const data = response.data;
                setMinusovaZasoba(data);
            } catch (error) {
                console.error('Error fetching MinusovaZasoba:', error);
            }
        };

        fetchNulovaZasoba();
        fetchMinusovaZasoba();
    }, []);

    const presmerovanieNaKorekciu = () => {
        navigate('/artikloveProcesy/KorekciaZasob', {
            state: { vybranyProduktKontext }
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.nazov}>Denné Úlohy</h1>

            <div className={styles.productsWrapper}>
                <div className={styles.zoznam}>
                    <h2>Artikle s nulovou zásobou {nulovaZasoba.length}</h2>
                    {nulovaZasoba.map((item) => (
                        <button
                            className={styles.zoznam}
                            key={item.id}
                            onMouseOver={() => setVybranyProduktKontext(item)}
                            onClick={presmerovanieNaKorekciu}
                        >
                            {item.nazov}
                        </button>
                    ))}
                </div>

                <div className={styles.zoznam}>
                    <h2>Artikle s minusovou zásobou {minusovaZasoba.length}</h2>
                    {minusovaZasoba.map((item) => (
                        <button
                            className={styles.zoznam}
                            key={item.id}
                            onMouseOver={() => setVybranyProduktKontext(item)}
                            onClick={presmerovanieNaKorekciu}
                        >
                            {item.nazov}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.asContainer}>
            <h2>AS Proces</h2>

            </div> 
                


            <div className={styles.form}>
                
                <p className={styles.produkt}>Dátumy spotreby</p>
                <p className={styles.produkt}>Zľavy z centrálnej</p>
            </div>
        </div>
    );
};

export default DenneUlohy;
