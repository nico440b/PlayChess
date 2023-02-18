import "./Hometab.css"

import image from "../../assets/images/chess_bg.jpg"
import imagePreview0 from "../../assets/images/basic_rules.jpg"
import imagePreview1 from "../../assets/images/move_preview.jpg"
import imagePreview2 from "../../assets/images/castling_move.jpg"
import waves from "../../assets/images/layered_waves.svg"
import waves2 from "../../assets/images/layered_waves2.svg"
import ExtensionIcon from '@mui/icons-material/Extension';
import EmailIcon from '@mui/icons-material/Email';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessKing, faRobot,  faBroom } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { Button } from "@mui/joy";


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



  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".hidden")
    hiddenElements.forEach((el) => observer.observe(el))

    const hiddenElements2 = document.querySelectorAll(".hidden2")
    hiddenElements2.forEach((el) => observer2.observe(el))

    const hiddenElements3 = document.querySelectorAll(".hidden3")
    hiddenElements3.forEach((el) => observer3.observe(el))
  })

  return (

    
        <div className="containerHome">
      <div className="homeItems" id="firstItem" style={{ backgroundImage: `url(${image})` }}>
        <section className="hidden">
          <p className="homeItemText">
            Welcome
          </p>
        </section>
      </div>

      <div className="homeItems" id="featuresBanner">

        <p className="homeItemText hidden">
          Features
        </p>
      </div>
      <div className="featuresWrapper">
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



        <div className="features">
          <img src={`${img}`} alt="" />
        </div>


      </div>


      <div className="homeItems layeredWaves" id="todoBanner" style={{ backgroundImage: `url(${waves2})` }}>

        <p className="todo  hidden homeItemText" id="titleText">
          TO DO
        </p>

      </div>
      <div className="homeItems layeredWaves" id="todoBanner2" style={{ backgroundImage: `url(${waves})` }}>
        <div className="todoWrapper" >

          <section className="todo hidden">
            <FontAwesomeIcon className="iconHomeTab" icon={faChessKing}  />
            <p className="homeItemText">
              Finish ruleset
            </p>
          </section>
          <section className="todo hidden">
            <ExtensionIcon className="iconHomeTab2" fontSize="large" />
            <p className="homeItemText">
              Add puzzles
            </p>

          </section>
          <section className="todo hidden">
            <FontAwesomeIcon className="iconHomeTab" icon={faBroom} />
            <p className="homeItemText">
              Clean Components
            </p>
          </section>

          <section className="todo hidden">
            <FontAwesomeIcon className="iconHomeTab" icon={faRobot} />
            <p className="homeItemText">
              Add a simple AI
            </p>
          </section>
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
