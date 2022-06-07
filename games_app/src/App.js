import GamesList from "./components/GamesList";
import { Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import PublisherList from "./components/PublishersList";
import Game from "./components/Game";
import Publisher from "./components/Publisher";
import Top from "./components/Top";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import Template from "./components/Template";
import Notification from "./components/Notification";


function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: "redirect", url: null })

  useEffect(() => {
    axios.get('/api/login/loged').then((response) => {
      setUser(response.data)
    }).catch((responseObject) => {
      return null;
    })
  }, []);

  return (
    <>
      <Notification notification={notification} setNotification={setNotification} />
      <Routes>
        <Route path="/" element={<Template user={user} ><Top /></Template> }/>
        <Route path="/games" element={<Template user={user} ><GamesList user={user} setNotification={setNotification}/></Template>} />
        <Route path="/games/:id" element={<Template user={user} ><Game user={user} setNotification={setNotification} /></Template>} />
        <Route path="/publishers" element={<Template user={user}><PublisherList /></Template>} />
        <Route path="/publishers/:name" element={<Template user={user}><Publisher /></Template>} />
        <Route path="/login" element={<Login setNotification={setNotification} setUser={setUser} />} />
        <Route path="/register" element={<Register setNotification={setNotification} user={user} />} />
      </Routes>
    </>
  );
}

export default App;
