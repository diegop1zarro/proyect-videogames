import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';

import { getAllGames,limpiarEstadoHome,Refresh,filterByOrder , getAllGenres , filterDB , filterByGenres,filterByOrderRating} from '../../Redux/Actions/Actions.js'
import CardGame from '../CardGame/CardGame.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import Paginate from '../Paginate/Paginate.jsx'
import Search from '../Search/Search.jsx';
import Loading from '../Loading/Loading.jsx'
import '../../Style/Home.css'
import { Link } from 'react-router-dom';

function Home(){
const dispatch = useDispatch()
const games = useSelector((state)=> state.games)
const allGenres = useSelector((state)=> state.AllGenres)
// const [name, setName]= useState('')
useEffect(()=>{
  dispatch(getAllGames())
  dispatch(getAllGenres())
  // setPaginaActual(1)
  
},[dispatch])
console.log(games)

//PAGINADO
const [paginaActual , setPaginaActual] = useState(1)
const [gamesPorPage] = useState(15)
const ultimoGamePorPage = paginaActual * gamesPorPage
const primerGamePorPage = ultimoGamePorPage - gamesPorPage
const GamesActuales = games.error ? 0: games.slice(primerGamePorPage ,ultimoGamePorPage)
const paginado = (nroDePagina)=>{
  setPaginaActual(nroDePagina)
}

const prevPage = () => {
 setPaginaActual( paginaActual - 1 );
}
const NextPage = () => {
 setPaginaActual( paginaActual +1);
} 


//FILTROS
const [orden , setOrden]= useState()

const [genres , setGenres] = useState({
  option: []
})
const handleRefresh=(e)=> {
  e.preventDefault()
    dispatch(limpiarEstadoHome())
    dispatch(getAllGames())
    // dispatch(Refresh())
    dispatch(filterByOrder(''))
  };
const handleSortAlf=(e)=>{
  e.preventDefault()
  dispatch(filterByOrder(e.target.value))
  setPaginaActual(1)
  setOrden(e.target.value)
}   
const handleSelect=(e)=>{
  setGenres({
   ...genres ,
   option: [e.target.value]
 })
 setPaginaActual(1)
 }

 const filterGenres = (e)=>{
   e.preventDefault()
 dispatch(filterByGenres(genres.option))
 setPaginaActual(1)
   setGenres({
     ...genres,
     option: []
     })

   }

   const handleOrdenRating=(e)=>{
    e.preventDefault()
    dispatch(filterByOrderRating(e.target.value))
    setPaginaActual(1)
    setOrden(e.target.value)
  
  } 

const handleDB = (e)=>{
  dispatch(filterDB(e.target.value))
  setPaginaActual(1)
}   
return (


    <div>
      <NavBar/>
   {/* //FILTROS */}
   <div className='filtros'>
   <div >
          <p  className='titleFilter'>Alfabeticamente</p>
<select className='selectores' onChange={(e)=> handleSortAlf(e)}>
<option  value='seleccionar' disabled selected>Selecciona una opción</option>
 <option className='option' value='A_Z' >A - Z</option>
 <option className='option' value='Z_A' >Z - A</option>
</select>
</div>

<div >
         <p className='titleFilter'>Por generos</p>
<select className='selectores' onChange={(e)=> handleSelect(e)}>
<option  defaultValue='' disabled selected>Selecciona una opción</option>
{allGenres.map((ElGenre, i )=> (
  <option className='option' key={i}  value={ElGenre.name}>{ElGenre.name}</option>
  ))}
  
</select>
<button className='botonFilter' onClick={(e)=> filterGenres(e)}>Filtrar</button>

</div>

<div >
            <p className='titleFilter'> Por Rating</p>
<select className='selectores' onChange={(e)=> handleOrdenRating(e)}>
<option value='' disabled selected>Selecciona una opción</option>
   <option className='option' value='Asc'> menor a mayor</option>
  <option className='option' value='Desc'>mayor a menor</option>
</select>
</div>

<div >
   <p className='titleFilter'>Juegos...</p>
<select className='selectores' onClick={(e)=> handleDB(e)}>
<option defaultValue='' disabled selected>Selecciona una opción</option>
  <option className='option' value='Todos'>Todos los juegos</option>
  <option className='option' value='existentes'>Existentes</option>
  <option className='option' value='InDataBase'>Creados por mí</option>
</select>
</div>
</div>

<div className='SRC'>
      <button className='botonRefresh' onClick={(e)=> handleRefresh(e)}> Refresh page</button>
      <Link to='/videogames'>
      <button className='botonRefresh'> Crear Juegos</button>
      </Link>
      <Search/> 
</div>
      <Paginate 
      paginaActual={paginaActual}
      prevPage = {prevPage}
      NextPage = {NextPage}
      gamesPorPage={gamesPorPage}
      games={games.length}
      paginado= {paginado}
      />

      { games.error || games.errorDB ? <div className='errorHome'> no se ha encontrado el resultado</div>:
      GamesActuales.length > 0 ? (
        GamesActuales?.map((game) => {
         return (
           <div key={game.id}>

             <CardGame
             key={game.id}
             name= {game.name}
             image= {game.image}
             id={game.id}
             genres={game.CreateDB ?  game.genres.map(e=> e.name +' , ') :game.genres.map(e=> e + ' , ')}
            // CreadoPorDiego={ game.Creado_por_Diego ? game.Creado_por_Diego: 'Existente'}
            /> </div> ) } )
            ): <Loading/>
                   
          }
        
            </div>
    )
  }
  export default Home


    
