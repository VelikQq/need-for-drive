import React, { useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { setCarText } from "../../../store/model/action";
import { setColorText } from "../../../store/extra/action";
import Loader from "../../loader";

function Model(props) {
  const models = ["Все модели", "Эконом", "Премиум"];
  const [modelCar, setModelCar] = useState("Все модели");
  const [carName, setCarName] = useState("");
  const filterCars = props.cars.filter((item) =>
    modelCar === "Все модели" ? true : item.categoryId.name === modelCar
  );
  function selectCar(item) {
    props.setColorText("Любой");
    setCarName(item.name);
    props.setCarText(item);
    props.changeProps(true, "paramModel");
  }

  return (
    <>
      {props.loader && <Loader />}
      <div
        className={classnames("order__content__model", {
          disabled: props.id !== 1,
        })}>
        <div className="form__model">
          {models.map((item, id) => {
            return (
              <span key={`${id}_${item.name}`}>
                <input
                  type="radio"
                  id={`r${id}`}
                  name="model"
                  defaultChecked={id === 0 ? true : false}
                  onClick={() => setModelCar(item)}
                />
                <label htmlFor={`r${id}`}>
                  <span />
                  {item}
                </label>
              </span>
            );
          })}
        </div>
        {props.cars && (
          <div className="form__selectCar">
            {filterCars.map((item, id) => {
              return (
                <div
                  className={classnames("form__selectCar__item", {
                    active: carName === item.name,
                  })}
                  onClick={() => selectCar(item)}
                  key={`${id}_${item.name}`}>
                  <p className="title">{item.name}</p>
                  <p className="cost">
                    {item.priceMin}-{item.priceMax}P
                  </p>
                  <img
                    src={`http://api-factory.simbirsoft1.com${item.thumbnail.path}`}
                    alt={item.name}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    car: state.mod.selectCar,
  };
};
const mapDispatchToProps = {
  setColorText,
  setCarText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Model);
