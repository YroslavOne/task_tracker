import React from "react";
import ReactDOM from "react-dom";

const MenuPortal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("menu-portal-root")
  );
};

export default MenuPortal;