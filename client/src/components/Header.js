import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <ul style={ulStyle}>
          <Link to="/" style={liStyle}>
            Home
          </Link>
          <Link to="/login" style={liStyle}>
            Login
          </Link>
          <Link to="/register" style={liStyle}>
            Register
          </Link>
          <Link to="/about" style={liStyle}>
            About
          </Link>
        </ul>
      </div>
    );
  }
}

const ulStyle = {
  listStyle: "none",
  padding: "4px 20px",
};
const liStyle = {
  display: "inline",
  padding: "10px",
  cursor: "pointer",
};
export default Header;
