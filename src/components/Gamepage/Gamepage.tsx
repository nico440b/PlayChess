import './Gamepage.css'
import Chessboard from '../Chessboard/Chessboard';
import Stats from '../Stats/StatsB';
import StatsAlt from '../Stats/StatsAlt';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AxisY from './AxisY';
import AxisX from './AxisX';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from "@mui/material/Dialog";
import Slide from '@mui/material/Slide';

import React, { Component, useEffect } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar } from '@mui/material';

import StatsW from '../Stats/StatsW';
import StatsB from '../Stats/StatsB';
import TurnIndicatorComponent from '../Stats/TurnIndicatorComponent';

import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function Gamepage() {


   const { timer } = useSelector((state: RootState) => state.counter6);
   const { gameOn } = useSelector((state: RootState) => state.counter6);
   const { gameStats, gameOver, gameEnd } = useSelector((state: RootState) => state.counter8);
   const [open, setOpen] = React.useState(false);

   const winner = gameStats?.[0] === "WHITE" ? "1-0" : "0-1";





   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };


   useEffect(() => {
      if (gameOver === true) {
         handleClickOpen();
      }
   });


   return (

      <div className='MainPage'>
         <div className='gameContainer'>
            <div className='Board'>
               <Chessboard />
            </div>
            <div className='Stats'>
               <StatsB key={timer + 1} gameTimer={timer} startGame={gameOn} />
               <StatsAlt />
               <StatsW key={timer} gameTimer={timer} startGame={gameOn} />
            </div>
         </div>





         <Dialog className='dialogBox' open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
               "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                     width: "600px",
                     maxWidth: "1000px!important",
                  },
               },
            }}

         >

            <div className='dialogContainer'>
               <DialogTitle className='dialogTitle'>{gameEnd}</DialogTitle>
               <DialogContent className='dialogContContainer'>
                  <div className='playerWhite'>
                     <Avatar sx={{ bgcolor: "#c0e9fd", color: "black", minHeight: "80px", minWidth: "80px" }} aria-label="">W</Avatar>
                  </div>

                  <div>
                     <h1>{winner}</h1>
                  </div>
                  <div className='playerBlack'>
                     <Avatar sx={{ bgcolor: "#014779", color: "white", minHeight: "80px", minWidth: "80px" }} aria-label="">B</Avatar>
                  </div>
               </DialogContent>
            </div>


         </Dialog>
      </div>
   );
}