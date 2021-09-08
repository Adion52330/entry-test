import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isWhite, ...otherProps }) => (
   <button
      className={`${isWhite ? "white-button" : ""} custom-button`}
      {...otherProps}>
      {children}
   </button>
);

export default CustomButton;
