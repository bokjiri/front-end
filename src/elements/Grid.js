import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    zIndex,
    _onMouseOver,
    _onMouseOut,
    overflow,
    radius,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    children,
    border,
    is_flex,
    width,
    padding,
    margin,
    bg,
    _onClick,
    position,
    height,
    cursor,
    minWidth,
    maxWidth,
    minHeight,
    top,
    left,
    right,
    bottom,
    borderRadius,
    borderRight,
    berderLeft,
    borderBottom,
    borderTop,
    wrap,
    className,
  } = props;

  const styles = {
    zIndex: zIndex,
    overflow: overflow,
    display: display,
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    alignItems: alignItems,
    is_flex: is_flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    bg: bg,
    border: border,
    position: position,
    cursor: cursor,
    borderTop: borderTop,
    borderBottom: borderBottom,
    berderLeft: berderLeft,
    borderRight: borderRight,
    borderRadius: borderRadius,
    minWidth: minWidth,
    minHeight: minHeight,
    maxWidth: maxWidth,
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    radius: radius,
    wrap: wrap,
    className: className,
  };

  return (
    <>
      <GridBox
        {...styles}
        onClick={_onClick}
        onMouseOver={_onMouseOver}
        onMouseOut={_onMouseOut}
      >
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  margin: false,
  padding: false,
  bg: false,
  _onClick: () => {},
  border: false,
  borderTop: false,
  borderBottom: false,
  berderLeft: false,
  borderRight: false,
  borderRadius: null,
  position: false,
  cursor: "Default",
  minWidth: null, // 최소 width 값 지정
  minHeight: null,
  maxWidth: null,
  top: null,
  left: null,
  right: null,
  bottom: null,
  alignItems: null,
  display: null,
  flexDirection: null,
  justifyContent: null,
};

const GridBox = styled.div`
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : "")}
  z-index: ${(props) => props.zIndex};
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  box-sizing: border-box;
  cursor: ${(props) => props.cursor};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  ${(props) => (props.padding ? `padding:${props.padding};` : "")}
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
${(props) => (props.bg ? `background-color:${props.bg};` : "")}
${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: center;`
      : ""}
${(props) => (props.border ? `border:${props.border};` : "border: none;")}
${(props) => (props.position ? `position: ${props.position};` : "")}
${(props) =>
    props.borderBottom ? `border-bottom : ${props.borderBottom};` : ""}
  ${(props) => (props.borderTop ? `border-top : ${props.borderTop};` : "")}
  ${(props) => (props.berderLeft ? `border-left : ${props.berderLeft};` : "")}
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  border-radius: ${(props) => props.borderRadius};
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : "")}
`;

export default Grid;