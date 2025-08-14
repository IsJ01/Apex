import { useContext, useEffect } from "react";
import renderHeader from "./header/renderHeader.js";
import { AppContext } from "./AppProvider.jsx";

const Layout = ({ children }) => {

  const {logout, updateUser, updateTitle} = useContext(AppContext);

  useEffect(() => {
    (() => {
      if (!document.getElementById("header")) {
        renderHeader(updateUser(), logout, updateTitle());
      }
    })();
  }, [])

  return (
    <div id="layout" className="layout">
      {children}
    </div>
  );
};

export default Layout;