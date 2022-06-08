import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #00000080;
  top: 0;
  left: 0;
`;

const FormContainer = styled.div`
  padding: 50px 40px 50px 50px;
  width: 610px;
  height: 400px;
  border-radius: 25px;
  background-color: #fff;
  margin: 75px auto 0;

  p {
      font-size: 16px;
  }

  @media (max-width: 768px) {
    p, button {
      font-size: 12px;
    }
  }

  .selected {
    grid-area: selected
  }

  .select {
    grid-area: select
  }

  

  .publishers-container {
    grid-area: publisher;
    display: flex;
    flex-direction: column;
    gap: 5px;
    
  }

  .add-game-button {
    grid-area: button;
    border: none;
    background-color: #59e64c;
    font-size: 16px;
    padding: 0.5em 1em;
    border-radius: 1em;

    @media (hover: hover) and (pointer: fine) {
      :hover:not([disabled]) {
        background-color: #acf2a6;
        outline: 1px solid #1e8c18;
      cursor: pointer;
      }
    }

    :disabled {
      background-color: #ccc;
    }

    @media (max-width: 768px) {
      font-size: 12px;
      margin-top: 25px;
    }
  }

  form {
    padding-right: 5px;
    display: grid;
    grid-template-areas: "title developer" "publisher releaseDate" "selected select" "empty button";
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    overflow-x: hidden;
    overflow-Y: auto;
    max-height: 400px;
    
    .form-input {
      display: flex;
      flex-direction: column;
    }

    .platforms-list {
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

    @media (max-width: 768px) {
      .selected p {
        margin-bottom: 25px;
      }
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 5px;

      @media (hover: hover) and (pointer: fine) {
        :hover {
          background-color: #ccc;
        }
      }
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    @media (max-width: 768px) {
      grid-template-areas: "title" "developer" "publisher" "releaseDate" "selected" "select" "button";
      grid-template-columns: 1fr;
      gap: 15px;

      #releaseDate {
        width: calc(100% - 15px);
      }
    }
  }  

  @media (max-width: 768px) {
    width: 70%;
    padding: 25px 5%;
  }
`;

const ButtonOpenPublishers = styled.button`
  background-color: transparent;
  border: ${props => props.open ? "1px #1e8c18 solid" : "1px #bfbfbf solid" };
  color: ${props => props.open ? "#1e8c18" : "#000" };
  background-color: ${props => props.open ? "#d6f9d2" : "transparent" }; 
  font-size: 15px;
  padding: .2em .5em;
  width: 100%;
  text-align: start;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :after {
    font-size: 25px;
    margin-top: -4px;
    font-weight: 400;
    content: '>';
    color: ${props => props.open ? "#1e8c18" : "#000" };
    transform: ${props => props.open ? "rotate(-90deg)" : "rotate(90deg)" };
    transition: transform 0.5s ease-out;
    margin-left: 10px;

    @media (max-width: 768px) {
      font-size: 15px;
      margin-top: -2px;
    }
  }
`;

const MissingContainer = styled.div`
  button {
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    button {
      font-size: 12px;
    }
  }
  
  div {
    display: flex;
    flex-direction: column;
    transition: height 300ms;
    overflow: hidden;
    gap: 5px;

    button {
      background-color: #1e8c18;
      color: #fff;
      padding: 0.5em 0.2em;

      @media (hover: hover) and (pointer: fine) {
        :hover {
          background-color: #acf2a6;
          box-shadow: 0px 0px 0px 1px #1e8c18 inset;
          color: #000;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 7px);
  }
`;

const ButtonOpenMissing = styled.button`
  background-color: transparent;
  color: ${props => props.open ? "#1e8c18" : "#000" };
  padding: 0;
  width: 100%;
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: #1e8c18;

      ::after {
        color: #1e8c18;
      }
    }
  }

  :after {
    font-size: 25px;
    margin-top: -4px;
    font-weight: 400;
    content: '>';
    color: ${props => props.open ? "#1e8c18" : "#000" };
    transform: ${props => props.open ? "rotate(-90deg)" : "rotate(90deg)" };
    transition: transform 0.5s ease-out;
    margin-left: 10px;

    @media (max-width: 768px) {
      font-size: 15px;
      margin-top: -2px;
    }
  }
`;

const SelectContainer = styled.div`
  #optionsContainer {
    overflow-y: auto;
    transition: height 300ms;
    
    .option {
      font-size: 15px;
      border-left: 1px solid #1e8c18;
      border-right: 1px solid #1e8c18;
      border-bottom: 1px solid #1e8c18;
      color: #1e8c18;
      cursor: pointer;
      padding: .2em .5em;
      background-color: #d6f9d2;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (hover: hover) and (pointer: fine) {
        :hover {
          background-color: transparent;
        }
      }
      
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
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
      <ButtonOpenPublishers type="button" id="selectPublisher" onClick={handleOpen} open={open}>{ selected }</ButtonOpenPublishers>
      <div id="optionsContainer" style={ open ? { height: '89px' } : { height: 0 } }>
        {publishers.map((publisher, i) => (
          <div key={i} className="option" onClick={handleSelectPublisher}>{ publisher.name }</div>
        ))}
      </div>
    </SelectContainer>
  )
}

const Missing = ({ type, setValue, name, previous, setNotification }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    axios.post(`/api/${type}`, { name: inputValue } ).then((response) => {
      setValue(previous.concat(response.data))
      setNotification({ message: `Se añadió ${name}`, type: "info", url: null })
    }).catch((error) => {
      console.log(error.response.status)
    })
  }

  const handleToggleForm = () =>{
    setOpen(!open)
    setInputValue('')
  }

  return (
    <MissingContainer>
      <ButtonOpenMissing type="button" onClick={handleToggleForm} open={open} >No encuentras tu { name } ?</ButtonOpenMissing>
      <div style={open ? { height: '90px' } : { height: 0 } }>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
        <button type="button" onClick={handleSend}>Enviar { name }</button>
      </div>
    </MissingContainer>
  )
}

const AddGameForm = ({ visible, setVisible, setGames, games, setNotification }) => {
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
            <div className="form-input" style={{ gridArea: "title"}}>
              <p>Título del juego</p>
              <input id="title" type="text" value={formValues.title} onChange={handleChange} />
            </div>
            <div className="form-input" style={{ gridArea: "developer" }}>
              <p>Desarrollador</p>
              <input id="developer" type="text" value={formValues.developer} onChange={handleChange} />
            </div>
            <div className="publishers-container">
              <p>Distribuidor: </p>
              <PublishersSelect publishers={publishers} setFormValues={setFormValues} formValues={formValues} ></PublishersSelect>
              <Missing setNotification={setNotification} name={ "distribuidor" } type={"publishers"} setValue={setPublishers} previous={publishers} />
            </div>
            <div className="form-input" style={{ gridArea: "releaseDate" }}>
              <p>Fecha de lanzamiento</p>
              <input id="releaseDate" type="date" onChange={handleChange} value={formValues.releaseDate} />
            </div>
            <div className="platforms-list selected">
              <p>Plataformas Seleccionadas:</p>
              <PlatformsSelector
                selected={true}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
              <Missing setNotification={setNotification} name={ "plataforma" } type={"platforms"} setValue={setPlatforms} previous={platforms} />
            </div>
            <div className="platforms-list select">
              <p>Plataformas disponibles</p>
              <PlatformsSelector
                selected={false}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
            </div>
            <button className="add-game-button" type="submit" disabled={validateForm()}>Agregar juego</button>
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