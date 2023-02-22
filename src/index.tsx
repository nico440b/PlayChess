import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from "./redux/store";
import { Provider } from "react-redux";
import Gamepage from './components/Gamepage/Gamepage';


import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from "react-router-dom";

import Hometab from './components/Tabs/Hometab';

import MyAppBar from './components/Navigation/MyAppBar';
import { StyledEngineProvider } from '@mui/material/styles';
import Puzzles from './components/Tabs/Puzzles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <Provider store={store}>

      <BrowserRouter>

        <StyledEngineProvider injectFirst>
          <MyAppBar />
        </StyledEngineProvider>

        <Routes>

          <Route path="" element={<Hometab />} />

          <Route path="/play" element={<Gamepage />} />
          <Route path="/puzzles" element={<Puzzles />} />

        </Routes>



      </BrowserRouter>


    </Provider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
