import {React, useEffect, useState,} from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { useParams } from 'react-router';
import { getAllDetails ,limpiarEstadoDetail , deleteGame } from '../../Redux/Actions/Actions.js';
import NavBar from '../NavBar/NavBar.jsx';
import { useNavigate } from 'react-router';
import '../../Style/GameDetail.css'


const GameDetail = () => {
    const dispatch =useDispatch()
    const {id}= useParams()
    const gameDetails = useSelector((state)=> state.gameDetails)
    const navegar = useNavigate()
    useEffect(()=>{
        dispatch(getAllDetails(id))
        return dispatch(limpiarEstadoDetail())
        
    },[dispatch,id])

    function handleDelete(e){
        e.preventDefault()
        dispatch(deleteGame(gameDetails.id))
        alert('se eliminó correctamente')
        navegar('/home')

    }
    console.log(gameDetails)
        return (
            <div>
        <NavBar/> 
        { gameDetails.name ? 
        <div className='CardDetail'>
            {gameDetails.CreateDB ? <button className='botonDelete' onClick={(e)=>handleDelete(e)}>delete</button> : null}
            <h1 className='titleDetail'>{gameDetails.name}</h1>
            <img className='imagenDetail'  src={gameDetails.image} alt={gameDetails.name}/>
            <div className='infosDetail'> 
            <h4>Genres:</h4>
            <p>{gameDetails.CreateDB? gameDetails.genres?.map(e=> e.name + ' , '): gameDetails.genres?.map(e=> e + ' , ') }</p>
            {/* <p>Genres: {gameDetails.CreateDB? gameDetails.genres?.map(e=> e.name + ','): gameDetails.genres?.map(e=> e + ',') }</p> */}
            </div>
           <div className='infosDetail'>
            <h4>Description: </h4>
            <p>{gameDetails.description}</p>
            {/* <p>Description: {gameDetails.description}</p> */}
           </div>
           
           <div className='infosDetail'>
           <h4>Released:  </h4> 
           <p>{gameDetails.released}</p> 
            {/* <p>Released: {gameDetails.released}</p>  */}
           </div>

           <div className='infosDetail'>
            <h4>Rating: </h4> 
            <p>{gameDetails.rating}</p> 
            {/* <p>Rating:  {gameDetails.rating}</p>  */}
            </div>

           <div className='infosDetail'>
            <h4>Platforms: </h4> 
            <p>{gameDetails.CreateDB? gameDetails.platforms: gameDetails.platforms?.map(e=> e + ' , ')}</p> 
            {/* <p>Platforms:  {gameDetails.CreateDB? gameDetails.platforms: gameDetails.platforms?.map(e=> e + ',')}</p>  */}
            </div> 
        </div>
      :<div>
         <div className='loading'></div>
         <p>cargando...</p>
         </div>
         }
           
       </div>
        )
    }
    export default GameDetail;
      


           

             
        