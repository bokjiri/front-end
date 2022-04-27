import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    color,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    _disabled,
    backgroundColor,
    height,
    fontSize,
    radius
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    backgroundColor: backgroundColor,
    height: height,
    color: color,
    fontSize: fontSize,
    radius: radius,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} disabled={_disabled}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100px",
  padding: "12px 0px",
  disabled: false,
  backgroundColor: "#4B7BE5",
  height: "50px",
  color: "white",
};


const ElButton = styled.button`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")};
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) =>
    props.disabled
      ? `background-color: tomato;`
      : `background-color: #4D96FF;`};
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    cursor: pointer;
  }
  ${(props) => (props.height ? `height: ${props.height};` : "50px")};
`;

const FloatButton = styled.button`
  width: 50px;
  ${(props) => (props.height ? `height: ${props.height};` : "50px")};
  background-color: #798777;
  color: ${(props) => (props.color ? `color: ${props.color};` : "")};
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
