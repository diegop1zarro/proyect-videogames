const axios = require('axios')
const {Videogame , Genres } = require('../db.js');
const {YOUR_API_KEY} = process.env
const AllInfomock = require('../../info.json')

async function getDataApi (){
 try{
  //  let api =[]
//    let apiUrl=`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
//    for(let i=0; i < 5; i++){

//      let pages = await axios.get(apiUrl)
//      pages.data.results?.map((e)=>{
//       api.push({
//         id: e.id,
//           name: e.name,
//           image: e.background_image,
//           genres: e.genres?.map(e=>e.name) ,
//           rating: e.rating,
//         platforms: e.platforms?.map(e=>e.platform.name),
          
//       })
//      })
//     apiUrl =  pages.data.next  
 
//  }
// return api

//   let i = 0
//    let apiUrl=`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
//    while(i < 5){

//      let pages = await axios.get(apiUrl)
//      pages.data.results?.map((e)=>{
//       api.push({
//         id: e.id,
//           name: e.name,
//           image: e.background_image,
//           genres: e.genres?.map(e=>e.name) ,
//           rating: e.rating,
//         platforms: e.platforms?.map(e=>e.platform.name),
          
//       })
//      })
//     apiUrl =  pages.data.next  
//  i++
//  }
// return api



return AllInfomock
// for(let i = 1 ; i <= 5 ; i++){

  // let informacioon = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)
  // let informacioon = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
//   api.push(informacioon.data.results?.map((e)=>{
//           return{
//             id: e.id,
//               name: e.name,
//               image: e.background_image,
//               genres: e.genres?.map(e=>e.name) ,
//               rating: e.rating,
//             platforms: e.platforms?.map(e=>e.platform.name),
              
//           }
// }))

// }
// return api.flat()
}
catch (error){
    console.log(error)
}
}

async function getbyName(name){
  const todos = await getAllData()
  const elJuego= todos?.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()))
  
  return elJuego
}
         
async function getDataBase(){
   const info = await Videogame.findAll({
     include:{
          model: Genres,
          attributes:['name'],
        through:{
      attributes:[],
      }
      }
    })
 return info
}
async function getAllData(){
  try {
    const InfoApi = await getDataApi()
    const InfoDB = await getDataBase()
    const AllData = InfoApi.concat(InfoDB)
    return AllData
  } catch (error) {
    console.log(error)
  }
}

async function details(id){
  let detail 
  if(id.includes('-')){
    try {
      detail = await  Videogame.findByPk(id,{
        include:{
          model: Genres,
          attributes:['name'],
             through:{
             attributes:[],
             }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }else{
  let detalle = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
  detail={
    id: detalle.data.id,
        name: detalle.data.name,
        released: detalle.data.released,
        image: detalle.data.background_image,
        rating: detalle.data.rating,
        description: detalle.data.description_raw ? detalle.data.description_raw  :detalle.data.description.replace(/<[^>]+>/g,'').replace(/[$%&|<>#]/g,'') ,
        platforms: detalle.data.platforms?.map(e=>e.platform.name),
        genres: detalle.data.genres?.map(e=>e.name)
  }
}
return detail     
}

 
async function getGenres(){
  const generos = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
  const genres = await generos.data.results?.map(e=> e.name)
  // TIENE MUCHA MAS INFO PARA SACAR
  return genres
}
async function getPlatforms(){
const laInfo= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
const plataformas = laInfo.data.results?.map(e=>{
  return{
    platforms : e.parent_platforms
  }
})
const plasdas = plataformas.map(e=>e.platforms?.map(e=>e.platform.name)).flat()
let coso =[]
for(let i = 0 ; i < plasdas.length ; i++){
  if(!coso.includes(plasdas[i])){
    coso.push(plasdas[i])
  }
}

return coso
}
module.exports={
  getAllData,
    getGenres,
    getbyName,
    details,
    getPlatforms
}