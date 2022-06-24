import React, { useState , useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar.jsx'
import {getAllGenres , createGame , getAllPlatforms} from '../../Redux/Actions/Actions.js'
import '../../Style/Create.css'


 function validate (input) {
  let errors = {};
  if (!/[A-Z]/.test(input.name)) {       // la primera letra en mayusculas
    errors.name = 'La primera letra debe ser en mayusculas';
  } else if (!/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(input.released)) {
    errors.released = 'debes colocar año, mes y dia separados por un guion en medio';
  }
  else if(input.rating > 5 || input.rating<0){   // cualquier numero y guiones
    errors.rating = 'las puntuaciones deben ser de 0 a 5'
  }else if (input.description === 0 || input.description.length > 800){  
    errors.description = 'description es obligatoria y debe contener menos de 800 letras'
  
  }else if(!input.platforms.length){
    errors.platforms = 'Debes elegir una o mas plataformas'
}
  else if(!input.genres.length){
      errors.genres = 'debes elegir un genero '
  }
  return errors;
};
// image = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
// fecha =^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$

export default function  CreateGame() {
    const AllGenres = useSelector((state)=> state.AllGenres)
    const plataformas = useSelector((state)=> state.plataformas)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllGenres())
        dispatch(getAllPlatforms())
    },[dispatch])

  const [input, setInput] = useState({
    name: '',
    released:'',
    rating:0,
    description:'',
    image:'',
    platforms:[],
    genres: []
  });
  const [errors, setErrors] = useState({});
console.log(errors)
  const handleInputChange =(e)=>{
      e.preventDefault()
      setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    function handleSelect(e){
        e.preventDefault()
        if(input.genres?.includes(e.target.value)){
            return null
        }else{
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
               
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
    
            }));

        }
    }
    function SelectPlatforms(e){
        e.preventDefault()
        if(input.platforms.includes(e.target.value)){
            return null
        }else{
        setInput({
           ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            // [e.target.name]: e.target.value
            platforms: [...input.platforms, e.target.value]
    
        }));
    }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const errorSave = validate(input)
        if(Object.values(errorSave).length !== 0){
            alert('Debes completar los campos requeridos y no tener errores')
        }else{
            dispatch(createGame(input))
        //   console.log(input)
          alert('videojuego creado')
          setInput({
            name: '',
            released:'',
            rating:0,
            description:'',
            image:'',
            platforms:[],
            genres: []
          })
          setErrors({})

        }
}
function handleDelete(Genre){
    setInput({
        ...input,
        genres: input.genres.filter(e => e !== Genre)
    })
}
function handleDeletePlataforma(Plataforma){
    setInput({
        ...input,
        platforms: input.platforms.filter(e => e !== Plataforma)
    })
}
  
return (
<div>
    <NavBar/>

<form className='contenedorCreate'  onSubmit={(e)=> handleSubmit(e)}>
    <p> Los datos marcados con un (*) son de caracter obligatorios </p>
<div className='contenedorMenor'>
<label className='labelCreate'>Nombre *: </label>  
<input className='inputsCreate' type='text' value={input.name} name='name' 
placeholder='Nombre del juego' onChange={(e)=>handleInputChange(e)} />
{errors.name && (<p className='error'>{errors.name}</p>)}
</div>

<div className='contenedorMenor'>
<label className='labelCreate'>Descripcion *: </label>
<input className='inputsCreate' type='text' value={input.description} name='description' 
placeholder='descripcion del juego' onChange={(e)=>handleInputChange(e)} />
{errors.description && (<p className='error'>{errors.description}</p>)}
</div>

<div className='contenedorMenor'>
<label className='labelCreate'>Fecha de realizacion *: </label>
<input className='inputsCreate' type='text' value={input.released} name='released' 
placeholder='AAAA-MM-DD' onChange={(e)=>handleInputChange(e)}/>
{errors.released && (<p className='error'>{errors.released}</p>)}
</div>

<div className='contenedorMenor'>
<label className='labelCreate'>Rating*: </label>
<input className='inputsCreate' type='number' value={input.rating} name='rating' 
placeholder='example: 20-24' onChange={(e)=>handleInputChange(e)} />
{errors.rating && (<p className='error'>{errors.rating}</p>)}
</div>

<div className='contenedorMenor'>
<label className='labelCreate'>Image: </label>
<input className='inputsCreate' type='url' value={input.image} name='image' 
placeholder='url image' onChange={(e)=>handleInputChange(e)} />
</div>

<div className='contenedorMenor'>
<label className='labelCreate'>Plataformas *: </label>
<select onChange={(e)=> SelectPlatforms(e)}>
<option defaultValue='' disabled selected>Selecciona las plataformas</option>

    {plataformas?.map((laPlataforma , e) => (
        <option key={e}  value={laPlataforma}>{laPlataforma}</option>
    ))}
</select>
{errors.platforms && (<p className='error'>{errors.platforms}</p>)}
</div>


{input.platforms?.map(plataforma=>
    <div className='inputsPYG' key={plataforma}>
       <p>{plataforma}</p> 
<button className='botonDelete' onClick={()=> handleDeletePlataforma(plataforma)}>x</button>
    </div>
)}

<div className='contenedorMenor'>
<label className='labelCreate'>Generos *: </label>
<select onChange={(e)=> handleSelect(e)}>
<option defaultValue='' disabled selected>Selecciona los genero</option>

    {AllGenres?.map((elGenero, i ) => (
        <option key={i} value={elGenero.name}>{elGenero.name}</option>
    ))}
</select>
    {errors.genres && <p className='error'>{errors.genres}</p>}
</div>    


{input.genres?.map(genero=>
    <div className='inputsPYG' key={genero}>
       <p>{genero}</p> 
<button className='botonDelete' onClick={()=> handleDelete(genero)}>x</button>
    </div>
)}

<button type='submit' className='botonCreate'  >Create Game</button>
</form>
</div>
);
};