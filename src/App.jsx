import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState("")
  const [currendId, setCurrentId] = useState(1)
  const [search, setSearch] = useState("")
  
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
          <div className='screw b1'>/</div>
          <div className='screw b2'>/</div>
          <div className='screw b3'>/</div>
          <div className='screw b4'>/</div>
          <div className='screw b5'>/</div>
          <div className='screw b6'>/</div>
          <div className='screw b7'>/</div>
          <div className='screw b8'>/</div>
          <div className='screw b9'>/</div>
          <div className='screw b10'>/</div>
          <div className={`data ${data ? "active" : ""}`}>
            <div className='dataLight'></div>
          </div>
          <span className={`found ${data ? "active" : ""}`}>{data ? "DATA FOUND !" : "WAITING FOR DATA"}</span>
        </div>
        <div className="leftMid">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <img src={pokemon.image} alt="" />
          )): "loading..."}
        </div>
        <div className="leftBottom">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <span className='pokemonName'><b>{pokemon.name}</b></span>
          )): "loading..."}
          <div className='divBtns'>
            <button onClick={handleClickPrev} className='btn prev'><svg id='prev' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
            {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <span className='pokemonName'>{`${pokemon.id}/${data.length}`}</span>
          )): "loading..."}
            <button onClick={HandleClickNext} className='btn next'><svg id='next' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="pokedexRight">
        <div className='divSearch'>
        {search ? "" : (
          <>
            <span>Rechercher : </span>
            <div className='searchBtn'><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="black"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></div>
            <div className='idBtn'>ID</div>
            <div className="allBtn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg></div>
            {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
              <img className='sprite' src={pokemon.sprite} alt="" />
          )): "..."}
          </>
        )}
        </div>
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <>
            <span>Pokemon stats :</span>
            <span>HP : {pokemon.stats.HP}</span>
            <span>Att : {pokemon.stats.attack}</span>
            <span>Def : {pokemon.stats.defense}</span>
            <span>Spe : {pokemon.stats.speed}</span>
            </>
          )): "loading..."}
      </div>
      <div className='pokedexMilieu'>
        <div className='barreDiv'>

        <div className='barreHorizontale'></div>
        <div className='barreHorizontale'></div>
        </div>
        <div className='barreDiv'>

        <div className='barreHorizontale'></div>
        <div className='barreHorizontale'></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
