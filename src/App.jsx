import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState("")
  const [currendId, setCurrentId] = useState(1)
  
  const handleClickPrev = ()=> {
    if (currendId <= 1) {
      return
    }
    else {
      setCurrentId(prev => prev - 1)
    }
  }
  const HandleClickNext = ()=> {
    if (currendId >= data.length) {
      return
    }
    else {
      setCurrentId(prev => prev + 1)
    }
  }
  
  useEffect(()=>{
    axios.get("https://pokebuildapi.fr/api/v1/pokemon")
    .then(response => setData(response.data))
    .catch(error => console.log(error))
  },[])
  

  return (
    <>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
    <div className='pokedex'>
      <div className='pokedexLeft'>
        <div className="leftTop">
          <div className='data'>
            <div className='dataLight'></div>
          </div>
          <span className={`found ${data ? "active" : ""}`}>{data ? "DATA FOUND !" : "DATA NOT FOUND !"}</span>
        </div>
        <div className="leftMid">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <img src={pokemon.image} alt="" />
          )): "loading..."}
        </div>
        <div className="leftBottom">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <span className='pokemonName'>{`${pokemon.id}/${data.length}`} {pokemon.name}</span>
          )): "loading..."}
          <div className='divBtns'>
            <button onClick={handleClickPrev} className='btn prev'><svg id='prev' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
            <button onClick={HandleClickNext} className='btn next'><svg id='next' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="pokedexRight">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <>
            <img className='sprite' src={pokemon.sprite} alt="" />
            <span>HP : {pokemon.stats.HP}</span>
            <span>Att : {pokemon.stats.attack}</span>
            <span>Def : {pokemon.stats.defense}</span>
            <span>Spe : {pokemon.stats.speed}</span>
            </>
          )): "loading..."}
      </div>
      <div className='pokedexMilieu'></div>
    </div>
    </>
  )
}

export default App
