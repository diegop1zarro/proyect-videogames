const { Router } = require('express');
const { getAllData ,details, getGenres , getbyName , getPlatforms } = require('../controladores/index.js');
const { Videogame , Genres } = require('../db.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req,res)=>{
    const name = req.query.name
    const info = await  getAllData()
try {
if(name){
    // const juegoName = await getbyName(name)
    const filtrado = await info?.filter((e)=> e.name.toLowerCase().includes(`${name.toLowerCase()}`))
    if(filtrado.length){res.status(200).send(filtrado)}
    else{res.status(200).send({error:'error'})}
}else{ 
    res.status(200).json(info)
}
    
} catch (error) {
    res.status(404).send(error)

}

  
})


router.get('/videogame/:id', async(req,res)=>{
    const id = req.params.id
try {
if(id){
    let juegoDetalle= await details(id)
    res.status(200).send(juegoDetalle)
}else{ res.status(404).send('error')}
}catch (error) {
    res.status(404).send(error)
}
})

router.get('/genres', async(req,res)=>{
    const generos = await getGenres()
try {
    for(let i = 0 ; i < generos.length ; i++){
        await Genres.findOrCreate({
            where:{name : generos[i]},
            attributes:['name']
        })
    }
    const gnros = await Genres.findAll()
    res.status(200).send(gnros)
    // res.status(200).send(generos)
} catch (error) {
    res.status(404).send(error)
}
})

router.post('/videogames', async (req,res)=>{
    const {name,description,released,rating,platforms,genres,image,CreateDB}= req.body
    try {
        let juego = await Videogame.create({
            CreateDB,
            image,
            name,
            description,
            released,
            rating,
            platforms
            })
        let genero = await Genres.findAll({
                        where: {name : genres},
                        throught:{
                            attributes:['name']
                        }
            })

        // let laPlataformas = await Platforms.findAll({
        //     where:{name : platforms},
        //     throught:{
        //         attributes:['name']
        //     }
        // })
        juego.addGenres(genero)
        // juego.addPlatforms(laPlataformas)
        res.status(200).send('listo')
        
    } catch (error) {
            res.status(404).send(error)
            console.log(error)
        }
})

router.delete('/delete/:id', async(req,res)=>{
  try {
      
      await Videogame.destroy({
          where:{id : req.params.id},
         
      })
      res.status(200).send('eliminado')
  } catch (error) {
      res.status(404).send(error)
  }
})

router.get('/platforms', async (req,res)=>{
const dpla = await getPlatforms()
try {
    
    res.status(200).send(dpla)
} catch (error) {
    res.status(404).send({error:'ocurrió un error'})
}
})
module.exports = router;
