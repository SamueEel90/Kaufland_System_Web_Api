import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ArtikelInfo.module.css';

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
const ArtikelInfo: React.FC = () => {
    const [hladanyVyraz, setHladanyVyraz] = useState('');
    const [typHladania, setTypHladania] = useState('Nazov');
    const [products, setProducts] = useState<Product[]>([]);
    const [vybranyProdukt, setVybranyProdukt] = useState<Product | null>(null);

    

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Search`, {
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
        <div className={styles.container}>
            <h1 className={styles.nazov}>Artikel Info</h1>
            <div className={styles.searchBar}>
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
            </div>
            {vybranyProdukt ? (
                <div className={styles.productDetail}>
                    <h2 className={styles.productName}>{vybranyProdukt.nazov}</h2>
                    <p><strong>EAN:</strong> {vybranyProdukt.eanKod}</p>
                    <p><strong>Kategoria:</strong> {vybranyProdukt.kategoria}</p>
                    <p><strong>Vyrobca:</strong> {vybranyProdukt.vyrobca}</p>
                    <p><strong>Cena:</strong> {vybranyProdukt.cena} EUR</p>
                    <p><strong>Zasoba:</strong> {vybranyProdukt.zasoba} ks</p>
                    <p><strong>Min Zasoba:</strong> {vybranyProdukt.minZasoba} ks</p>
                    <p><strong>Pocet Predanych:</strong> {vybranyProdukt.pocetPredanych} ks</p>
                    <p><strong>Druh Listovania:</strong> {vybranyProdukt.druhListovania}</p>
                    <p><strong>Range of Sale:</strong> 100 - 500 units (hardcoded for now)</p>
                </div>
            ) : (
                <div className={styles.productsWrapper}>
                    {products.map(product => (
                        <div className={styles.zoznam} key={product.id} onClick={() => zmenVybranyProdukt(product)}>
                            <h3 className={styles.productName}>{product.nazov}</h3>
                            <p><strong>EAN:</strong> {product.eanKod}</p>
                            <p><strong>Zasoba:</strong> {product.zasoba} ks</p>
                            <p><strong>Cena:</strong> {product.cena} EUR</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtikelInfo;