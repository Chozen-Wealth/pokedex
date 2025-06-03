import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import attack from "./assets/sword.png"
import defense from "./assets/shield.png"
import speed from "./assets/lightning.png"

function App() {

  const [data, setData] = useState("")
  const [currendId, setCurrentId] = useState(1)
  const [search, setSearch] = useState("")
  const [recherche, setRecherche] = useState("")

  const HandleClickCat = (element)=> {
    setCurrentId(element)
    setSearch("")
  }

  const HandleKeyPressEscape = (e)=> {
    if (e.key === 'Escape') {
      setSearch("")
    }
  }
  
  const HandleClickSearch = (e)=> {
    const inputSearch = document.querySelector("#searchBar")
    e.preventDefault()
    if (inputSearch.value > 898) {
      return
    }
    else if (inputSearch.value < 0) {
      return
    }
    else if (inputSearch.value === "") {
      return
    }
    else {
      setCurrentId(parseInt(inputSearch.value))
      setSearch("")
    }
  }
  
  const HandleClickPrev = ()=> {
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
      <img className='bgImg' src='https://images7.alphacoders.com/662/thumb-1920-662102.png' alt=''/>
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
          <div className="ombragePokemon"></div>
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <img key={pokemon.id} src={pokemon.image} alt={pokemon.name} />
          )): (<div className='pokemonLoading'>Loading...</div>)}
        </div>
        <div className="leftBottom">
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <span key={pokemon.id} className='pokemonName'><b>{pokemon.name}</b></span>
          )): (<div className='nameLoading'>Loading...</div>)}
          <div className='divBtns'>
            <button onClick={HandleClickPrev} className='btn prev'><svg id='prev' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
            {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <span key={pokemon.id} className='pokemonName'>{`${pokemon.id}/${data.length}`}</span>
          )): (<div className='idLoading'>Loading...</div>)}
            <button onClick={HandleClickNext} className='btn next'><svg id='next' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="pokedexRight">
        <div className='divSearch'>
        {search === "searchId" ? (
          <form className='innerDivSearch' onSubmit={(e)=> HandleClickSearch(e)}>
            <input autoFocus="true" onKeyDown={(e)=> HandleKeyPressEscape(e)} type="number" name="" id='searchBar' autoComplete='off' />
            <button onClick={HandleClickSearch}>Chercher</button>
            <button onClick={()=> setSearch("")}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg></button>
          </form>)
          : (
          <>
            <span>Rechercher : </span>
            <div onClick={()=> setSearch("searchId")} className='idBtn'>ID</div>
            <div onClick={()=> setSearch("catalogue")} className="allBtn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg></div>
            {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
              <img key={pokemon.id} className='sprite' src={pokemon.sprite} alt={pokemon.name} />
          )): (<div className='sprite'>...</div>)}
          </>
        )}
        </div>
          {data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
            <div key={pokemon.id} className='divStats' >
              <span className='statsTitle'>Pokemon stats :</span>
              <div className='contenuStats'>
                <div className="contenuStatsLeft">
                  <span className='stat'><span className='statHealth'>+</span> {pokemon.stats.HP}</span>
                  <span className='stat'><img className='statIcon' src={attack} alt="" />{pokemon.stats.attack}</span>
                  <span className='stat'><img className='statIcon' src={defense} alt="" />{pokemon.stats.defense}</span>
                  <span className='stat'><img className='statIcon' src={speed} alt="" />{pokemon.stats.speed}</span>
                </div>
                <div className="contenuStatsRight">
                  {pokemon.apiTypes.map(element => (
                    <span key={element.name} className={`element ${element.name}`}><img className='elementImg' src={element.image} alt='' /><img className='elementImgBg' src={element.image} alt='' /> <span className='elementName'>{element.name}</span></span>
                  ))}
                </div>
              </div>
            </div>
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
    {search === "catalogue" ? (
      <div className="catalogue">
        <div className='catDivSearch'>
          <input autoFocus="yes" onKeyDown={(e)=> HandleKeyPressEscape(e)} onChange={(e)=> setRecherche(e.target.value)} type="search" name="" id="catSearch" placeholder='Entrez le nom du pokemon recherché...' />
          <div onClick={()=> setSearch("")} className='catClose'><span className='xClose'>X</span></div>
        </div>
        <div className="catDivAll">
          {data ? data.filter(element => element.name.toLowerCase().includes(recherche.toLocaleLowerCase())).map(element => (
            <div onClick={()=> {HandleClickCat(element.id)}} className='divPokemon'>
              <img className='divPokemonSprite' src={element.sprite} alt="" />
              {element.name}
              </div>
          )) : "Loading..."}
        </div>
      </div>
    ): ""}
    </>
  )
}

export default App
