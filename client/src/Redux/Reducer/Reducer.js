import{GET_ALL_GAMES , GET_ALL_GENRES , GET_ALL_DETAILS , GET_BY_NAME , CREATE_GAME , FILTER_ALFABETICAMENTE , FILTER_DB , FILTER_BY_GENRES , FILTER_BY_RATING,LIMPIAR_HOME,LIMPIAR_DETAIL , REFRESH , DELETE_GAME , ALL_PLATFORMS} from '../Actions/Actions.js'


const initialState = {
    games: [],
    Allgames:[],
    gameDetails:{},
    AllGenres:[],
    plataformas:[]
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type){
        case GET_ALL_GAMES:
          return{
            ...state,
            games:action.payload,
            Allgames: action.payload
          }
      case GET_ALL_GENRES:
              //  const allGenres = action.payload
        return{
          ...state,
          AllGenres: action.payload
        }
        case GET_ALL_DETAILS:
          return{
            ...state,
            gameDetails:action.payload
          }
          case GET_BY_NAME:
            
          return{
            ...state,
            games:action.payload 
          }
          case FILTER_ALFABETICAMENTE:
            let ordenado = action.payload === 'A_Z' ? state.games.sort((a, b) => {
                 if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                 if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                 return 0
               })
             : 
              state.games.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                return 0
              })
            // let ordenado = action.payload === "Asc"
            // ? state.dogs.sort((a, b) => {
            //     return a.name.localeCompare(b.name);
            //   })
            // : state.dogs.sort((a, b) => {
            //     return b.name.localeCompare(a.name);
            //   });
              console.log(ordenado)
          return{
            ...state,
            games: ordenado
          }
          case FILTER_BY_RATING:
            let enOrden =action.payload === '' ? state.Allgames : action.payload === 'Asc' ? state.games.sort((a, b) => {
                 if (a.rating > b.rating) return 1
                 if (a.rating < b.rating) return -1
                 return 0
               })
             : action.payload === 'Desc'? 
              state.games.sort((a, b) => {
                if (a.rating  > b.rating ) return -1
                if (a.rating < b.rating) return 1
                return 0
              }) : state.games
          return{
            ...state,
            games:enOrden
          }

          case FILTER_DB:
            let errorDB = {error : ' no se han encontrado resultados'}
            let gamesFilter = action.payload === 'InDataBase' ? state.Allgames.filter(e=> e.CreateDB) : action.payload === 'existentes' ? state.Allgames?.filter(e=> !e.CreateDB) : state.Allgames 
            return{
              ...state,
              // games: action.payload === 'Todos'? state.Allgames : gamesFilter
              games: gamesFilter.length ? gamesFilter : errorDB
            }
            case FILTER_BY_GENRES:
              let error = {error : ' no se han encontrado resultados'}
              let elGenre= action.payload[0]
              let genresFilter = state.Allgames.filter((e)=> e.CreateDB ? e.genres?.filter(H => H.name?.includes(elGenre))[0] : e.genres?.includes(elGenre)) 
              //  let genresFilter = state.games.filter((e)=> e.genres.includes(elGenre))
            return{
              ...state,
              games: genresFilter.length > 0 ? genresFilter : error 
            }
      case CREATE_GAME:
        return{
          ...state,
        }
       case LIMPIAR_HOME:
          return{
            ...state,
           games:[]
          }
        case LIMPIAR_DETAIL:
            return{
              ...state,
             gameDetails:{}
            }
        case REFRESH:
          
          return {
            ...state,
            games:state.Allgames
            
          }    
        case DELETE_GAME:
          return{
            ...state,
          }
          case ALL_PLATFORMS:
            return{
              ...state,
              plataformas:action.payload
            }
  
      default : return state
  };

  }

  export default rootReducer;
