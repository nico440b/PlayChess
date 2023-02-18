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
    const cTurnTimerB = count % 2 === 0 ? "" : "rgba(180, 180, 180, 0.500)";
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
            <Card className="statsCard" id="statsCardBlack" sx={{ minWidth: 275 }}>

                <Grid className='statsGrid' container >
                    <Grid className="timerGrid" xs={12} md={12}>
                        <Card className="timerCard" style={{ backgroundColor: cTurnTimerB }}>
                            <CardContent className="timerCardCont">
                                <div className='timerGrid2' >
                                    <AccessTimeOutlinedIcon />

                                    <Typography className='timerSpan' display={"flex"} component={"span"} justifyContent={"center"} height={"30px"} width={"50px"} >
                                        <CountDownTimer minutes={gameTimer} seconds={0} isActive={!cTurn && startGame} />
                                    </Typography>
                                </div>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid className='profileGrid'>
                        <Grid xs={2} md={2}>
                            <Avatar sx={{ bgcolor: "#014779" }} aria-label="">
                                B
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid className='profileGrid' >
                        <Grid className='profileItem' >
                            <Typography className='profileTxt' >Chess Bot</Typography>
                        </Grid>
                        <Grid className='profileItem'>
                            <Typography className='profileTxt' >(Easy)</Typography>
                        </Grid>
                    </Grid>
                    <Grid className="piecesGrid" xs={12} md={12}>
                        <Grid className='pieceContainer' >{renderCapB} </Grid>
                        <Grid className='pointContainer' > {pointsPrefixB}{pointsB} </Grid>

                    </Grid>
                    <Grid className='iconGrid' xs={12} md={12} visibility="hidden">
                        <IconButton className='forfeitBtn'>
                            <CloseOutlinedIcon fontSize='large' />
                        </IconButton>
                        <IconButton className='drawBtn'>
                            <HandshakeOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>


            </Card>
            <Card className='movesCard'>
                <TextareaAutosize
                    maxRows={1}
                    style={{ width: 477.5 }}
                    defaultValue={`${stringData}`}
                />


            </Card>

            <Card className="statsCard" id="statsCardWhite" sx={{ minWidth: 275 }}>

                <Grid className='statsGrid' container >
                    <Grid className="timerGrid" xs={12} md={12}>
                        <Card className="timerCard" style={{ backgroundColor: cTurnTimerW }}>
                            <CardContent className="timerCardCont">
                                <div className='timerGrid2' >
                                    <AccessTimeOutlinedIcon />

                                    <Typography className='timerSpan' display={"flex"} component={"span"} justifyContent={"center"} height={"30px"} width={"50px"} >
                                        <CountDownTimer minutes={gameTimer} seconds={0} isActive={cTurn && startGame} />
                                    </Typography>
                                </div>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid className='profileGrid'>
                        <Grid xs={2} md={2}>
                            <Avatar sx={{ bgcolor: "#ebf9fd", color: "black" }} aria-label="">
                                P
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid className='profileGrid' >
                        <Grid className='profileItem' >
                            <Typography className='profileTxt'>Player</Typography>
                        </Grid>
                        <Grid className='profileItem'>
                            <Typography className='profileTxt'></Typography>
                        </Grid>
                    </Grid>
                    <Grid className="piecesGrid" xs={12} md={12}>
                        <Grid className='pieceContainer' >{renderCapW} </Grid>
                        <Grid className='pointContainer' > {pointsPrefixW}{pointsW} </Grid>

                    </Grid>
                    <Grid className='iconGrid' xs={12} md={12}>
                        <IconButton className='forfeitBtn' onClick={handleForfeit}>
                            <Tooltip arrow title={toolTipDisable} TransitionComponent={Zoom} >
                                <CloseOutlinedIcon fontSize='large' />
                            </Tooltip>
                        </IconButton>
                        <IconButton className='drawBtn'>
                            <Tooltip arrow title={<div className='toolTipStartGame' ><InfoIcon />Not available yet</div>} TransitionComponent={Zoom} >
                                <HandshakeOutlinedIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                </Grid>


            </Card>

        </div >
    );





}