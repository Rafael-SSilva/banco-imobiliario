import React from 'react'
import {
Routes,
Route
} from 'react-router-dom';
import BankScreen from './pages/bank';
import CreateRoom from './pages/createRoom';
import MainPage from './pages/main';
import Participate from './pages/participate';
import PlayersScreen from './pages/players';
import TransferingScreen from './pages/transfer';

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/new" element={<CreateRoom />} />
            <Route path="/join" element={<Participate />}/>
            <Route path="/players" element={<PlayersScreen />}/>
            <Route path="/transactions" element={<TransferingScreen />}/>
            <Route path="/bank" element={<BankScreen />}/>
        </Routes>
    )
}