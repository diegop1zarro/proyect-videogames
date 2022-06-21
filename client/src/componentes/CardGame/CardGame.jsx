import React from "react";
import { NavLink } from "react-router-dom";
import '../../Style/CardGame.css'

export default function CardGame (props){
 return(

     <div className="containerCard">
 
<NavLink className="titleCard" to={`/videogame/${props.id}`}>
<h3 >{props.name}</h3>
</NavLink>
<img className="imagenCard" src={props.image} alt={props.name} />
<div className="infosCard">
<h4>Genres:</h4>
<p>{props.genres}</p>
</div>



     </div>
 )
}