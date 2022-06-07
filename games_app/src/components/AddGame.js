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
  width: 700px;
  height: 500px;
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
      }
    }
  }
`;

const PlatformsSelector = (props) => {
  const { platforms, formValues, setPlatforms, setFormValues, selected } = props

  const handleSelectPlatform = (e) => {
    setFormValues({...formValues, platforms:  formValues.platforms.concat(e.target.innerHTML) })
    console.log(e.target.innerHTML)
    setPlatforms(platforms.filter((platform) => platform.name !== e.target.innerHTML ))
  }

  const handleDeSelectPlatform = (e) => {
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

const AddGameForm = ({ visible, setVisible }) => {
  const initialValues = { title: '', developer: '', publisher: '', releaseDate: '', platforms: [] }
  const [publishers, setPublishers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [formValues, setFormValues] = useState(initialValues)
  const backgroundRef = useRef()

  console.log(formValues)

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
          <form>
            <p>Título del juego</p>
            <input id="title" type="text" value={formValues.title} onChange={handleChange} />
            <p>Desarrollador</p>
            <input id="developer" type="text" value={formValues.developer} onChange={handleChange} />
            <p>Fecha de lanzamiento</p>
            <input id=""></input>
            <div className="platforms-list">
              <PlatformsSelector
                selected={true}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
            </div>
            <div className="platforms-list">
              <PlatformsSelector
                selected={false}
                formValues={formValues}
                platforms={platforms}
                setPlatforms={setPlatforms}
                setFormValues={setFormValues}
              />
            </div>
            {
            publishers.map((publisher) => (
              <>{publisher.name}</>
            ))
          }
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