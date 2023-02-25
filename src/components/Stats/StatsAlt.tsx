import './StatsAlt.css'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";


import { Button, Card, CardContent, Grid, Typography, Zoom } from '@mui/material';

import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { setTimer, startGame } from '../../redux/timerReducer';
import timerIcon from "../../assets/images/chess_clock.png";
import Tooltip from '@mui/material/Tooltip';
import { resetGame, setMatchID } from '../../redux/gameReducer';






export default function StatsAlt() {

    const [timerValue, setTimerValue] = useState(0);
    const { timer } = useSelector((state: RootState) => state.counter6);
    const { gameOn } = useSelector((state: RootState) => state.counter6);
    const { count } = useSelector((state: RootState) => state.counter1);


    const dispatch = useDispatch();

    const toolTipDisable = gameOn === true ? <div className='toolTipStartGame' ><InfoIcon />Reset the game.</div> : <div className='toolTipStartGame' ><InfoIcon />Default mode is Blitz.</div>;
    const btnClr = gameOn === false ? "startGameBtnFalse " : "startGameBtnTrue";
    const btnName = gameOn === false ? "Start" : "Reset";
    


    const marks = [
        {
            value: 1,
            label: 'Bullet',
        },
        {
            value: 5,
            label: 'Blitz',
        },
        {
            value: 10,
            label: 'Rapid',
        },
        {
            value: 15,
            label: 'Classic',
        },
    ];

    function valuetext(value: number) {
        return `${value} min`;
    }

    function playGame() {
        if (gameOn === true) {
            dispatch(startGame(false));
            dispatch(resetGame(true));
        } else {


            dispatch(resetGame(false));
            dispatch(startGame(true));
        }

    }

    function setTime() {
        if(timerValue === 15){
            dispatch(setTimer((timerValue*4-timer)))
        }else{
            dispatch(setTimer(timerValue - timer));
        }
        

        
    }



    const handleChangeTimer = (value: number): void => {
        setTimerValue(value);

    };

    const infoExtra = (e: React.MouseEvent<HTMLElement>) => {


    };



    return (


        <div className='gameStatsAlt'>


            <Slider className='sliderTimer' onChangeCommitted={(_, value) => handleChangeTimer((value as number))}
                
                aria-label="Custom marks"
                defaultValue={5}
                getAriaValueText={valuetext}
                step={null}
                min={1}
                max={15}
                valueLabelDisplay="off"
                marks={marks}

            />




            <div className='startGameBtnGrid'>

                <Button className='setTimeBtn' variant='contained' onClick={setTime}>
                    Time
                </Button>
                <Tooltip arrow title={toolTipDisable} TransitionComponent={Zoom} >
                    <span>
                        <Button className={btnClr} variant="contained" onMouseOver={(e) => infoExtra(e)} onClick={playGame}>
                            {btnName}
                        </Button>
                    </span>

                </Tooltip>


            </div>





        </div>



    );
}