// import React, { useEffect, useState } from 'react';
// import { useDispatch , useSelector} from 'react-redux';
// import {filterByOrder, filterDB , filterByGenres,filterByOrderRating} from '../../Redux/Actions/Actions.js'


// function Filter(){
// const dispatch = useDispatch()
// const [orden , setOrden]= useState()


// const handleSortAlf=(e)=>{
//   e.preventDefault()
//   dispatch(filterByOrderRating(e.target.value))
//   // setPageActual(1)
//   // setOrden(e.target.value)
// }
      
//         const handleOrdenPeso=(e)=>{
//         e.preventDefault()
//         dispatch(filterByOrderRating(e.target.value))
//         // setPageActual(1)
//         // setOrden(e.target.value)
      
//       }  
        
//         // const handleSelect=(e)=>{
//         //  setTemperament({
//         //   ...temperament ,
//         //   option: [e.target.value]
//         // })
//         // setPageActual(1)
//         // }
      
//     //     const filterTemperament = (e)=>{
//     //       e.preventDefault()
//     //     dispatch(filterByTemperament(temperament.option))
//     //       setTemperament({
//     //         ...temperament,
//     //         option: []
//     //         })
//     //       }
      
//     //   const handleDelete=(temperamento)=>{
//     //         setTemperament({
//     //             ...temperament,
//     //             option: temperament.option.filter(e => e !== temperamento)
//     //         })
//     //     }
      
//        const handleDB = (e)=>{
//         dispatch(filterDB(e.target.value))
//       }   
// return(
//     <div>
    
// <div>
//     <h3 className='h3'>Options to order...</h3> 
//     <meta charset="UTF-8"/>

// <div className='filtros'>



// <div>
//          <p className='titulitos'> By weight</p>
// <select onChange={(e)=> handleOrdenPeso(e)}>
// <option defaultValue='' disabled selected>Selecciona una opción</option>
// <option value='Asc'> menor a mayor</option>
// <option value='Desc'>mayor a menor</option>
// </select>
// </div>


// <div>
//       <p className='titulitos'>by Temperament</p>
// <select onChange={(e)=> handleSelect(e)}>
// <option defaultValue='' disabled selected>Selecciona una opción</option>
// {Alltemperaments.map((Eltemperamento, i )=> (
// <option key={i}  value={Eltemperamento.name}>{Eltemperamento.name}</option>
// ))}

// </select>
// <button onClick={(e)=> filterTemperament(e)}>Filter</button>
// {temperament.option?.map(temperamento=>
//  <div key={temperamento} >
//     <p >{temperamento}</p> 
// <button  onClick={()=> handleDelete(temperamento)}>x</button>
//  </div>
// )}
// </div>

// <div>
// <p className='titulitos'>Choice of dogs</p>
// <select onClick={(e)=> handleDB(e)}>
// <option value='Todos'>All the dogs</option>
// <option value='existentes'>Existings</option>
// <option value='InDataBase'>Created by me</option>
// </select>

// <div>
//           <p  className='titulitos'>Alphabetically</p>
// <select onChange={(e)=> handleSortAlf(e)}>
// <option defaultValue='' disabled selected>Selecciona una opción</option>
//  <option value='A_Z' >A - Z</option>
//  <option value='Z_A' >Z - A</option>
// </select>
// </div>
// </div> 

// )

// }
// export default Filter