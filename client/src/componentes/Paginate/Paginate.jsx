import React from "react";
import '../../Style/Pagination.css'

function Paginate (props){
    const nroDePagina = []
    for(let i = 0; i <= Math.ceil( props.games/props.gamesPorPage)-1; i++){
        nroDePagina.push(i + 1)
    }
   
    
 return (
    
    <nav>
      { props.paginaActual - 1 === 0 ? null :  <button  className="PrevNextPagination"  onClick={()=> props.prevPage()}>anterior</button>}

        {props.games <= 15 ? props.paginado(1) :  nroDePagina && nroDePagina.map(numero=>(
                    <button key={numero} className="paginationBttns"  onClick={() => props.paginado(numero)}>{numero}</button>
            ))
        }
      { props.paginaActual +1 > nroDePagina.length ? null : <button  className="PrevNextPagination"  onClick={()=> props.NextPage()}>siguiente</button>}

    </nav>
 )
}


export default Paginate;   