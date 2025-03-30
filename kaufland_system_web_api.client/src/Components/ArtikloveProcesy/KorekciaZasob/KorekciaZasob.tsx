import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './KorekciaZasob.module.css';
import { useLocation } from 'react-router-dom'; 
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
const API_BASE_URL = 'https://localhost:7145/api/Product';
function KorekciaZasob() {
    const location = useLocation();
    const { vybranyProduktKontext } = location.state || {};  
    const [hladanyVyraz, setHladanyVyraz] = useState('');
    const [typHladania, setTypHladania] = useState('Nazov');
    const [products, setProducts] = useState<Product[]>([]);
    const [vybranyProdukt, setVybranyProdukt] = useState<Product | null>(null);


    useEffect(() => {
        if (vybranyProduktKontext) {
            setVybranyProdukt(vybranyProduktKontext);
        }
    }, [vybranyProduktKontext]);


    const zmenHladanyVyraz = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHladanyVyraz(event.target.value);
    };

    const zmenTypHladania = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypHladania(event.target.value);
    };

    const zmenVybranyProdukt = (product: Product) => {
        setVybranyProdukt(product);
        console.log(product);
    };

    const korekcia = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const quantity = parseInt(formData.get("quantity") as string, 10);

        try {
            await axios.patch(
                `${API_BASE_URL}/KorekciaZasob/${vybranyProdukt?.id}`,
                quantity,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Response:", quantity);
        } catch (error) {
            console.error("Error posting data:", error);
        }
        setVybranyProdukt(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL }/Search`, {
                    params: {
                        searchType: typHladania,
                        searchTerm: hladanyVyraz
                    }
                });
                const data = response.data;
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (hladanyVyraz) {
            fetchData();
        }
    }, [hladanyVyraz, typHladania]);

    return (

        vybranyProduktKontext ? (
            <>
                <div>{vybranyProduktKontext.nazov}</div>
                <form className={styles.form} onSubmit={korekcia}>
                    <p>Aktualna Zasoba: {vybranyProduktKontext.zasoba} id: {vybranyProduktKontext.id }</p>
                    <p className={styles.zasobaInput}>
                        Nova Zasoba: <input type="number" name="quantity" min="0" max="1000" />
                    </p>
                    <button className={styles.button}>Potvrdit</button>
                </form>
            </>
        ) : (
      
        <div className={styles.container}>
            <h1 className={styles.nazov}>Korekcia Zasob</h1>
            <input
                className={styles.input}
                type="text"
                value={hladanyVyraz}
                onChange={zmenHladanyVyraz}
                placeholder={typHladania === "Nazov" ? "Hladaj pod\u013Ea n\u00E1zvu" : "h\u013Eadaj pod\u013Ea EAN k\u00F3du"}
            />
            <select value={typHladania} onChange={zmenTypHladania} className={styles.selectField}>
                <option value="Nazov">Nazov</option>
                <option value="EanKod">EanKod</option>
            </select>
            {vybranyProdukt ? (
                <>
                    <div>{vybranyProdukt.nazov}</div>
                    <form className={styles.form} onSubmit={korekcia}>
                        <p>Aktualna Zasoba : {vybranyProdukt.zasoba}</p>

                        <p className={styles.zasobaInput}>Nova Zasoba :&nbsp; <input type="number" name="quantity" min="0" max="1000" /> </p>

                        <button className={styles.button}>Potvrdit</button>
                    </form>
                </>
            ) : (
                <div className={styles.productsWrapper}>
                    {products.map(product => (
                        <div className={styles.zoznam} key={product.id} onClick={() => zmenVybranyProdukt(product)}>
                            <div className={styles.produkt}>Nazov: {product.nazov}</div>
                            <div className={styles.produkt}>EAN: {product.eanKod}</div>
                            <div className={styles.produkt}>Zasoba: {product.zasoba} ks</div>
                            <div className={styles.produkt}>Optika: {product.minZasoba} ks</div>
                            <div className={styles.produkt}>Cena: {product.cena} eur</div>
                        </div>
                    ))}
                </div>
            )}

        </div>
        )
    );
}

export default KorekciaZasob;