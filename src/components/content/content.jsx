import React from "react";
import "./content.scss";
import { Link } from "react-router-dom";
import Header from "../header/header";

export default function Content(props) {
  return (
    <section className="content">
      <Header />
      <main className="content__desc">
        <div className="content__desc__title">
          Каршеринг <br />
          <span>Need for drive</span>
        </div>
        <p className="content__desc__text">
          Поминутная аренда авто твоего города
        </p>
        <Link to="/order">
          <button className="content__desc__button button">
            Забронировать
          </button>
        </Link>
      </main>
      <footer className="content__footer">
        <span className="content__footer__copyright">
          © 2016-2019 «Need for drive»
        </span>
        <a className="content__footer__phone" href="tel:8495234-22-44">
          8 (495) 234-22-44
        </a>
      </footer>
    </section>
  );
}
