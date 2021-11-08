import React from 'react';
import './ChatIntro.css';
import ChatIntroImg from '../assets/whatsapp-intro.png';

export default () => {
    return(
        <div className='chatIntro'>
            <img src={ChatIntroImg} alt="" />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens.<br></br>Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
        </div>
    );
}