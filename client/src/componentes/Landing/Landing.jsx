import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Style/Landing.css'
export default function Landing (){
    return(
        <div>
            <h1 className='titleLanding'>Bienvenido a mi página de VideoGames</h1>
            <NavLink className='algo' to='/home'>
            <button className='buttonLanding'> Ingresar </button>
            </NavLink>
        </div>
    )
}