
import './App.css';

import Gamepage from './components/Gamepage/Gamepage';


import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, Navigate } from "react-router-dom";

import Hometab from './components/Tabs/Hometab';

import MyAppBar from './components/Navigation/MyAppBar';
import { StyledEngineProvider } from '@mui/material/styles';
import Puzzles from './components/Tabs/Puzzles';







function App() {

  return (

    <div id="app" >
      <BrowserRouter>

      <StyledEngineProvider injectFirst>
          <MyAppBar />
        </StyledEngineProvider>

        <Routes>
        
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Hometab />} />
          <Route path="/play" element={<Gamepage />} />
          <Route path="/puzzles" element={<Puzzles />} />
        
            
          

        </Routes>



      </BrowserRouter>

    </div>

  );

}


export default App;
