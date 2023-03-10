import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearTurns, increment } from "../../redux/reducer";

import { RootState } from "../../redux/store";
import { addCapPieceW, addCapPieceB, clearW, clearB } from "../../redux/capturedReducer";
import { clearPoints, incrementByAmountB, incrementByAmountW } from "../../redux/piecesReducer"


import { Piece } from "../../models/Piece";
import Tile from "../Tile/Tile";
import './Chessboard.css'

import {  Ending, Team, Type } from "../../types";
import { playCaptureSound, playCastleSound, playEndSound, playMoveSound } from "../Sounds/MoveFX";
import { addMove, clearLog } from "../../redux/moveLogReducer";
import { setGameStats, setGameOver, setGameEnd, resetGame } from "../../redux/gameReducer";
import Setup from "./BoardStart";
import { resetTimer, startGame } from "../../redux/timerReducer";
import Validator from "../../rules/Validator";
import { Position } from "../../models/Position";
import { PossibleMoves } from "../../models/PossibleMoves";
import AxisY from "../Gamepage/AxisY";
import AxisX from "../Gamepage/AxisX";





const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const pieceTypes = [" ", "N", "B", "R", "Q", "K"]






export default function Chessboard() {


  

  const { count } = useSelector((state: RootState) => state.counter1);
  const { pCountW } = useSelector((state: RootState) => state.counter2);
  const { pCountB } = useSelector((state: RootState) => state.counter2);
  
  
  const { gameOn } = useSelector((state: RootState) => state.counter6);
  const { moveLog } = useSelector((state: RootState) => state.counter7);
 
  const {  gameOver,  gameReset} = useSelector((state: RootState) => state.counter8);


 
  const dispatch = useDispatch();

  const [used, setUsed] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  

  const [gX, setX] = useState(0);
  const [gY, setY] = useState(0);


  
  
  const boardStart = Setup();
  
  
  const validator = new Validator();
  const [pieces, setP] = useState<Piece[]>(boardStart);
  const [illegalMove, setIllegalMove] = useState(false);

  

  let board = [];
  
  const kingWhite = pieces.find(k=> k.type === Type.KING && k.team === Team.WHITE)
  const kingBlack = pieces.find(k=> k.type === Type.KING && k.team === Team.BLACK)

  function allValidMoves(state: Piece[]){
    const allValidMoves: PossibleMoves[] = [];
    
    for (let i = 0; i < state.length; i++) {
      const p = state[i];
      const pieceMoves = p.allValidMoves(p,state)
      allValidMoves.push(new PossibleMoves(p.type, p.team, pieceMoves))

    }
    
    return allValidMoves;
    
  }

  function threatMapWhite(state: Piece[]){
    const allValidMoves: PossibleMoves[] = [];
    const threatMove: PossibleMoves [] = [];
    for (let i = 0; i < state.length; i++) {
      const p = state[i];
      const pieceMoves = p.findThreatMap(p,state)
      
      allValidMoves.push(new PossibleMoves(p.type, p.team, pieceMoves))

    }
    
    for (let index = 0; index < allValidMoves.length; index++) {
      const element = allValidMoves[index];
      
      if(element.team === Team.WHITE){
        threatMove.push(element)

      }
    }
    return threatMove;
    
  }


  


  function showMoves() {

    setP((cPieces) => {
      return cPieces.map(p => {
        p.moves = p.allValidMoves(p, cPieces);
        return p;
      });
    });
  } 

  

 

  ////////////////////Dropping a piece/////////////////////////////
  function drop(e: React.MouseEvent) {
    const board = ref.current;
    if (used && board) {
      const thing = e.target as HTMLElement;
      
      
      const xValue = thing.getAttribute("data-key")
      const yValue = thing.getAttribute("data-set")

      if(xValue && yValue){
        const x = parseInt(xValue);
        const y = parseInt(yValue);
      
        
      
      
      const cTurn = count % 2 === 0 ? "b" : "w";

      const movingPiece = pieces.find(p => p.position.x === gX && p.position.y === gY);
      const defPiece = pieces.find(p => p.position.x === x && p.position.y === y);

      
      
      if (movingPiece) {
        if (movingPiece.validMove(gX, gY, x, y,pieces) && cTurn === movingPiece.team && gameOn) {
          
          const uPieces = pieces.reduce((results, p) => {
            if (p.position.x === gX && p.position.y === gY) {
              p.position.x = x;
              p.position.y = y;
              results.push(p);
           
             if (defPiece && defPiece.type === Type.KING) {
                
                const winner = movingPiece.team === "w" ? "WHITE" : "BLACK";
                
                const winnerNotes = movingPiece.team === "w" ? "1-0" : "0-1";
                const winnerPoints = movingPiece.team === "w" ? pCountW : pCountB;
                
                dispatch(addMove(winnerNotes))
   
                dispatch(setGameStats([winner, "", 0, winnerPoints, moveLog, count, 5]))
                dispatch(setGameOver(true))
                dispatch(clearW());
                dispatch(clearB());
                dispatch(clearLog());
                dispatch(clearPoints());
                dispatch(startGame(false));
                dispatch(clearTurns());
                dispatch(resetTimer());
                dispatch(setGameEnd(Ending.CHECKMATE))

              } 

              else if (defPiece && defPiece.type !== Type.KING) {
                
                const moveNotes = `${pieceTypes[Object.values(Type).indexOf(p.type)]}x${horizontalAxis[x]}${verticalAxis[y]}`;
                const moveNotesTrim = moveNotes.replace(/ /g, '')
                dispatch(addMove(moveNotesTrim))

                if (movingPiece.team === Team.WHITE) {
                  dispatch(incrementByAmountW(defPiece.points))
                  dispatch(addCapPieceW(defPiece));
                }
                else {
                  dispatch(incrementByAmountB(defPiece.points))
                  dispatch(addCapPieceB(defPiece));
                }
                if(movingPiece.type === Type.KING || Type.ROOK){
                  movingPiece.hasMoved = true;
                }

                playCaptureSound();

              } 
              else {
                if(movingPiece.type === Type.KING || Type.ROOK){
                  movingPiece.hasMoved = true;
                }




                const moveNotes = `${pieceTypes[Object.values(Type).indexOf(p.type)]}${horizontalAxis[x]}${verticalAxis[y]}`;
                const moveNotesTrim = moveNotes.replace(/ /g, '')

                dispatch(addMove(moveNotesTrim)) 
                playMoveSound();

              } 

              
            } else if (!(p.position.x === x && p.position.y === y)) {
              results.push(p);
            }
            
              return results;
          }, [] as Piece[]);

          

          setP(uPieces)  
          
          
          
          console.log(threatMapWhite(uPieces))
          for (let index = 0; index < allValidMoves(uPieces).length; index++) {
            const element = allValidMoves(uPieces)[index];
            
            
            if(element.team === Team.WHITE && kingBlack ){
              const moves = element.moves.find(m=> m.x === kingBlack.position.x && m.y === kingBlack.position.y)
              
              if(moves){
                console.log("BLACK KING CHECK")
                console.log(element.type)
                kingBlack.isChecked = true;
              }
              else{
                kingBlack.isChecked = false;
              }
            }

            if(element.team === Team.BLACK && kingWhite ){
              const moves = element.moves.find(m=> m.x === kingWhite.position.x && m.y === kingWhite.position.y)
              
              if(moves){
                console.log("WHITE KING CHECK")
                console.log(element.type)
                kingWhite.isChecked = true;
              }
              else{
                kingWhite.isChecked = false;
              }
            }
            
            
          } 
          dispatch(increment());
          used.classList.add("moving")
          used.style.position = "";
          used.style.removeProperty("top");
          used.style.removeProperty("left");
          
        }
        else {
          used.classList.add("moving")
          used.style.position = "";
          used.style.removeProperty("top");
          used.style.removeProperty("left");
          //used.classList.remove("selected")
          console.log("ERROR")
        }

      } else {
        used.style.position = "relative";
        used.style.removeProperty("top");
        used.style.removeProperty("left");
        console.log("ERROR")
      }
      used.classList.add("moving")
      used.style.position = "";
      used.style.removeProperty("top");
      used.style.removeProperty("left");
      setUsed(null);
      
      }
     
      used.style.position = "";
      used.style.removeProperty("top");
      used.style.removeProperty("left");
    }
  }

  function grab(e: React.MouseEvent) {

    showMoves();
    
    
    const thing = e.target as HTMLElement;
    
    const xValue = thing.parentElement?.getAttribute("data-key")
    const yValue = thing.parentElement?.getAttribute("data-set")
    
    
    
    if(xValue && yValue){
      
     setX(parseInt(xValue));
     setY(parseInt(yValue));
     setUsed(thing);
     
     //thing.classList.add("selected")
    }

    if(used === thing){
      used.style.position = "";
      used.style.removeProperty("top");
      used.style.removeProperty("left");
      setUsed(null)
      //thing.classList.remove("selected")
    }

    if(used){
      used.style.position = "absolute";
      
    }
    
    if( used && used !== thing){
      
      //used.classList.remove("selected")
    }
    
    
    


  }

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {

      const number = j + i;
      let image = undefined;
      
      pieces.forEach(p => {
        if (p.position.x === i && p.position.y === j) {
          image = p.image;
        }
      });

      
      

      let cPiece = used != null ? pieces.find(p => p.position.x === gX && p.position.y === gY) : undefined;
      let mark = cPiece?.moves ? cPiece.moves.some(p => (p.x === i && p.y === j)) : false;
      


      board.push(<Tile key={`${j},${i}`} x={i} y={j}  image={image} number={number} mark={mark}  ></Tile>);
    }

  }

  useEffect(()=>{
    if(used){
      used.style.position = "absolute";
      
    }
  })

  useEffect(() => {
    if (gameOver=== true) {
      
      setP(boardStart);
      
      dispatch(clearW());
      dispatch(clearB());
      dispatch(clearLog());
      dispatch(clearPoints());
      dispatch(startGame(false));
      dispatch(clearTurns());
      dispatch(resetTimer());
      dispatch(startGame(false));
      dispatch(resetGame(false));
      dispatch(setGameOver(false));
      playEndSound();
      
    } 
  });

  useEffect(() => {
    if (gameReset === true && boardStart) {
      
      setP(boardStart);
      dispatch(clearW());
      dispatch(clearB());
      dispatch(clearLog());
      dispatch(clearPoints());
      dispatch(startGame(false));
      dispatch(clearTurns());
      dispatch(resetTimer());
      dispatch(startGame(false));
      dispatch(resetGame(false));
      dispatch(setGameOver(false));
      
      
    } 
  });
  

  


  return (
    <div className="FullBoard">
      
      <div className="yAxis noselect">
        
        <p className="axis">8</p>
        <p className="axis">7</p>
        <p className="axis">6</p>
        <p className="axis">5</p>
        <p className="axis">4</p>
        <p className="axis">3</p>
        <p className="axis">2</p>
        <p className="axis">1</p>
        <p className="axis"></p>
      </div>
    
      <div onMouseUp={e => drop(e)} onClick={e => {grab(e); drop(e);}} className="Chessboard" ref={ref}>{board}</div>
      <div className="xAxis noselect">
       <p className="axis"></p>
        <p className="axis">A</p>
        <p className="axis">B</p>
        <p className="axis">C</p>
        <p className="axis">D</p>
        <p className="axis">E</p>
        <p className="axis">F</p>
        <p className="axis">G</p>
        <p className="axis">H</p>
      </div>
    </div>

  );

}

export { }