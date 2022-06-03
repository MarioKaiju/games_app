import GamesList from "./components/GamesList";
import { Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}/>
        <Route path="/games" element={<GamesList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
