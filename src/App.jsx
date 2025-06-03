import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import attack from "./assets/sword.png"
import defense from "./assets/shield.png"
import speed from "./assets/lightning.png"

import radar from "../public/radar.mp3"
import like from "../public/like.mp3"
import likeIcon from "./assets/like.svg"

function App() {

  const [data, setData] = useState("")
  const [currendId, setCurrentId] = useState(1)
  const [search, setSearch] = useState("")
  const [recherche, setRecherche] = useState("")
  const [favoris, setFavoris] = useState([])
  const [ouvert, setOuvert] = useState(false)
  
  const [anime, setAnime] = useState(false)

  
  const soundRadar = new Audio(radar)
  
  const HandleClickAllBtn = ()=> {
    setSearch("catalogue")
    setAnime(false)
  }
  
  const HandleClickClose = ()=> {
    setAnime(true)
    setTimeout(()=> {
      setSearch("")
      setRecherche("")
    }, 300)
  }
  
  const HandleClickCat = (element)=> {
    setCurrentId(element)
    setAnime(true)
    setSearch("")
    setRecherche("")
  }
  
  const HandleKeyPressEscape = (e)=> {
    if (e.key === 'Escape') {
      setSearch("")
      setRecherche("")
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
  

  // 
  const HandleClickPrev = ()=> {
    if (currendId <= 1) {
      setCurrentId(898)
    }
    else {
      setCurrentId(prev => prev - 1)
    }
  }
  const HandleClickNext = ()=> {
    if (currendId >= data.length) {
      setCurrentId(1)
    }
    else {
      setCurrentId(prev => prev + 1)
    }
  }


  // Ajout aux favoris
  const Liker = (element)=> {
    if (favoris.includes(element)) {
      const newFav = favoris.filter(truc => truc !== element)
      setFavoris(newFav)
    }
    else {
      new Audio(like).play()
      setFavoris(prev => [...prev, element])
    }
  }
  useEffect(()=>{
    console.log(favoris)
  }, [favoris])
  

  const HandleClickApi = ()=> {
    axios.get("https://pokebuildapi.fr/api/v1/pokemon")
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }
  // IMPORTATION DE L'API
  // useEffect(()=>{
  //     axios.get("https://pokebuildapi.fr/api/v1/pokemon")
  //     .then(response => setData(response.data))
  //     .catch(error => console.log(error))
  // },[])

  return (
    <>
    {/* <button onClick={()=> {setOuvert(!ouvert); HandleClickApi()}} className='btnOpenClose'>OUVRIR/FERMER</button> */}
      <img className='bgImg' src='https://images7.alphacoders.com/662/thumb-1920-662102.png' alt=''/>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
    <div className={`pokedex ${ouvert ? "open" : ""}`}>
      <div className='pokedexLeft'>

        <div className="leftTop">
          <div className='screw b1'>/</div>
          <div className='screw b2'>/</div>
          <div className='screw b3'>/</div>
          <div className='screw b4'>/</div>
          <div className='screw b5'>/</div>
          <div className='screw b6'>/</div>
          {/* Boule lumière */}
          {ouvert ? (
          <div className={`data ${data ? "active" : "notActive"}`}>
            <div className='dataLight'></div>
          </div>

          ): (
            <div className={`data`}>
            <div className='dataLight'></div>
          </div>
          )}
          {/* Texte Found */}
          {ouvert ? (
            <span className={`found ${data ? "active" : ""}`}>{data ? "DATA FOUND !" : "WAITING FOR DATA"}</span>
          ): (
            <span className={`found notActive`}></span>
          )}
        </div>
        <div className={`leftMid ${ouvert ? "" : "closed"}`}>
          {ouvert ? (
            data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
              <>
            <div key={pokemon.id} onClick={()=> Liker(pokemon.id)} className='likeBtn'>
              <svg className={`like ${favoris.includes(pokemon.id) ? "active" : ""}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
            </div>
            <img src={pokemon.image} alt={pokemon.name} />
            </>
          )): (
            <div className='pokemonLoading'>identification...</div>)
          ):""}
        </div>
        <div className={`leftBottom ${ouvert ? "" : "closed"}`}>
          {ouvert ? (

            data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
              <span key={pokemon.id} className='pokemonName'><b>{pokemon.name}</b></span>
            )): (<div className='nameLoading'>Identification...</div>)
          ) : (<span className={`pokemonName ${ouvert ? "" : "off"}`}>.</span>)}
          <div className='divBtns'>
            <button onClick={HandleClickPrev} className='btn btnPrev prev'><svg id='prev' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
            {ouvert ? (

              data ? data.filter(pokemon => pokemon.id === currendId).map(pokemon => (
                <span key={pokemon.id} className='pokemonName'>{`${pokemon.id}/${data.length}`}</span>
              )): (
                <div className='idLoading'></div>
                // <span className='pokemonName'>?/898</span>
              )
            ) : (<div className={`idLoading`}></div>)}
            <button onClick={HandleClickNext} className='btn btnNext next'><svg id='next' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="blockDroit">
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
      <div className={`pokedexRight ${ouvert ? "ouvert" : "close"}`}>
        <div className='screw b7'>/</div>
          <div className='screw b8'>/</div>
          <div className='screw b9'>/</div>
          <div className='screw b10'>/</div>
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
            <div onClick={()=> HandleClickAllBtn()} className="allBtn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg></div>
            <div onClick={()=> setSearch("favoris")} className="allBtn"><svg className='favoris' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></div>
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
          )): (<div className='divStats' >
              <span className='statsTitle'>Pokemon stats :</span>
              <div className='contenuStats'>
                <div className="contenuStatsLeft">
                  <span className='stat'><span className='statHealth'>+</span>00</span>
                  <span className='stat'><img className='statIcon' src={attack} alt="" />00</span>
                  <span className='stat'><img className='statIcon' src={defense} alt="" />00</span>
                  <span className='stat'><img className='statIcon' src={speed} alt="" />00</span>
                </div>
                <div className="contenuStatsRight">
                    <span className="element"><span className='elementName'>Element</span></span>
                </div>
              </div>
            </div>)}
            <div onClick={()=> setOuvert(false)} className='closeOffBtn'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z"/></svg></div>
      </div>
      <div onClick={()=> {setOuvert(true); HandleClickApi()}} className={`divBordDroit ${ouvert ? "ouvert" : "close"}`}>
            <span className='openText'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419ZM167-620q-13-22-20-47.5t-7-52.5q0-83 58.5-141.5T340-920q83 0 141.5 58.5T540-720q0 27-7 52.5T513-620l-69-40q8-14 12-28.5t4-31.5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 17 4 31.5t12 28.5l-69 40Zm335 280Z"/></svg>Ouvrir</span>
            <div className="bordDroit"></div>
      </div>
      <div className="faceArriere"></div>
            </div>
    </div>
    {search === "catalogue" ? (
      <div className={`catalogue ${anime ? "fermer" : ""}`}>
        <div className='catDivSearch'>
          <input autoComplete='off' autoFocus="yes" onKeyDown={(e)=> HandleKeyPressEscape(e)} onChange={(e)=> setRecherche(e.target.value)} type="search" name="" id="catSearch" placeholder='Entrez le nom du pokemon recherché...' />
          <div onClick={()=> HandleClickClose()} className='catClose'><span className='xClose'>X</span></div>
        </div>
        <div className="catDivAll">
          {data ? data.filter(element => element.name.toLowerCase().includes(recherche.toLocaleLowerCase())).map(element => (
            <div key={element.id} onClick={()=> {HandleClickCat(element.id)}} className='divPokemon'>
              <span className='idPokemon'>{element.id}</span>
              <img className='divPokemonSprite' src={element.sprite} alt="" />
              {element.name}
              </div>
          )) : (<div className='catLoading'>Chargmeent de la liste ...</div>)}
        </div>
      </div>
    ): search === "favoris" ? (
      <div className={`catalogue`}>
        <div className='catDivSearch'>
          <span className='favorisTitre'>Mes favoris : </span>
          {/* <input autoComplete='off' autoFocus="yes" onKeyDown={(e)=> HandleKeyPressEscape(e)} onChange={(e)=> setRecherche(e.target.value)} type="search" name="" id="catSearch" placeholder='Entrez le nom du pokemon recherché...' /> */}
          <div onClick={()=> HandleClickClose()} className='catClose closeFav'><span className='xClose'>X</span></div>
        </div>
        <div className="catDivAll">
          {data ? data.filter(element => favoris.includes(element.id)).map(element => (
            <div key={element.id} onClick={()=> {HandleClickCat(element.id)}} className='divPokemon'>
              <span className='idPokemon'>{element.id}</span>
              <img className='divPokemonSprite' src={element.sprite} alt="" />
              {element.name}
              </div>
          )) : (<div className='catLoading'>Chargmeent de la liste ...</div>)}
        </div>
      </div>
    ): ""}
    </>
  )
}

export default App
