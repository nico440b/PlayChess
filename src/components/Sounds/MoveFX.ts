import move from "../../assets/soundfx/move.mp3";
import capture from "../../assets/soundfx/capture.mp3";
import check from "../../assets/soundfx/check.mp3";
import castling from "../../assets/soundfx/castling.mp3";
import gameEnd from "../../assets/soundfx/game_end.mp3";



export function playMoveSound(){
    
    const audio = new Audio(move);
    audio.loop = false;
    return (audio.play());
  
}

export function playCaptureSound(){
    
    const audio = new Audio(capture);
    audio.loop = false;
    return (audio.play());
  
}

export function playCastleSound(){
    
    const audio = new Audio(castling);
    audio.loop = false;
    return (audio.play());
  
}

export function playCheckSound(){
    
    const audio = new Audio(check);
    audio.loop = false;
    return (audio.play());
  
}


export function playEndSound(){
    
    const audio = new Audio(gameEnd);
    audio.loop = false;
    return (audio.play());
  
}