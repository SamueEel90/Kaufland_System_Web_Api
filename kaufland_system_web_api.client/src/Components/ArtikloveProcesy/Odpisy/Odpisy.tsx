    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import styles from './Odpisy.module.css';

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

    enum typOdpisu {
        Poskodeny_Tovar = 1,
        Prazdne_Obaly = 2,
        Darovanie = 3,
        Ine = 4,
    }

    function Odpisy() {
        const [hladanyVyraz, setHladanyVyraz] = useState('');
        const [typHladania, setTypHladania] = useState('Nazov');
        const [products, setProducts] = useState<Product[]>([]);
        const [vybranyProdukt, setVybranyProdukt] = useState<Product | null>(null);
        const [hodnotaOdpisu, setHodnotaOdpisu] = useState(0);
        const [mnozstvo, setMnozstvo] = useState(0);

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

        const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const mnozstvo = parseInt(event.target.value, 10);
            setMnozstvo(mnozstvo);
            if (vybranyProdukt) {
                const vypocitanaHodnotaOdpisu = mnozstvo * vybranyProdukt.cena;
                setHodnotaOdpisu(vypocitanaHodnotaOdpisu);
            }
        };

        const odpis = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!vybranyProdukt || isNaN(hodnotaOdpisu) || hodnotaOdpisu <= 0) {
                console.error('Invalid product or value');
            } else {
                try {
                    await axios.patch(`${API_URL}/Odpisy/${vybranyProdukt?.id}`,
                        mnozstvo,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_URL}/Search`, {
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
                <h1 className={styles.nazov}>Odpisy</h1>
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
                    <>  <div className={styles.produkt}>{vybranyProdukt.nazov}</div>
                        <form className={styles.form} onSubmit={odpis}>
                            <select name="typOdpisu" id="typOdpisu">
                                <option value="Poskodeny_Tovar">{typOdpisu.Poskodeny_Tovar}</option>
                                <option value="Prazdne_Obaly">{typOdpisu.Prazdne_Obaly}</option>
                                <option value="Darovanie">{typOdpisu.Darovanie}</option>
                                <option value="Ine">{typOdpisu.Ine}</option>

                            </select>
                            <p className={styles.zasobaInput}>
                                Odpisane Mnozstvo:&nbsp;
                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    max="1000"
                                    value={mnozstvo}
                                    onChange={handleQuantityChange}
                                />
                            </p>
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

    export default Odpisy;
