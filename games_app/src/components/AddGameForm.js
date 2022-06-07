import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100vw;
  position: fixed;
  background-color: #00000080;
  top: 0;
  left: 0;
`;

const FormContainer = styled.div`
  padding: 50px;
  width: 600px;
  height: 400px;
  border-radius: 25px;
  background-color: #fff;
  margin: 75px auto 0;
  overflow-Y: auto;

  .platforms-list {
    grid-area: platforms;
    font-size: 12px;
    ul {
      padding: 0;
      list-style: none;
      margin: 0;
      display: flex;
      gap: 7px;
      flex-wrap: wrap;
      margin-top: 5px;

      li {
        white-space: nowrap;
        padding: .2em .5em;
        border-radius: .7em;
        background: rgb(255,244,0);
        background: linear-gradient(153deg,rgb(30 140 20) 12%,hsl(115deg 75% 40%) 50%,hsl(115deg 75% 55%) 85%);
        cursor: pointer;
      }
    }
  }
`;

const SelectContainer = styled.div`
  #optionsContainer {
    overflow: hidden;
  }
`;

const PlatformsSelector = (props) => {
  const { platforms, formValues, setPlatforms, setFormValues, selected } = props

  const handleSelectPlatform = (e) => {
    setFormValues({...formValues, platforms:  formValues.platforms.concat(e.target.innerHTML) })
    setPlatforms(platforms.filter((platform) => platform.name !== e.target.innerHTML ))
  }

  const handleDeSelectPlatform = (e) => {
    setPlatforms(platforms.concat({ name: e.target.innerHTML }))
    setFormValues({...formValues, platforms: formValues.platforms.filter((platform) => platform !== e.target.innerHTML)})
  }

  if (selected && formValues.platforms.length > 0) { 
    return (
      <ul>
      {
        formValues.platforms.map((platform) => (
          <li key={platform} onClick={handleDeSelectPlatform} value={platform}>
            { platform }
          </li>
        ))
      }
      </ul>
    )
  }

  if (!selected && platforms.length > 0) { 
    return (
      <ul>
      {
        platforms.map((platform) => (
          <li key={platform.name} onClick={handleSelectPlatform} value={platform.name}>
            { platform.name }
          </li>
        ))
      }
      </ul>
    )
  }

  return (<></>)
}

const PublishersSelect = ({ publishers, setFormValues, formValues }) =>  {
  const [selected, setSelected] = useState('Distribuidores')
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => {
    setOpen(!open)
  }

  const handleSelectPublisher = (e) => {
    setSelected(e.target.innerHTML)
    setFormValues({ ...formValues, publisher: e.target.innerHTML })
    setOpen(false)
  }

  return (
    <SelectContainer>
      <button type="button" id="selectPublisher" onClick={handleOpen}>{ selected }</button>
      <div id="optionsContainer" style={ open ? { height: '100%' } : { height: 0 } }>
        {publishers.map((publisher, i) => (
          <div key={i} className="option" onClick={handleSelectPublisher}>{ publisher.name }</div>
        ))}
      </div>
    </SelectContainer>
  )
}

const Missing = ({ type, setValue, name, previous }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    axios.post(`/api/${type}`, { name: inputValue } ).then((response) => {
      setValue(previous.concat(response.data))
    }).catch((error) => {
      console.log(error.response.status)
    })
  }

  const handleToggleForm = () =>{
    setOpen(!open)
    setInputValue('')
  }

  return (
    <div>
      <button type="button" onClick={handleToggleForm}>No encuentras tu { name } ?</button>
      <div style={open ? { height: '30px', overflow: "auto" } : { height: 0, overflow: "auto" } }>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
        <button type="button" onClick={handleSend}>Enviar { name }</button>
      </div>
    </div>
  )
}

const AddGameForm = ({ visible, setVisible, setGames, games }) => {
  const initialValues = { title: '', developer: '', publisher: '', releaseDate: '', platforms: [] }
  const [publishers, setPublishers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [formValues, setFormValues] = useState(initialValues)

  const validateForm = () => {
    if (formValues.title.trim() === '' || formValues.developer.trim() === '' ||formValues.publisher.trim() === ''
      ||formValues.releaseDate === '' || formValues.platforms.length === 0) {
      return true   
    }
    return false
  }

  const backgroundRef = useRef()

  const handleclose = (e) => {
    if ( e.target === backgroundRef.current ) {
      setVisible(false)
      document.body.style.overflowY = "scroll";
      setFormValues(initialValues)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormValues({...formValues, [id]: value})
  }

  const addGame = (e) => {
    e.preventDefault()
    axios.post('/api/games', formValues).then((response) => {
      setGames(games.concat(response.data))
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    axios.get('/api/publishers').then((response) => {
      setPublishers(response.data)
    })

    axios.get('/api/platforms').then((response) => {
      setPlatforms(response.data)
    })
  }, [visible])

  if (platforms && publishers) {
    return (
      <Background ref={backgroundRef} style={{ display: visible ? "block" : "none" }} onClick={handleclose} >
        <FormContainer >
          <form onSubmit={addGame}>
            <p>Título del juego</p>
            <input id="title" type="text" value={formValues.title} onChange={handleChange} />
            <p>Desarrollador</p>
            <input id="developer" type="text" value={formValues.developer} onChange={handleChange} />
            <p>Fecha de lanzamiento</p>
            <input id="releaseDate" type="date" onChange={handleChange} value={formValues.releaseDate} />
            <div style={{ display: 'flex' }}>
              <p>Distribuidor: </p>
              <PublishersSelect publishers={publishers} setFormValues={setFormValues} formValues={formValues} ></PublishersSelect>
            </div>
            <Missing name={ "distribuidor" } type={"publishers"} setValue={setPublishers} previous={publishers} />
            <p>Plataformas Seleccionadas:</p>
            <div className="platforms-list">
              <PlatformsSelector
                selected={true}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
            </div>
            <p>Plataformas disponibles</p>
            <div className="platforms-list">
              <PlatformsSelector
                selected={false}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
            </div>
            <Missing name={ "plataforma" } type={"platforms"} setValue={setPlatforms} previous={platforms} />
            <button type="submit" disabled={validateForm()}>Agregar juego</button>
          </form>
        </FormContainer>
      </Background>
    )
  }

  return (
    <Background ref={backgroundRef} style={{ display: visible ? "block" : "none" }} onClick={handleclose} >
        <FormContainer >
          <form>
            <p>Título del juego</p>
            <input id="title" type="text" value={formValues.title} onChange={handleChange} />
            <p>Desarrollador</p>
            <input id="developer" type="text" value={formValues.developer} onChange={handleChange} />
            <p>Fecha de lanzamiento</p>
            <input id=""></input>
          </form>
        </FormContainer>
      </Background>
  )
}

export default AddGameForm