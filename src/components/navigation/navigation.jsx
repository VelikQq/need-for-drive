import React, { useState } from "react";
import classnames from "classnames";
import "./navigation.scss";

export default function Navigation(props) {
  const [lang, setLang] = useState(true);
  return (
    <nav className="nav">
      <div
        onClick={props.openMenu}
        className={classnames("nav__burger", { active: props.burger })}>
        <span className="menu-top"></span>
        <span className="menu-middle"></span>
        <span className="menu-bottom"></span>
      </div>
      <div className="nav__lanSwitch" onClick={() => setLang(!lang)}>
        {lang ? "Рус" : "Eng"}
      </div>
    </nav>
  );
}
