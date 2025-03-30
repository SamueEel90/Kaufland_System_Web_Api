import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const API_URL = 'https://localhost:7145/api/Product';

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

const DenneUlohy: React.FC = () => {

const [nulovaZasoba, SetNulovaZasoba] = useState<Product[]>([]);   
    const [minusovaZasoba, setMinusovaZasoba] = useState<Product[]>([]);  
   
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
 }, []);

    return (
        <>
            <h1>DenneUlohy</h1>

            <div>Artikle s nulovou zasobou: {nulovaZasoba.map((item) => {
                return <p key={item.id }>{item.nazov}</p>
            })} </div>

            <div>Artikle s minusovou zasobou:{minusovaZasoba.map((item) => {
                return <p key={item.id}>{item.nazov}</p>
            })} </div> 

            <p>AS proces </p>

            <p>Datumy Spotreby:</p>

            <p>Zlavy s centraly</p>
        </>
    )
}
export default DenneUlohy;