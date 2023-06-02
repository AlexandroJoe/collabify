import React, { useState } from "react";
import About from "./About";
import Creators from "./Creators";
import Features from "./Features";
import Productivity from "./Productivity";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { FiArrowRight } from "react-icons/fi";
import HomeBG from "./Productivity.jpg";

const LandingPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 50, // Adjust the offset as needed
      });
    }
  };

  return (
    <>
      <div className="home-container">
        <nav>
          <div className="nav-logo-container">
            <h1>Collabify</h1>
          </div>
          <div className="navbar-links-container">
            <p>Home</p>
            <p onClick={() => scrollToSection("About")}>About</p>
            <p onClick={() => scrollToSection("Creators")}>Creators</p>
            <p onClick={() => scrollToSection("Features")}>Features</p>
            <p onClick={() => scrollToSection("More")}>More...</p>
            <Link to="/collabify">
              <button className="primary-button">Get Started</button>
            </Link>
          </div>
          <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
          </div>
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            anchor="right"
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => setOpenMenu(false)}
              onKeyDown={() => setOpenMenu(false)}
            >
              <List>
                {menuOptions.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.icon} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </nav>
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
              All the features you need to be your most productive self
            </h1>
            <p className="primary-text">
              Tired of having to open different apps everytime you have to work?
              Well Collabify is here for you.
            </p>
            <Link to="/collabify">
              <button className="secondary-button">
                Get Started Now <FiArrowRight />
              </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={HomeBG} alt=""></img>
          </div>
        </div>
      </div>
      <div>
        <section id="About">
          <About />
        </section>
        <section id="Creators">
          <Creators />
        </section>
        <section id="Features">
          <Features />
        </section>
        <section id="More">
          <Productivity />
        </section>
      </div>
    </>
  );
};

export default LandingPage;
