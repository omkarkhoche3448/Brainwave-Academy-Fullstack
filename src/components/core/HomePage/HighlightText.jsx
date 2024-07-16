import React from "react";

function HighlightText({ text, highlightColor }) {
  let gradientBackground =
    "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)";

  if (highlightColor) {
    gradientBackground = highlightColor;
  }

  const spanStyle = {
    backgroundImage: gradientBackground,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <span style={spanStyle} className="font-bold">
      {text}
    </span>
  );
}

export default HighlightText;
