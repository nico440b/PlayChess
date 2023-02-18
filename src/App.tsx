
import './App.css';

import Gamepage from './components/Gamepage/Gamepage';


import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from "react-router-dom";

import Hometab from './components/Tabs/Hometab';

import MyAppBar from './components/Navigation/MyAppBar';
import { StyledEngineProvider } from '@mui/material/styles';




function App() {

  return (
    
      <div id="app" >
        <BrowserRouter>
        
          <StyledEngineProvider injectFirst>
            <MyAppBar />
          </StyledEngineProvider>
          
          <Routes>
            
              <Route path="" element={<Hometab />} />
              
            <Route path="/play" element={<Gamepage />} />
           

          </Routes>
          
          
          
        </BrowserRouter>
          
      </div>
    
  );

}


export default App;
