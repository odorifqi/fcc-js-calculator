/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import { Buttons } from "./button";
import { vars } from "./var";

const reducer = (state, action) => {
  switch (action.type) {
    case "maxDigitWarning":
    case "handleOperators":
    case "handleEvaluate":
    case "initialize":
    case "handleDecimal":
    case "handleNumbers":
      return { ...state, ...action.payload };

    default:
      throw new Error();
  }
};

function Calculator() {
  const [state, dispatch] = React.useReducer(reducer, {
    currentVal: "0",
    prevVal: "0",
    formula: "",
    currentSign: "pos",
    lastClicked: "",
  });

  const maxDigitWarning = () => {
    dispatch({
      type: "maxDigitWarning",
      payload: {
        currentVal: "Digit Limit Met",
        prevVal: state.currentVal,
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: "maxDigitWarning",
          payload: {
            currentVal: state.prevVal,
          },
        }),
      1000
    );
  };

  const handleEvaluate = () => {
    if (!state.currentVal.includes("Limit")) {
      let expression = state.formula;
      while (vars.endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, "*")
        .replace(/‑/g, "-")
        .replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      dispatch({
        type: "handleEvaluate",
        payload: {
          currentVal: answer.toString(),
          formula:
            expression
              .replace(/\*/g, "⋅")
              .replace(/-/g, "‑")
              .replace("+0+0+0+0+0+0+", "‑-")
              .replace(/(x|\/|\+)‑/, "$1-")
              .replace(/^‑/, "-") +
            "=" +
            answer,
          prevVal: answer,
          evaluated: true,
        },
      });
    }
  };

  const handleOperators = (e) => {
    if (!state.currentVal.includes("Limit")) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = state;
      dispatch({
        type: "handleOperators",
        payload: { currentVal: value, evaluated: false },
      });
      dispatch({
        type: "handleOperators",
        payload: evaluated
          ? { formula: prevVal + value }
          : !vars.endsWithOperator.test(formula)
          ? {
              prevVal: formula,
              formula: formula + value,
            }
          : !vars.endsWithNegativeSign.test(formula)
          ? {
              formula:
                (vars.endsWithNegativeSign.test(formula + value)
                  ? formula
                  : prevVal) + value,
            }
          : value !== "‑"
          ? {
              formula: prevVal + value,
            }
          : "",
      });
    }
  };

  const handleNumbers = (e) => {
    if (!state.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = state;
      const value = e.target.value;

      dispatch({ type: "handleNumbers", payload: { evaluated: false } });
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else {
        dispatch({
          type: "handleNumbers",
          payload: evaluated
            ? { currentVal: value, formula: value !== "0" ? value : "" }
            : {
                currentVal:
                  currentVal === "0" || vars.isOperator.test(currentVal)
                    ? value
                    : currentVal + value,
                formula:
                  currentVal === "0" && value === "0"
                    ? formula === ""
                      ? value
                      : formula
                    : /([^.0-9]0|^0)$/.test(formula)
                    ? formula.slice(0, -1) + value
                    : formula + value,
              },
        });
      }
    }
  };

  const handleDecimal = () => {
    if (state.evaluated === true) {
      dispatch({
        type: "handleDecimal",
        payload: {
          currentVal: "0.",
          formula: "0.",
          evaluated: false,
        },
      });
    } else if (
      !state.currentVal.includes(".") &&
      !state.currentVal.includes("Limit")
    ) {
      dispatch({ type: "handleDecimal", payload: { evaluated: false } });
      if (state.currentVal.length > 21) {
        maxDigitWarning();
      } else {
        dispatch({
          type: "handleDecimal",
          payload:
            vars.endsWithOperator.test(state.formula) ||
            (state.currentVal === "0" && state.formula === "")
              ? {
                  currentVal: "0.",
                  formula: state.formula + "0.",
                }
              : {
                  currentVal: state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
                  formula: state.formula + ".",
                },
        });
      }
    }
  };

  const initialize = () => {
    dispatch({
      type: "initialize",
      payload: {
        currentVal: "0",
        prevVal: "0",
        formula: "",
        currentSign: "pos",
        lastClicked: "",
        evaluated: false,
      },
    });
  };

  return (
    <div>
      <div className="calculator">
        <Output currentValue={state.currentVal} />
        <hr />
        <Formula formula={state.formula.replace(/x/g, "⋅")} />
        <Buttons
          decimal={handleDecimal}
          evaluate={handleEvaluate}
          initialize={initialize}
          numbers={handleNumbers}
          operators={handleOperators}
          val={state.currentVal}
        />
      </div>
    </div>
  );
}

const Output = (props) => {
  return (
    <div className="outputScreen" id="display">
      {props.currentValue}
    </div>
  );
};

const Formula = (props) => {
  return <div className="formulaScreen">{props.formula}</div>;
};

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById("root")
);

/* eslint-disable no-undef */
module.hot.accept();
