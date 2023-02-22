import "./Hometab.css"

import image from "../../assets/images/chess_bg.jpg"
import imagePreview0 from "../../assets/images/basic_rules.jpg"
import imagePreview1 from "../../assets/images/move_preview.jpg"
import imagePreview2 from "../../assets/images/castling_move.jpg"
import waves from "../../assets/images/layered_waves.svg"
import waves2 from "../../assets/images/layered_waves2.svg"
import waves3 from "../../assets/images/layered_waves3.svg"
import waves4 from "../../assets/images/layered_waves4.svg"
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faBroom } from '@fortawesome/free-solid-svg-icons'
import { faChessKing, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from "react";
import { Button } from '@mui/material';

import { Card, CardContent } from "@mui/material"
import { useNavigate } from "react-router-dom"


export default function Hometab() {

  const [img, setImg] = useState(imagePreview0)
  const [amount, setAmount] = useState(0);

  function handleImgChange0() {
    setImg(imagePreview0)
    setAmount(0)
  }

  function handleImgChange1() {
    setImg(imagePreview1)
    setAmount(1)
  }

  function handleImgChange2() {
    setImg(imagePreview2)
    setAmount(2)
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/play`;
    navigate(path);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    })
  })

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    })
  })

  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    })
  })

  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    })
  })



  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".hidden")
    hiddenElements.forEach((el) => observer.observe(el))

    const hiddenElements2 = document.querySelectorAll(".hidden2")
    hiddenElements2.forEach((el) => observer2.observe(el))

    const hiddenElements3 = document.querySelectorAll(".hidden3")
    hiddenElements3.forEach((el) => observer3.observe(el))

    const hiddenElements4 = document.querySelectorAll(".hidden4")
    hiddenElements4.forEach((el) => observer4.observe(el))
  })

  return (


    <div className="containerHome">
      <div className="homeItems" id="firstItem" style={{ backgroundImage: `url(${image})` }}>

        <div className="welcomeContainer">
          <section className="flexRow">
            <p className="welcomeText hidden4">Welcome to <span id="welcomeHighLight"> PLAYCHESS</span></p>
            
          </section>

          <div className="flexRow hidden4">

            <p className="welcomeSubText">Since I was a kid, I was very interested in chess. A game about tactics,
              <span className="welcomeSubText" id="welcomeHighLight"> problem solving</span>
              &nbsp;and pattern recognition. A game that has recently seen a huge surge in popularity after many years of obscurity. As a future
              <span className="welcomeSubText" id="welcomeHighLight"> software engineer</span>
              , this kind of mental game still speaks to me. Therefore I decided to combine my two passions and create my own chess game. This project is created with
              <span className="welcomeSubText" id="welcomeHighLight"> React</span>
              &nbsp;and
              <span className="welcomeSubText" id="welcomeHighLight"> Typescript</span>
              . No external chess libraries have been used. Movement of the pieces is implemented with
              <span className="welcomeSubText" id="welcomeHighLight"> HTML</span>
              , mouse position relative to the window and the chess board itself, and various
              <span className="welcomeSubText" id="welcomeHighLight"> hooks</span>. As of right now the game works on
              <span className="welcomeSubText" id="welcomeHighLight"> HD</span>
              &nbsp;and
              <span className="welcomeSubText" id="welcomeHighLight"> Full HD</span>
              &nbsp;displays
              . Scroll down to see the implemented features and things that I am currently working on or click the button to try the game yourself.
            </p>





          </div>

          <div className="hidden3 btnRow">

            <Button className="tryBtn welcomeBtns" variant="contained" onClick={routeChange}>
              Try It Out!
            </Button>

          </div>





        </div>


      </div>

      <div className="homeItems " id="featuresBanner">

        <p className="homeItemTitleText hidden">
          Features
        </p>
      </div>
      <div className="featuresWrapper layeredWaves" style={{ backgroundImage: `url(${waves2})` }}>
        <Button className="hidden2 fBtn" onClick={handleImgChange0} >
          <p className={`homeItemText picText hidden2 ${amount === 0 ? "current" : ""}`} id="basicRulesTxt"  >
            Basic Rules
          </p>
        </Button>
        <Button className="hidden2 fBtn" onClick={handleImgChange1} id="previewMoveBtn" >
          <p className={`homeItemText picText hidden2 ${amount === 1 ? "current" : ""}`} id="previewMovesTxt" >
            Preview Moves
          </p>
        </Button>
        <Button className="hidden2 fBtn" onClick={handleImgChange2} id="castlingMoveBtn">
          <p className={`homeItemText picText hidden2 ${amount === 2 ? "current" : ""}`} id="castlingMoveTxt" >
            Castling
          </p>
        </Button>


        <Card className="featuresCard">
          <CardContent className="featuresCardContent">
            <div className="features" style={{ backgroundImage: `url(${img})` }}>

            </div>
          </CardContent>
        </Card>



      </div>


      <div className="homeItems layeredWaves" id="todoBanner" style={{ backgroundImage: `url(${waves4})` }}>

        <p className="todo  hidden homeItemTitleText" id="titleText">
          TO DO
        </p>
        <div className="guidingLine" id="guidingLineStart"></div>
      </div>


      <div className="todoContent">
        <div className="todoLeft">
          <div className="todoLine">
            <div className="guidingLine" id="guidingLine1"></div>
            <section className="todoLeftItem todo hidden">
              <FontAwesomeIcon className="iconHomeTab2" id="icon1" icon={faChessKing} />
              <p className="homeItemText">
                Finish
              </p>
              <p className="homeItemText" id="rulesetHighLight">
                &nbsp;ruleset
              </p>
            </section>
          </div>
          <div className="todoLine">
            <div className="guidingLine" id="guidingLine2" ></div>
            <section className="todoLeftItem todo hidden">
              <ExtensionOutlinedIcon className="iconHomeTab2" id="icon2" fontSize="large" />
              <p className="homeItemText">
                Add
              </p>

              <p className="homeItemText" id="puzzleHighLight">
                &nbsp;puzzles
              </p>
            </section>
          </div>

          <div className="todoLine">
            <div className="guidingLine" id="guidingLine3"></div>
            <section className="todoLeftItem todo hidden">
              <SmartToyOutlinedIcon className="iconHomeTab2" id="icon3" fontSize="large" />
              <p className="homeItemText">
                Add an
              </p>
              <p className="homeItemText" id="aiHighLight">
                &nbsp;AI
              </p>
            </section>
          </div>
          <div className="todoLine" >
            <div className="guidingLine" id="guidingLine4"></div>
            <section className="todoLeftItem todo hidden">
              <FontAwesomeIcon className="iconHomeTab2" id="icon4" icon={faCircleCheck} />
              <p className="homeItemText" id="cleanHighLight">
                Clean
              </p>
              <p className="homeItemText">
                &nbsp;components
              </p>

            </section>
          </div>
        </div>
        <div className="todoRight">
          <div className="todoRightItem">
            <section className="hidden3">
            <p >Rules regarding the
              <span id="rulesetHighLight"> King</span> and the restriction of his movement.</p>
            <p >The game ends now with the capture of the king. This is incorrect. Working on implementing ending conditions such as 
              <span id="rulesetHighLight"> checkmate</span>,
              <span id="rulesetHighLight"> stalemate</span>, draw by
              <span id="rulesetHighLight"> repetition</span>,
              <span id="rulesetHighLight"> insufficient pieces</span>,
              <span id="rulesetHighLight"> 50 move rule</span> and
              <span id="rulesetHighLight"> timeout</span>.</p>
            <p >Rules for<span id="rulesetHighLight"> en passant</span>.</p>
            </section>
            
          </div>
          <div className="todoRightItem">
              <p className="hidden3">Setup and pre-program<span id="puzzleHighLight"> various puzzles</span>. Such as mate-in-2, mate-in-3 and so on. </p>
          </div>
          <div className="todoRightItem">
            <p className="hidden3">Program a
              <span id="aiHighLight"> simple AI</span> that can evaluate moves based on
              <span id="aiHighLight"> piece values</span>. This can be done using a
              <span id="aiHighLight"> Minimax algorithm</span>. Move evaluation can then be
              <span id="aiHighLight"> further improved</span> by assigning values to different squares based on their proximity to the center of the board.</p>
          </div>
          <div className="todoRightItem">
            <p className="hidden3">Remove as much
              <span id="cleanHighLight"> logic</span> as possible from the chessboard component, and remove<span id="cleanHighLight"> unnecessary imports</span>.</p>
          </div>
        </div>

      </div>

      <div className="homeItems" id="lastItem">
        <div className="contactWrapper" >

          <section className=" hidden">

            <p className="homeItemText">
              Contact Me
            </p>
          </section>
          <section className=" hidden" id="phoneText">
            <PhoneIphoneIcon className="iconHomeTab" fontSize="large" />

            <p className="homeItemText">
              22 32 45 48
            </p>

          </section>
          <section className=" hidden" id="mailText">
            <EmailIcon className="iconHomeTab" fontSize="large" />
            <p className="homeItemText">
              nico440b@gmail.com
            </p>
          </section>


        </div>
      </div>





    </div>


  );
};
