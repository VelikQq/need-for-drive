import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="content__header">
      <Link to="/">
        <span href="#" className="content__header__logo">
          Need for drive
        </span>
      </Link>
      <span className="content__header__location">Ульяновск</span>
    </header>
  );
}
