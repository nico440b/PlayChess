import './StatsAlt.css'
import {  useSelector } from "react-redux";

import { RootState } from "../../redux/store";


import {  Card, CardContent, Grid, Typography } from '@mui/material';










export default function TurnIndicatorComponent() {
    
    
    const { count } = useSelector((state: RootState) => state.counter1);
    const { gameOn } = useSelector((state: RootState) => state.counter6);

    const cardClassName: string = [ gameOn !== true && "cardTurn", gameOn === true && "cardTurnVisible" ].filter(Boolean).join(' ');
    
    const className: string = [ count % 2 !== 0 && "turnIndicatorWhite", count % 2 === 0 && "turnIndicatorBlack"].filter(Boolean).join(' ');
    const txtClassName: string = [ count % 2 !== 0 && "txtWhite", count % 2 === 0 && "txtBlack"].filter(Boolean).join(' ');
    const turnName: string = [ count % 2 !== 0 && gameOn && "WHITE TO PLAY", count % 2 === 0 && gameOn && "BLACK TO PLAY"].filter(Boolean).join(' ');
 
    return (

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

    );
}