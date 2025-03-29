/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ArtikloveProcesy from './Components/ArtikloveProcesy/ArtikloveProcesy';
import KorekciaZasob from './Components/ArtikloveProcesy/KorekciaZasob/KorekciaZasob';
import DataClearing from './Components/ArtikloveProcesy/Dataclearing/Dataclearing';
import MAXOPT from './Components/ArtikloveProcesy/MAXOPT/MAXOPT';
import Odpisy from './Components/ArtikloveProcesy/Odpisy/Odpisy';
import SkladovaKniha from './Components/SkladovaKniha/SkladovaKniha';
import KontrolnyZoznam from './Components/KontrolnyZoznam/KontrolnyZoznam';
import CreateUser from './Components/CreateUser/CreateUser';
import PrijemTovaru from './Components/PrijemTovaru/PrijemTovaru';
import ProtectedRoute from '../src/ProtectedRoute';
import PravidelneObjednavky from './Components/PrijemTovaru/PravidelneObjednavky/PravidelneObjednavky';
import ExternyDodavatelia from './Components/PrijemTovaru/ExternyDodavatelia/ExternyDodavatelia';
import MediaPrint from './Components/PrijemTovaru/MediaPrint/MediaPrint';
import MimoriadneObjednavky from './Components/PrijemTovaru/MimoriadneObjednavky/MimoriadneObjednavky';
import ArtikelInfo from './Components/ArtikelInfo/ArtikelInfo';
import DenneUlohy from './Components/DenneUlohy/DenneUlohy';
const App: React.FC = () => {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<HomePage />} />

                        <Route path="/profile" element={<ProfilePage />} />

                        <Route path='/kontrolnyZoznam' element={<KontrolnyZoznam />} />

                        <Route path='/artikloveProcesy' element={<ArtikloveProcesy />} />
                        <Route path='/artikloveProcesy/KorekciaZasob' element={<KorekciaZasob />} />
                        <Route path='/artikloveProcesy/Dataclearing' element={<DataClearing />} />
                        <Route path='/artikloveProcesy/MAXOPT' element={<MAXOPT />} />
                        <Route path='/artikloveProcesy/Odpisy' element={<Odpisy />} />
                        <Route path='/artikloveProcesy/SkladovaKniha' element={<SkladovaKniha />} />

                        <Route path='/createUser' element={<CreateUser />} />

                        <Route path='/artikelInfo' element={<ArtikelInfo />} />

                        <Route path='/prijemTovaru' element={<PrijemTovaru />} />
                        <Route path='/prijemTovaru/PravidelneObjednavky' element={<PravidelneObjednavky />} />
                        <Route path='/prijemTovaru/MimoriadneObjednavky' element={<MimoriadneObjednavky />} />
                        <Route path='/prijemTovaru/MediaPrint' element={<MediaPrint />} />
                        <Route path='/prijemTovaru/ExternyDodavatelia' element={<ExternyDodavatelia />} />

                        <Route path='/denneUlohy' element={<DenneUlohy />} />

                    </Route>
                </Routes>
            </ Router>

        </>
    );
}

export default App;