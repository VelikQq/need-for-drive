import React from "react";
import classnames from "classnames";

export default function Links(props) {
  const {
    id,
    orderStatusId,
    orderFalse,
    paramLocation,
    paramModel,
    paramExtra,
  } = props;
  return (
    <div className="link">
      <div className="link__content">
        {orderStatusId ? (
          <div className="link__content__title">
            Заказ номер {orderStatusId}
          </div>
        ) : (
          <>
            <div
              onClick={(e) => !orderFalse && props.nextWrapper(0)}
              className={classnames("link__content__text", {
                active: id === 0,
                ready: paramLocation,
              })}>
              Местоположение
            </div>
            <span />
            <div
              onClick={(e) =>
                paramLocation && paramModel && props.nextWrapper(1)
              }
              className={classnames("link__content__text", {
                active: id === 1,
                ready: paramModel,
              })}>
              Модель
            </div>
            <span />
            <div
              onClick={(e) => paramModel && paramExtra && props.nextWrapper(2)}
              className={classnames("link__content__text", {
                active: id === 2,
                ready: paramExtra,
              })}>
              Дополнительно
            </div>
            <span />
            <div
              onClick={(e) => paramModel && paramExtra && props.nextWrapper(3)}
              className={classnames("link__content__text", {
                active: id === 3,
                ready: paramExtra,
              })}>
              Итого
            </div>
          </>
        )}
      </div>
    </div>
  );
}
