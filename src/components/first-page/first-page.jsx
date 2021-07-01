import React from "react";
import Slider from "../slider/slider";
import Content from "../content/content";

export default function FirstPage(props) {
  return (
    <>
      <Content />
      <Slider burger={props.burger} />
    </>
  );
}
