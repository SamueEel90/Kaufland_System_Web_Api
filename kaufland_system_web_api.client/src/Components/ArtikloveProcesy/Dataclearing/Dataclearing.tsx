import axios from 'axios';
import React from 'react';

function DataClearing() {
    const apiUrl = 'http://localhost:3001/ChybnyProdukt/Dataclearing';
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const eanKod = Number(formData.get("eanKod"));
        const nazov = formData.get("nazov") as string;
      

        try {
            axios.post(apiUrl,
                { eanKod, nazov },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
        }

        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <input type="text" name="nazov" placeholder="Zadaj nazov artikla"></input>
                <input type="number" name="eanKod" placeholder="Zadaj EAN kod artikla"></input>
                <button type="submit" >Vymazat</button>
            </form>
        </>
    );
}
export default DataClearing;