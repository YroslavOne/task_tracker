import ReactDOM from "react-dom";
import { ReactNode } from "react";

interface MenuPortalProps {
  children: ReactNode;
}

const MenuPortal: React.FC<MenuPortalProps> = ({ children }) => {
  const portalRoot = document.getElementById("menu-portal-root");

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default MenuPortal;
