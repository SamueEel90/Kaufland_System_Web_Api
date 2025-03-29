import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const API_URL = 'https://localhost:7145/api/Product';


const DenneUlohy: React.FC = () => {

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/NulovaZasoba`);
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>DenneUlohy</h1>

            <p>Artikle s nulovou zasobou: { } </p>

            <p>Artikle s minusovou zasobou: </p>

            <p>AS proces </p>

            <p>Datumy Spotreby:</p>

            <p>Zlavy s centraly</p>
        </>
    )
}
export default DenneUlohy;