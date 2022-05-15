import React from "react";
import "./SidebarItem.css";

function SidebarItem({ Icon, text, active, ...props }) {
  return (
    <div
      className={`sidebarItem ${active && "sidebarItem--active"}`}
      style={{ position: "relative" }}
    >
      <Icon className="sidebaricon" active={active} new={props.new} />
      <span className={`"sidebar-text" ${props.new == true ? "new" : ""}`}>{text}</span>
    </div>
  );
}

export default SidebarItem;
