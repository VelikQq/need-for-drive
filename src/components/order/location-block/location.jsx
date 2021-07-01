import React, { useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import CityMap from "./map";
import { setCityText, setCityPointText } from "../../../store/location/action";
import Loader from "../../loader";

const wordLength = 2;
const apiYandex = "5b5054c2-d046-4cf8-8cac-90a914e3631a";

function Location(props) {
  const [filterCity, setfilterCity] = useState([]);
  const [filterCityPoint, setfilterCityPoint] = useState([]);
  const [cityCoord, setCityCoord] = useState("");
  const [pointCoord, setPointCoord] = useState([]);

  function inputChange(event, item) {
    item === "setCityText"
      ? props[item]({ name: event.target.value })
      : props[item]({ address: event.target.value });

    if (event.target.value === "") {
      item === "setCityText" ? setfilterCity([]) : setfilterCityPoint([]);
      props.changeProps(false, "paramLocation");
    }
    if (event.target.value.length >= wordLength) {
      if (item === "setCityText") {
        let filterCity = props.listCity.filter((item) => {
          const fixItem = item.name.toLowerCase();
          return fixItem.startsWith(event.target.value.toLowerCase());
        });

        setfilterCity(filterCity);
      } else {
        setfilterCityPoint([]);
        let filterCityPoint = props.listPoint
          .filter((item) => {
            const fixItem = item.cityId.name.toLowerCase();
            return fixItem.startsWith(props.city.name.toLowerCase());
          })
          .filter((elem) => {
            const fixElem = elem.address.toLowerCase();
            return fixElem.includes(event.target.value.toLowerCase());
          });
        getPointCoord(props.city.name, filterCityPoint);
        setfilterCityPoint(filterCityPoint);
      }
    }
    props.changeProps(false, "paramLocation");
  }
  const getCoord = async (value) => {
    return await fetch(
      `https://geocode-maps.yandex.ru/1.x?apikey=${apiYandex}&format=json&results=1&sco=longlat&geocode=Россия+${value}`
    ).then((res) => res.json());
  };

  function getPointCoord(name, data) {
    setPointCoord([]);
    data
      .filter((elem) => {
        return name === elem.cityId.name;
      })
      .map((elem, ind) => {
        getCoord(`${name}${elem.address}`).then((json) => {
          let coord = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map((item) => +item);
          setPointCoord((prev) => [...prev, { coord: coord, point: elem }]);
        });
      });
  }

  function selectCity(item, value) {
    props[value](item);
    if (value === "setCityText") {
      clearInput("cityPoint");
      setfilterCity([]);

      getCoord(item.name).then((json) => {
        let coord = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .reverse()
          .map((item) => +item);
        setCityCoord(coord);
      });
      getPointCoord(item.name, props.listPoint);
    } else {
      setfilterCityPoint([]);
      props.changeProps(true, "paramLocation");
    }
  }
  function clearInput(item) {
    if (item === "city") {
      props.setCityText({ name: "" });
      setfilterCity([]);
      setPointCoord([]);
    } else {
      props.setCityPointText({ address: "" });
      setfilterCityPoint([]);
      getPointCoord(props.city.name, props.listPoint);
    }
    props.changeProps(false, "paramLocation");
  }

  const list_City = filterCity.map((item, id) => {
    return (
      <li
        onClick={() => selectCity(item, "setCityText")}
        key={id}
        className="dropdown">
        {item.name}
      </li>
    );
  });
  const list_CityPoint = filterCityPoint.map((item, id) => {
    return (
      <li
        onClick={(e) => selectCity(item, "setCityPointText")}
        key={id}
        className="dropdown">
        {item.address}
      </li>
    );
  });

  return (
    <>
      {props.loader && <Loader />}
      <div
        className={classnames("order__content__location", {
          disabled: props.id !== 0,
        })}>
        <div className="form">
          <div className="form__input">
            <label htmlFor="city">Город</label>
            <div className="wrap__location">
              <input
                id="city"
                type="text"
                value={props.city.name}
                placeholder="Начните вводить город..."
                onChange={(e) => inputChange(e, "setCityText")}
              />
              {props.city.name && (
                <span onClick={() => clearInput("city")} className="close">
                  &times;
                </span>
              )}
              <ul className="dropdown-list">{list_City}</ul>
            </div>
          </div>
          <div className="form__input">
            <label htmlFor="delivery_point">Пункт выдачи</label>
            <div className="wrap__location">
              <input
                id="delivery_point"
                type="text"
                value={props.cityPoint.address}
                placeholder="Начните вводить пункт..."
                onChange={(e) => inputChange(e, "setCityPointText")}
              />
              {props.cityPoint.address && (
                <span onClick={() => clearInput("cityPoint")} className="close">
                  &times;
                </span>
              )}
              <ul className="dropdown-list delivery">{list_CityPoint}</ul>
            </div>
          </div>
          <div className="map">
            <p>Выбрать на карте:</p>
            <CityMap
              coord={cityCoord}
              city={props.city.name}
              pointCoord={pointCoord}
              selectCity={selectCity}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    city: state.loc.valueCity,
    cityPoint: state.loc.valueOfPoint,
  };
};
const mapDispatchToProps = {
  setCityText,
  setCityPointText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
