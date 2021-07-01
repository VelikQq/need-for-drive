import React from "react";

export default function Verification(props) {
  return (
    <div className="verification">
      <div className="verification__content">
        <p className="title">Подтвердить заказ</p>
        <div>
          <button className="button true" onClick={() => props.changeOrder()}>
            Подтвердить
          </button>
          <button
            className="button false"
            onClick={() => props.changeVerification()}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
}
