import React from "react";
import classnames from "classnames";
import "./menu.scss";
import { ReactComponent as TelegramIcon } from "../../assets/icons/Telegram_white.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/Facebook_white.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/Instagram_white.svg";

const listMenu = ["ПАРКОВКА", "СТРАХОВКА", "БЕНЗИН", "ОБСЛУЖИВАНИЕ"];

export default function Menu(props) {
  return (
    <section className={classnames("menu", { disabled: !props.burger })}>
      <div className="menu__content">
        <ul>
          {listMenu.map((item, id) => (
            <li key={`${id}_${item}`}>{item}</li>
          ))}
        </ul>
        <div className="menu__content__icons">
          <a href="#">
            <TelegramIcon />
          </a>
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
