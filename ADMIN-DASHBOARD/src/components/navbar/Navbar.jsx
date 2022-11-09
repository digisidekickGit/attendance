import React from "react";
import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import CommentIcon from "@mui/icons-material/Comment";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Avatar } from "@mui/material";
const Navbar = ({setInput,inputData}) => {
  return (
    <div className="navbar">
      <div className="navbar-cont">
        <div className="searchBox">
          <input placeholder="Search by pan number name... " value={inputData}  onChange={(e)=>setInput(e.target.value)}/>
          <SearchIcon />
        </div>

        <div className="nav-icons">
          <div>
            <LanguageIcon className="nav-icon" />
            <span>English</span>
          </div>
          <div>
            <DarkModeIcon className="nav-icon" />
          </div>
          <div>
            <AcUnitIcon className="nav-icon" />
          </div>
          <div>
            <CircleNotificationsIcon className="nav-icon" />
            <div className="notification">1</div>
          </div>
          <div>
            <CommentIcon className="nav-icon" />
            <div className="notification">4+</div>
          </div>
          <div>
            <DehazeIcon className="nav-icon" />
          </div>
          <div className=".nav-icons">
            <Avatar
              className="nav-icon"
              src="https://pbs.twimg.com/media/FYad7FxUUAAJh4Z?format=jpg&name=900x900"
              alt="profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
