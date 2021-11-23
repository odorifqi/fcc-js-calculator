export const vars = {
  isOperator: /[x/+‑]/,
  endsWithOperator: /[x+‑/]$/,
  endsWithNegativeSign: /\d[x/+‑]{1}‑$/,
  clearStyle: {
    background: "#121212",
    color: "red",
    border: "2px solid red",
    outline: "none",
  },
  operatorStyle: { background: "#666666" },
  equalsStyle: {
    background: "#121212",
    position: "absolute",
    height: 130,
    bottom: 5,
    color: "rgb(20, 235, 20)",
    border: "2px solid rgb(20, 235, 20)",
  },
};
