
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import { Link, Router, useLocation } from "react-router-dom";
import "./MyAppBar.css"



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessKnight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

import { transform } from "typescript";

const pages = [
{ text: "Play", href: "/Play" },
{ text: "Puzzles", href: "/Puzzles" },
];








function MyAppBar() {

  const [clrChange, setColor] = useState(false);
  const location = useLocation();
  const [locationChange, setLocation] = useState("/")

  useEffect(()=>{
    
    setLocation(location.pathname)
    
  })
  
  
  const changeNavBarClr = () =>{
    if(window.scrollY >= 30){
      setColor(true)
    }
    else{
      setColor(false)
    }
  }

  
  window.addEventListener("scroll", changeNavBarClr);
  
  
  const idName = locationChange === "/" ? "FixedAppBar" : "StickyAppBar"
  const className = clrChange === true ? "MyAppBarChanged" : "MyAppBar"
  const txtClr = clrChange === true ? "inherit" : "white"
  const elevation = clrChange === true ? 4 : 0;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  
  };

  

  
    return (
      
      <AppBar className={className} id={idName} elevation={elevation}>
        <Container className="container" maxWidth="xl" disableGutters={true} >
          <Toolbar className="toolBar" disableGutters={true} >
            <Typography className="AppTitle"
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
              
            >
              <FontAwesomeIcon className="MainIcon" icon={faChessKnight} />
              PLAYCHESS

            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                {pages.map((page) => (<MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  
                  <Link key={page.text} to={page.href} >{page.text}</Link>
                </MenuItem>

                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            ><FontAwesomeIcon className="MainIcon" icon={faChessKnight} />
              PLAYCHESS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (

                <Link className="AppBarLinks" key={page.text} to={page.href} color="inherit">
                  <Button className="appBarBtn"
                    key={page.text}
                    
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: `${txtClr}`, display: "block" }}

                  > {page.text}</Button>

                </Link>

              ))}
            </Box>

            
          </Toolbar>
        </Container>
      </AppBar>
    );
  }



export default MyAppBar;
