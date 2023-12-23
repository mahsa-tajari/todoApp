import { useState } from "react";

export default function Button({
  color,
  backgroundColor,
  border,
  fontSize,
  padding,
  cursor,
  borderRadius,
  fontWeight,
  width,
  action,
  margin,
  position,
  right,
  top,
  left,
  hoverBackground,
  height,
  children,
}) {
  const [mouseEnter, setMouseEnter] = useState(false);
  return (
    <button
      onClick={() => action()}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      style={{
        color: color,
        backgroundColor: !mouseEnter ? backgroundColor : hoverBackground,
        border: border,
        fontSize: fontSize,
        padding: padding,
        cursor: cursor,
        borderRadius: borderRadius,
        fontWeight: fontWeight,
        width: width,
        margin: margin,
        position: position,
        right: right,
        top: top,
        left: left,
        height: height,
      }}
    >
      {children}
    </button>
  );
}
