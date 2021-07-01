import React, { useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setDateCountText,
  setRateText,
  setTankText,
  setChairText,
  setWheelText,
} from "../../../store/extra/action";

function Extra(props) {
  useEffect(() => {
    props.color &&
      props.rate.id &&
      props.dateCount &&
      props.changeProps(true, "paramExtra");
  }, [props.color, props.dateCount, props.rate]);

  useEffect(() => {
    props.dateStart && props.dateFinish && props.setDateCountText(diffDates());
  }, [props.dateStart, props.dateFinish]);

  function selectColor(color) {
    props.setColorText(color[0].toUpperCase() + color.slice(1));
  }

  function selectAdditional(fun, value) {
    props[fun](!props[value]);
  }

  function diffDates() {
    if (props.dateStart) {
      let diffDate = Math.floor(
        new Date(new Date(props.dateFinish) - new Date(props.dateStart)) /
          (1000 * 60 * 60)
      );
      if (diffDate % 24 === 0) {
        return `${diffDate / 24}д`;
      } else {
        let dif = diffDate % 24;
        if (diffDate < 24) {
          return `${Math.floor(dif)}ч`;
        }
        return `${(diffDate - dif) / 24}д ${Math.floor(dif)}ч`;
      }
    }
  }
  function getFormate(value) {
    if (value) {
      const date = new Date(value);
      const trueMonth = date.getMonth() + 1;
      const month = `${trueMonth}`.length === 1 ? `0${trueMonth}` : trueMonth;
      const day =
        `${date.getDate()}`.length === 1
          ? `0${date.getDate()}`
          : date.getDate();
      const hour =
        `${date.getHours()}`.length === 1
          ? `0${date.getHours()}`
          : date.getHours();
      const minute =
        `${date.getMinutes()}`.length === 1
          ? `0${date.getMinutes()}`
          : date.getMinutes();

      return `${date.getFullYear()}-${month}-${day}T${hour}:${minute}`;
    }
    return "";
  }
  return (
    <div
      className={classnames("order__content__extra", {
        disabled: props.id !== 2,
      })}>
      <div className="extra__form">
        <div className="extra__form__color">
          <p>Цвет</p>
          {props.car.name &&
            ["любой", ...props.car.colors].map((item, id) => (
              <div key={`${id}_${item}`}>
                <input
                  type="radio"
                  id={`m${id}`}
                  name="color"
                  defaultChecked={id === 0}
                  onClick={() => selectColor(item)}
                />
                <label htmlFor={`m${id}`}>
                  <span />
                  {item[0].toUpperCase() + item.slice(1)}
                </label>
              </div>
            ))}
        </div>
        <div className="extra__form__date">
          <p>Дата аренды</p>
          <div>
            <label>С</label>
            <input
              type="datetime-local"
              value={getFormate(props.dateStart)}
              onChange={(e) => {
                props.setDateStartText(new Date(e.target.value).getTime());
              }}
            />
          </div>
          <label>По</label>
          <input
            type="text"
            type="datetime-local"
            value={getFormate(props.dateFinish)}
            min={getFormate(props.dateStart)}
            onChange={(e) =>
              props.setDateFinishText(new Date(e.target.value).getTime())
            }
          />
        </div>
        <div className="extra__form__rate">
          <p>Тариф</p>
          {props.listRate &&
            props.listRate.map((item, id) => {
              return (
                <div key={`radio_${item.id}`}>
                  <div className="wrap">
                    <input
                      type="radio"
                      id={`t${id}`}
                      name="rate"
                      onClick={() => props.setRateText(item)}
                    />
                    <label htmlFor={`t${id}`}>
                      <span />
                      {`${item.rateTypeId.name}, ${item.price}₽/${item.rateTypeId.unit}`}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="extra__form__additional">
          <p>Доп услуги</p>
          {props.listAdditional.map((item, id) => {
            return (
              <div className="additional__checkbox" key={`${id}_${item.set}`}>
                <input
                  type="checkbox"
                  className="additional__checkbox__custom"
                  id={item.set}
                  defaultChecked={props[item.set]}
                  onChange={() => selectAdditional(item.fun, item.set)}
                />
                <label htmlFor={item.set}>
                  <span />
                  {`${item.name}, ${item.price}p`}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    color: state.ext.color,
    dateStart: state.ext.dateStart,
    dateFinish: state.ext.dateFinish,
    rate: state.ext.rate,
    dateCount: state.ext.dateCount,
    tank: state.ext.tank,
    chair: state.ext.chair,
    wheel: state.ext.wheel,
    car: state.mod.selectCar,
  };
};
const mapDispatchToProps = {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setRateText,
  setDateCountText,
  setTankText,
  setChairText,
  setWheelText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Extra);
