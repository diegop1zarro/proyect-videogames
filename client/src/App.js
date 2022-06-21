import './App.css';
import {Route , Routes} from 'react-router-dom';
import  Landing  from './componentes/Landing/Landing.jsx';
import Home from './componentes/Home/Home.jsx';
import GameDetail from './componentes/GameDetail/GameDetail';
import CreateGame from './componentes/CreateGame/CreateGame';
function App() {
  return (
    <div className="App">
       <Routes>
<Route  exact path='/' element={<Landing/>}  /> 
 <Route  path='/home' element={<Home/>} />
 <Route path='/videogame/:id' element={<GameDetail/>} />
<Route path='/videogames' element={<CreateGame/>}/>


      </Routes>
    </div>
  );
}

export default App;
