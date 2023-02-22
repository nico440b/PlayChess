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

  

  function move(e: React.MouseEvent) {
    const board = ref.current;
    if (used && board) {

      // Left
      const minX = board.offsetLeft - 12;

      // Top
      const minY = board.offsetTop - 10;

      // Right
      const maxX = board.offsetLeft + board.clientWidth - 37;

      // Bottom
      const maxY = board.offsetTop + board.clientHeight - 42;

      const mouseX = e.clientX - 25;
      const mouseY = e.clientY - 25;
      used.style.position = "absolute";



      if (mouseX < minX) {
        used.style.left = `${minX}px`;
      }
      else if (mouseX > maxX) {
        used.style.left = `${maxX}px`;
      }
      else {
        used.style.left = `${mouseX}px`;
      }

      if (mouseY < minY) {
        used.style.top = `${minY}px`;
      }
      else if (mouseY > maxY) {
        used.style.top = `${maxY}px`;
      }
      else {
        used.style.top = `${mouseY}px`;
      }
    }
  }

  ////////////////////Dropping a piece/////////////////////////////
  function drop(e: React.MouseEvent) {
    const board = ref.current;
    if (used && board) {
      const x = Math.floor((e.clientX - board.offsetLeft) / 80);
      const y = Math.abs(Math.ceil((e.clientY - board.offsetTop - 640) / 80));
      const cTurn = count % 2 === 0 ? "b" : "w";

      const movingPiece = pieces.find(p => p.position.x === gX && p.position.y === gY);
      const defPiece = pieces.find(p => p.position.x === x && p.position.y === y);

      
      
      if (movingPiece && movingPiece.team === cTurn && gameOn) {
        if (movingPiece.validMove(gX, gY, x, y,pieces) ) {
        
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
          
        }
        else {
          used.style.position = "relative";
          used.style.removeProperty("top");
          used.style.removeProperty("left");
        }

      } else {
        used.style.position = "relative";
        used.style.removeProperty("top");
        used.style.removeProperty("left");
      }
      setUsed(null);
      
    }
    
  }

  function grab(e: React.MouseEvent) {

    showMoves();
    console.log(threatMapWhite(pieces))
    const board = ref.current;
    const thing = e.target as HTMLElement;
      

    if (thing.classList.contains("chessPiece") && board) {
      const gX = Math.floor((e.clientX - board.offsetLeft) / 80);
      const gY = Math.abs(Math.ceil((e.clientY - board.offsetTop - 640) / 80));


      

      setX(gX);
      setY(gY);

      const mouseX = e.clientX - 25;
      const mouseY = e.clientY -25;
      thing.style.position = "absolute";
      thing.style.left = `${mouseX}px`;
      thing.style.top = `${mouseY}px`;

      setUsed(thing);

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
      


      board.push(<Tile key={`${j},${i}`} x={i} y={j}  image={image} number={number} mark={mark} ></Tile>);
    }

  }

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
      console.log(gameOver)
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
      
      console.log(gameOver)
    } 
  });
  

  


  return (
    <div className="FullBoard">
      
      <AxisY/>
      <div  onMouseMove={e => move(e)} onMouseUp={e => drop(e)} onMouseDown={e => grab(e)} className="Chessboard" ref={ref}>{board}</div>
      <div></div>
      <AxisX/>
    </div>

  );

}

export { }