import React, { useContext } from "react";
import "./Sidebar.css";
import "./LogoutButton.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import {
  HomeIcon,
  GrammyIcon,
  UserIcon,
  NotificationsIcon,
} from "../icons/index";
import { Link, useLocation } from "react-router-dom";
import { NotifiContext } from "../../notifications/NotifiContext";


function Sidebar() {
  const [location] = React.useState(useLocation().pathname);
  let { haveNewNotifi } = useContext(NotifiContext);

function quit() {
    localStorage.clear();
    window.location.href = window.location.href;
}
  return (
    <div className="feed-header-Text">
      <Link to="/home" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Home"
          Icon={HomeIcon}
          active={location === "/home" ? true : false}
        />
      </Link>
      <Link to="/Lists" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Top50"
          Icon={GrammyIcon}
          active={location === "/Lists" ? true : false}
        />
      </Link>
      <Link to="/Notifications" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Notifications"
          Icon={NotificationsIcon}
          new={haveNewNotifi}
          active={location === "/Notifications" ? true : false}
        />
      </Link>
      <Link to="/Profile" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Profile"
          Icon={UserIcon}
          active={location === "/Profile" ? true : false}
        />
      </Link>
      <button class="logoutButton" type="button" onClick={quit}>Logout</button>
    </div>
  );
}
export default Sidebar;