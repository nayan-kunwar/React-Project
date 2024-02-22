import React from "react";
//Default values are assigned to some of the properties using the assignment syntax (=).
//If a particular prop is not provided when using the Button component, it will take the default value.

export default function Button({
  //The children prop is used to render the content inside the button. This can include text, icons, or other React components.
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
