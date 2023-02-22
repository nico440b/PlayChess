import "./Puzzles.css"

import { faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Puzzles(){

    return(
        
        <div className="puzzlesContainer">
            <FontAwesomeIcon className="loadingIcon" icon={faChessKnight} spin/>
            <p className="infoText">In Development</p>
        </div>
    );
}