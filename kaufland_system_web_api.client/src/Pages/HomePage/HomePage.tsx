import React from 'react';

import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import profilePicture from '../../Assets/profile_icon.png';
import LogoutButton from '../../Components/LogoutButton/LogoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const HomePage: React.FC = () => {
    const role = useSelector((state: RootState) => state.role.role);
    console.log(role);
    return (
        <>
            <Link to="/profile">
                <img className={styles.picture} src={profilePicture} alt="profilepic"></img>
            </Link>

            <div className={styles.page}>

                <h1 className={styles.title}>Kaufland</h1>
                <div className={styles.buttonContainer}>
                    <Link className={styles.link} to="/kontrolnyZoznam"><button className={styles.button}>Kontrolny Zoznam</button></Link>
                    <Link className={styles.link} to="/denneUlohy"><button className={styles.button}>Denne Ulohy</button></Link>
                    <Link className={styles.link} to="/artikelInfo"><button className={styles.button}>Artikel Info</button></Link>
                    <Link className={styles.link} to="/artikloveProcesy"><button className={styles.button}>Artiklove Procesy</button></Link>
                    <Link className={styles.link} to="/prijemTovaru"><button className={styles.button}>Prijem Tovaru</button></Link>
                    <Link className={styles.link} to="/oznacenieTovaru"><button className={styles.button}>Oznacenie Tovaru</button></Link>

                    {role === 1 && (
                        <Link className={styles.link} to="/createUser">
                            <button className={styles.button}>Vytvor Pouzivatela</button>
                        </Link>
                    )}
                </div>
            </div>
            <LogoutButton />
        </>
    );
}

export default HomePage;