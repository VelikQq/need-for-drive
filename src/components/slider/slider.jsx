import React from "react";
import classnames from "classnames";
import "./slider.scss";
import car0 from "../../assets/img/bg_slider_0.jpg";
import car1 from "../../assets/img/bg_slider_1.jpg";
import car2 from "../../assets/img/bg_slider_2.jpg";
import car3 from "../../assets/img/bg_slider_3.jpg";

// swiper library
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination]);

export default function Slider(props) {
  const gradient = "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)";
  const cars = [car0, car1, car2, car3];
  const dataSlider = [
    {
      name: "Бесплатная парковка",
      desc:
        "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
      color: "green",
    },
    {
      name: "Страховка",
      desc: "Полная страховка страховка автомобиля",
      color: "blue",
    },
    {
      name: "Бензин",
      desc: "Полный бак на любой заправке города за наш счёт",
      color: "red",
    },
    {
      name: "Обслуживание",
      desc: "Автомобиль проходит еженедельное ТО",
      color: "violet",
    },
  ];

  return (
    <section className={classnames("slider", { disabled: props.burger })}>
      <Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
        {dataSlider.map((item, ind) => {
          return (
            <SwiperSlide>
              <div
                className="slider__content"
                style={{
                  backgroundImage: `${gradient}, url(${cars[ind]})`,
                }}>
                <div className="slider__content__wrapper">
                  <div className="slider__content__title">{item.name}</div>
                  <p className="slider__content__text">{item.desc}</p>
                  <button
                    className={`slider__content__button button ${item.color}`}>
                    Подробнее
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
