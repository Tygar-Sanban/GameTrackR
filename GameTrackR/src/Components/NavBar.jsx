import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function NavBar(props) {
  return <nav className="header">{props.line}</nav>;
}

export default NavBar;
