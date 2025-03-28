
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import styles from './MAXOPT.module.css';

    const API_BASE_URL = 'https://localhost:7145/api/Product';

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
        maxZasoba: number;
    }

    function MAXOPT() {
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

        const nastavMaximalku = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const quantity = parseInt(formData.get("quantity") as string, 10);
            try {
                await axios.patch(
                    `${API_BASE_URL}/MAX/${vybranyProdukt?.id}`,
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

        const nastavOptiku = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const quantity = parseInt(formData.get("quantity") as string, 10);
            try {
                await axios.patch(
                    `${API_BASE_URL}/OPT/${vybranyProdukt?.id}`,
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
                <h1 className={styles.nazov}>Optika a Maximalka</h1>
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
                        <form className={styles.form} onSubmit={nastavOptiku}>

                            <p>Optika: {vybranyProdukt.minZasoba}</p>
                            <p className={styles.zasobaInput}>Nastavit Optiku :&nbsp; <input type="number" name="quantity" min="1" max="1000" /> </p>

                            <button className={styles.button}>Potvrdit</button>
                        </form>
                        <form className={styles.form} onSubmit={nastavMaximalku}>

                            <p>Maximalka: {vybranyProdukt.maxZasoba}</p>
                            <p className={styles.zasobaInput}>Nastavit Maximalku :&nbsp; <input type="number" name="quantity" min="1" max="1000" /> </p>

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
        );
    }

    export default MAXOPT;
