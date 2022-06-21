import {React ,useState} from 'react'
import {useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { getByName , limpiarEstadoHome} from '../../Redux/Actions/Actions.js'
import '../../Style/Search.css'
// /^[0-9a-zA-ZÁ-ÿ.:-\s]{0,40}$/

function validacion(name){
    // ^[^$%&|<>#]*$
    // /^[A-Za-z0-9]+$/g
    let error = ''
    if(!/^[A-Za-z0-9-ñ\s]+$/g.test(name)){
        // if(/[$%&|<>#]/.test(name)){
        error = 'no se pueden colocar caracteres especiales'
    }else if(name.length > 30){
        error = 'no se puede colocar mas de 30 letras'
    }
    return error
}

export default function Search (){
const [name, setName]= useState('')
const [error, setError] = useState('')
const dispatch = useDispatch()
// const navegar = useNavigate()

function handleInputSearch(e){
    e.preventDefault()
    setName(e.target.value)
    setError(validacion(e.target.value))
}
function handleSubmitSearch(e){
    e.preventDefault();
    const errorSave = validacion(name)
    if(Object.values(errorSave).length !== 0){
        alert('no debes tener errores para poder buscar')
    }else{
    e.preventDefault()
    // navegar('/home')
  dispatch(limpiarEstadoHome())
    dispatch(getByName(name))
    setName('')
    setError('')
    }
}
return(
    <div>
    <input
    className='inputSearch'
    type='text'
    value={name}
    placeholder=' search by name'
    onChange={(e)=> handleInputSearch(e)}
    />
   <button className='botonSearch' type='submit' onClick={(e)=> handleSubmitSearch(e)}>search</button>
     {error && (<div className='errorSearch'>{error}</div>)}
   </div>
   )
}

    
    
       
      
        





