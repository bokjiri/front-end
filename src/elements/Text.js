import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    size,
    color,
    bold,
    margin,
    width,
    height,
    wordbreak,
    padding,
    position,
    top,
    left,
    textalign,
    _onClick,
    cursor,
    minWidth,
    is_flex,
    zindex,
    justifycontent,
    fontFamily,
  } = props;
  const styles = {
    size,
    color,
    bold,
    margin,
    width,
    height,
    wordbreak,
    padding,
    position,
    top,
    left,
    textalign,
    cursor,
    minWidth,
    is_flex,
    zindex,
    justifycontent,
    fontFamily,
  };
  return (
    <React.Fragment>
      <P {...styles} onClick={_onClick}>
        {children}
      </P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  size: null,
  bold: false,
  color: "#000000",
  margin: null,
  width: null,
  height: null,
  wordbreak: false,
  padding: null,
  position: null,
  top: null,
  left: null,
  textalign: false,
  justifycontent: false,
  _onClick: () => {},
  cursor: "default",
  minWidth: null,
  is_flex: false,
  zindex: false,
  fontFamily: null,
};
const P = styled.p`
  ${(props) => `font-family : ${props.fontFamily};`};
  /* z-index: 1; */
  z-index: ${(props) => (props.zindex ? `1;` : null)};
  height: ${(props) => props.height};
  word-break: ${(props) => (props.wordbreak ? `break-all` : null)};
  ${(props) => (props.bold ? `font-weight: 600;` : `font-weight: 350;`)};
  ${(props) => `color : ${props.color};`};
  ${(props) => `font-size: ${props.size};`};
  ${(props) => `margin : ${props.margin};`};
  ${(props) => `width : ${props.width};`};
  ${(props) => `height : ${props.height};`};
  ${(props) => `padding : ${props.padding};`};
  ${(props) => `position : ${props.position};`};
  ${(props) => `top : ${props.top};`};
  ${(props) => `left : ${props.left};`};
  ${(props) => (props.textalign ? `text-align: center;` : null)};
  ${(props) => (props.justifycontent ? `justify-content: center;` : null)};
  cursor: ${(props) => props.cursor};
  white-space: pre-wrap;
  min-width: ${(props) => props.minWidth}; // 최소 width 값 지정
  ${(props) =>
    props.is_flex
      ? `display: flex; align-tiems: center; justify-content: space-between;`
      : ""}
`;

export default Text;