import './Stats.css'
import { Ending } from "../../types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import CountDownTimer from './Timer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CapturedPieces from '../Captured/CapturedPieces';
import { Grid, IconButton, Tooltip, Zoom } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import { setTimer} from '../../redux/timerReducer';
import { setGameOver, setGameEnd } from '../../redux/gameReducer';
import InfoIcon from '@mui/icons-material/Info';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface Props {

    gameTimer: number;

    startGame: boolean;
}




export default function Stats({ gameTimer, startGame }: Props) {

    const { timer } = useSelector((state: RootState) => state.counter6);
    const { gameOn } = useSelector((state: RootState) => state.counter6);
    const { count } = useSelector((state: RootState) => state.counter1);
    const { pCountW } = useSelector((state: RootState) => state.counter2);
    const { pCountB } = useSelector((state: RootState) => state.counter2);
    const { capW } = useSelector((state: RootState) => state.counter4);
    const { capB } = useSelector((state: RootState) => state.counter4);
    
    const { moveLog } = useSelector((state: RootState) => state.counter7);

    const dispatch = useDispatch();




    const cTurn = count % 2 === 0 ? false : true;
    const cTurnTimerW = count % 2 === 0 ? "rgba(180, 180, 180, 0.500)" : "";
    const cTurnTimerB = count % 2 === 0 ? "active" : "inactive";
    const pointsPrefixW = pCountW - pCountB > 0 ? "+" : "";
    const pointsW = pCountW - pCountB > 0 ? pCountW - pCountB : "";

    const pointsPrefixB = pCountB - pCountW > 0 ? "+" : "";
    const pointsB = pCountB - pCountW > 0 ? pCountB - pCountW : "";

   

    
    const renderCapB = capB.map((item, index) => <CapturedPieces key={index} image={item?.image} className={"capturedChessPiece"}></CapturedPieces>);
    const toolTipDisable =  gameOn? <div className='toolTipStartGame' ><PriorityHighIcon/>Forfeit</div>: "";
    const renderCapW = capW.map((item, index) => <CapturedPieces key={index} image={item?.image} className={"capturedChessPiece"}></CapturedPieces>);
    const stringData = moveLog.reduce((result, item) => {
        return `${result}${item}`
    }, "")

    

    if (timer === 0) {
        dispatch(setTimer(5))
    }

    function handleForfeit(){
        if (gameOn === true) {
            dispatch(setGameEnd(Ending.FORFEIT))
            dispatch(setGameOver(true))
        } 
        
    }


    return (
        <div className='gameStats'>
            <div className="statsCard" id="statsCardBlack" >

                
                    <Card className="timerCard " id={cTurnTimerB}>
                        <CardContent className="timerCardCont">
                            <div className='timerGrid2' >
                                <AccessTimeOutlinedIcon className='timerIcon' />

                                <Typography className='timerSpan' display={"flex"} component={"span"} justifyContent={"center"} height={"30px"} width={"50px"} >
                                    <CountDownTimer minutes={gameTimer} seconds={0} isActive={!cTurn && startGame} />
                                </Typography>
                            </div>

                        </CardContent>
                    </Card>
                <div className='profileContainer'>
                    <Avatar>B</Avatar>
                    <p>Black</p>
                </div>

                <div className="piecesGrid">
                    <div className='pieceContainer' >{renderCapB} </div>
                    <div className='pointContainer' > {pointsPrefixB}{pointsB} </div>

                </div>




            </div>
            

            

        </div >
    );





}