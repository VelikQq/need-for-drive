import React from "react";
import classnames from "classnames";
import api from "../../api/api.js";
import "./order.scss";
import LocationBlock from "./location-block/location";
import ModelBlock from "./model-block/model";
import ExtraBlock from "./extra-block/extra";
import TotalBlock from "./total-block/total";
import CostBlock from "./cost-block/cost";
import Header from "../header/header";
import Links from "./links/links";
import { setCityText, setCityPointText } from "../../store/location/action";
import { setCarText } from "../../store/model/action";
import {
  setStatusIdText,
  setParamOrderText,
  setColorText,
  setDateStartText,
  setDateFinishText,
  setDateCountText,
  setRateText,
  setPriceText,
  setTankText,
  setChairText,
  setWheelText,
} from "../../store/extra/action";

import { connect } from "react-redux";

const defaultList = {
  cityId: { name: "" },
  pointId: { address: "" },
  carId: {},
  color: "",
  rateId: {},
  price: "",
  dateStart: "",
  dateCount: "",
};
const listAdditional = [
  { name: "Полный бак", price: 500, set: "tank", fun: "setTankText" },
  { name: "Детское кресло", price: 200, set: "chair", fun: "setChairText" },
  { name: "Правый руль", price: 1600, set: "wheel", fun: "setWheelText" },
];

class Order extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: 0,
      paramLocation: false,
      paramModel: false,
      paramExtra: false,
      orderFalse: false,
      city: [],
      point: [],
      cars: [],
      rate: [],
      loader: false,
    };
    this.changeProps = this.changeProps.bind(this);
    this.postData = this.postData.bind(this);
    this.nextWrapper = this.nextWrapper.bind(this);
    this.setDefValue = this.setDefValue.bind(this);
  }
  componentWillMount() {
    this.setDefValue();
    this.setState({
      paramLocation: false,
      paramModel: false,
      paramExtra: false,
    });
  }
  componentDidMount() {
    let statusId = localStorage.getItem("statusId");

    if (statusId) {
      console.log("API");
      api.getData(`order/${statusId}`).then((json) => {
        this.props.setParamOrderText(true);
        this.props.setStatusIdText(statusId);
        this.setDefValue(json);
        this.setState({
          id: 3,
          paramExtra: true,
        });
      });
    }
    api.getData("city").then((json) => {
      json.data.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      );
      this.setState({
        city: json.data,
      });
    });

    api.getData("point").then((json) => {
      const cityPoint = json.data.filter((item) => item.name);
      this.setState({
        point: cityPoint,
      });
      this.props.changeLoader(false);
    });
  }

  setDefValue(json) {
    let value = json ? json.data : defaultList;
    this.props.setCityText(value.cityId);
    this.props.setCityPointText(value.pointId);
    this.props.setCarText(value.carId);
    this.props.setColorText(value.color);
    this.props.setRateText(value.rateId);
    this.props.setPriceText(value.price);
    this.props.setDateCountText(value.dateCount);
    this.props.setDateStartText(value.dateFrom);
    this.props.setDateFinishText(value.dateTo);
    this.props.setTankText(value.isFullTank);
    this.props.setChairText(value.isNeedChildChair);
    this.props.setWheelText(value.isRightWheel);
  }

  postData = async (item, order) => {
    let data = await fetch(`${api.URL}db/${item}`, {
      method: "POST",
      headers: {
        "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then((res) => res.json());

    return data;
  };

  changeProps(value, item) {
    this.setState({
      [item]: value,
    });
  }

  nextWrapper(item, textButton) {
    if (item === 4) {
      item = 3;
      if (this.props.paramOrder) {
        this.props.changeOrder();
        this.setState({
          paramExtra: false,
          paramModel: false,
          paramLocation: false,
          orderFalse: true,
        });
      }
      !this.state.orderFalse && this.props.changeVerification("verification");
    }
    switch (textButton) {
      case "Выбрать модель":
        this.setState({
          loader: true,
        });
        api.getData("car").then((json) => {
          this.setState({
            cars: json.data,
            loader: false,
          });
        });
        break;
      case "Дополнительно":
        api.getData("rate").then((json) => {
          this.setState({
            rate: json.data,
          });
        });
        break;
    }

    this.setState({
      id: item,
    });
  }

  render() {
    const {
      id,
      paramLocation,
      paramExtra,
      paramModel,
      orderFalse,
    } = this.state;

    return (
      <section className={classnames("order", { disabled: this.props.burger })}>
        <div className="order__header">
          <Header />
        </div>
        <Links
          orderStatusId={this.props.orderStatusId}
          orderFalse={orderFalse}
          nextWrapper={this.nextWrapper}
          paramLocation={paramLocation}
          paramModel={paramModel}
          paramExtra={paramExtra}
          id={id}
        />
        <section className="order__content">
          <div className="wrapper">
            <LocationBlock
              id={id}
              paramLocation={paramLocation}
              changeProps={this.changeProps}
              listCity={this.state.city}
              listPoint={this.state.point}
              loader={this.props.loader}
            />
            <ModelBlock
              id={id}
              cars={this.state.cars}
              changeProps={this.changeProps}
              loader={this.state.loader}
            />
            <ExtraBlock
              id={id}
              listRate={this.state.rate}
              changeProps={this.changeProps}
              listAdditional={listAdditional}
            />
            <TotalBlock
              id={id}
              cars={this.state.cars}
              loader={this.props.loader}
              orderFalse={this.state.orderFalse}
            />
            <CostBlock
              id={id}
              nextWrapper={this.nextWrapper}
              state={this.state}
              postData={this.postData}
              listAdditional={listAdditional}
              orderFalse={this.state.orderFalse}
            />
          </div>
        </section>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    city: state.loc.valueCity,
    cityPoint: state.loc.valueOfPoint,
    car: state.mod.selectCar,
    color: state.ext.color,
    rate: state.ext.rate,
    additional: state.ext.additional,
    dateCount: state.ext.dateCount,
    dateStart: state.ext.dateStart,
    dateFinish: state.ext.dateFinish,
    orderStatusId: state.ext.orderStatusId,
    paramOrder: state.ext.paramOrder,
  };
};

const mapDispatchToProps = {
  setCityText,
  setCityPointText,
  setCarText,
  setStatusIdText,
  setParamOrderText,
  setColorText,
  setDateStartText,
  setDateFinishText,
  setDateCountText,
  setRateText,
  setPriceText,
  setTankText,
  setChairText,
  setWheelText,
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
