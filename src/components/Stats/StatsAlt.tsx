import './StatsAlt.css'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";


import { Button, Card, CardContent,  Grid,  Typography, Zoom } from '@mui/material';

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

    const toolTipDisable = gameOn === true ? <div className='toolTipStartGame' ><InfoIcon/>Reset the game.</div>: <div className='toolTipStartGame' ><InfoIcon/>Default mode is Blitz.</div>;
    const btnClr = gameOn === false ? "startGameBtnFalse " : "startGameBtnTrue";
    const btnName = gameOn === false ? "Start Game" : "Reset";
    const className: string = [ count % 2 !== 0 && "turnIndicatorWhite", count % 2 === 0 && "turnIndicatorBlack"].filter(Boolean).join(' ');
    const txtClassName: string = [ count % 2 !== 0 && "txtWhite", count % 2 === 0 && "txtBlack"].filter(Boolean).join(' ');
    const turnName: string = [ count % 2 !== 0 && "WHITE", count % 2 === 0 && "BLACK"].filter(Boolean).join(' ');
    const cardClassName: string = [ gameOn !== true && "cardTurn", gameOn === true && "cardTurnVisible" ].filter(Boolean).join(' ');
    
    
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
            label: 'Quick',
        },
        {
            value: 20,
            label: 'Normal',
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
        dispatch(setTimer(timerValue - timer));
    }



    const handleChangeTimer = (value: number): void => {
        setTimerValue(value);

    };

    const infoExtra = (e: React.MouseEvent<HTMLElement>)=>{ 
        
        
    };

    

    return (

        <div className='leftStatsMain' >
            <div className='turnIndicatorTop' >
            <Card id={cardClassName}>
                <CardContent className={className} key={count} id="turnIndicator">
                    <Grid>
                        
                        <Typography className={txtClassName} id="turnIndicatorTxt">
                            {turnName} 
                        </Typography>

                    </Grid>
                </CardContent>

            </Card>
          
            
        </div>
            <Card className='gameStatsAlt'>
                
                <CardContent>
                    <Grid>
                        <Grid className='setTimerIc'>
                            <img src={timerIcon} />
                        </Grid>
                        <Grid>
                            <Box sx={{ width: 300 }}>
                                
                                    <Slider onChangeCommitted={(_, value) => handleChangeTimer((value as number))}
                                        aria-label="Custom marks"
                                        defaultValue={5}
                                        getAriaValueText={valuetext}
                                        step={null}
                                        min={1}
                                        max={20}
                                        valueLabelDisplay="off"
                                        marks={marks}

                                    />
                                
                                
                            </Box>
                        </Grid>
                        <Grid className='startGameBtnGrid'>

                            <Button className='setTimeBtn' variant='contained' onClick={setTime}>
                                Set Time
                            </Button>
                            <Tooltip  arrow  title={toolTipDisable}  TransitionComponent={Zoom} >
                                <span>
                                    <Button className={btnClr}  variant="contained" onMouseOver={(e) => infoExtra(e)} onClick={playGame}>
                                        {btnName}
                                    </Button>
                                </span>
                                
                            </Tooltip>
                            

                        </Grid>


                    </Grid>
                </CardContent>

            </Card>
            
        </div>

    );
}