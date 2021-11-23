/* eslint-disable react/prop-types */
import { vars } from "./var";
import React from "react";

const Button = (props) => (
  <button
    className={props.class}
    id={props.id}
    onClick={props.click}
    style={props.style}
    value={props.value}
  >
    {props.value}
  </button>
);

export const Buttons = (props) => {
  return (
    <div>
      <Button
        class="jumbo"
        id="clear"
        click={props.initialize}
        style={vars.clearStyle}
        value={props.val === "0" ? "AC" : "C"}
      />
      <Button
        id="divide"
        click={props.operators}
        style={vars.operatorStyle}
        value="/"
      />
      <Button
        id="multiply"
        click={props.operators}
        style={vars.operatorStyle}
        value="x"
      />
      <Button id="seven" click={props.numbers} value="7" />
      <Button id="eight" click={props.numbers} value="8" />
      <Button id="nine" click={props.numbers} value="9" />
      <Button
        id="subtract"
        click={props.operators}
        style={vars.operatorStyle}
        value="‑"
      />
      <Button id="four" click={props.numbers} value="4" />
      <Button id="five" click={props.numbers} value="5" />
      <Button id="six" click={props.numbers} value="6" />
      <Button
        id="add"
        click={props.operators}
        style={vars.operatorStyle}
        value="+"
      />
      <Button id="one" click={props.numbers} value="1" />
      <Button id="two" click={props.numbers} value="2" />
      <Button id="three" click={props.numbers} value="3" />
      <Button class="jumbo" id="zero" click={props.numbers} value="0" />
      <Button id="decimal" click={props.decimal} value="." />
      <Button
        id="equals"
        click={props.evaluate}
        style={vars.equalsStyle}
        value="="
      />
    </div>
  );
};
