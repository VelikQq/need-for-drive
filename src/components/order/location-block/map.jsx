import React from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import pointIcon from "../../../assets/icons/Map_Point.svg";

class CityMap extends React.Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  render() {
    if (this.props.coord) {
      this.map.setCenter(this.props.coord, 11);
    }
    return (
      <div className="map__area">
        <YMaps>
          <Map
            instanceRef={(ref) => {
              this.map = ref;
            }}
            defaultState={{
              center: [54.333557, 48.384367],
              zoom: 10,
            }}
            width="100%"
            height="100%">
            <ZoomControl />
            {this.props.pointCoord.map((item, id) => (
              <Placemark
                key={`${id}_${item.point.address}`}
                geometry={item.coord}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: pointIcon,
                  iconImageSize: [18, 18],
                }}
                properties={{
                  iconCaption: item.point.address,
                }}
                onClick={() => {
                  this.props.selectCity(item.point, "setCityPointText");
                }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    );
  }
}

export default CityMap;
