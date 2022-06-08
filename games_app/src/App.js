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
import { connect, useDispatch } from "react-redux";
import { top5 } from "./reducers/gameReducer";
import { loged } from "./reducers/loginReducer";


function App (props) {
  const { user } = props
  const [notification, setNotification] = useState({ message: null, type: "redirect", url: null })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(top5)
    dispatch(loged)
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
        <Route path="/login" element={<Login setNotification={setNotification} />} />
        <Route path="/register" element={<Register setNotification={setNotification} user={user} />} />
      </Routes>
    </>
  );
}

const mapStateToProps = (state) => {
  const user = state.login;
  return {
    user
  }
}

export default connect(
  mapStateToProps
)(App)