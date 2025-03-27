import styles from './ArtikloveProcesy.module.css';
import { Link } from 'react-router';

const ArtikloveProcesy: React.FC = () => {
    return (
        <>    <div className={styles.page}>

            <div className={styles.buttonContainer}>

                <Link to={"KorekciaZasob"} className={styles.link}><button className={styles.button}>Korekcia Zasob</button></Link>
                <Link to={"Dataclearing"} className={styles.link}><button className={styles.button}>Dataclearing</button></Link>
                <Link to={"MAXOPT"} className={styles.link}><button className={styles.button}>MAX / OPT</button></Link>
                <Link to={"Odpisy"} className={styles.link}><button className={styles.button}>Odpisy</button></Link>
                <Link to={"SkladovaKniha"} className={styles.link}><button className={styles.button}>SkladovaKniha</button></Link>
            </div>
        </div>
        </>
    );
};

export default ArtikloveProcesy;