import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
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
    const [nulovaZasoba, SetNulovaZasoba] = useState<Product[]>([]);
    const [minusovaZasoba, setMinusovaZasoba] = useState<Product[]>([]);
    const [vybranyProduktKontext, setVybranyProduktKontext] = useState<Product | null>(null);

    useEffect(() => {
        const NulovaZasoba = async () => {
            try {
                const response = await axios.get(`${API_URL}/NulovaZasoba`);
                const data = response.data;
                SetNulovaZasoba(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        NulovaZasoba();
        const MinusovaZasoba = async () => {
            try {
                const response = await axios.get(`${API_URL}/MinusovaZasoba`);
                const data = response.data;
                setMinusovaZasoba(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        MinusovaZasoba();
        console.log(vybranyProduktKontext);
    }, [setVybranyProduktKontext, vybranyProduktKontext]);

    const PresmerovanieNaKorekciu = () => {
        navigate('/artikloveProcesy/KorekciaZasob', {
            state: { vybranyProduktKontext }
        });
    }

    return (
        <>
            <h1>DenneUlohy</h1>

            <div>Artikle s nulovou zasobou: {nulovaZasoba.map((item) => {
                return (
                    <button
                        className={styles.itemButton}
                        key={item.id}
                        onMouseOver={() => setVybranyProduktKontext(item)}
                        onClick={PresmerovanieNaKorekciu}
                    >
                        {item.nazov}
                    </button>
                )
            })} </div>

            <div>Artikle s minusovou zasobou:{minusovaZasoba.map((item) => {
              return  (
                    <button
                        className={styles.itemButton}
                        key={item.id}
                        onMouseOver={() => setVybranyProduktKontext(item)}
                    >
                        {item.nazov}
                    </button>
                )
            })} </div>

            <p>AS proces </p>

            <p>Datumy Spotreby:</p>

            <p>Zlavy s centraly</p>
        </>
    )
}
export default DenneUlohy;