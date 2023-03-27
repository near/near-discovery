import { LoadingButton } from "@mui/lab";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export default function CustomButton(props) {
  const { theme } = useContext(ThemeContext);
  const Button = () => {
    let { to, ...p } = props;

    return (
      <LoadingButton
        {...p}
        component={LoadingButton}
        sx={{
          borderRadius: 0.5,
          paddingBlock: 1,
          paddingInline: 2,
          backgroundColor: theme.buttonColor,
          color: theme.buttonTextColor,
          textTransform: "none",

          transition: "all .2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.buttonColor,

            filter: "grayscale(75%)",
            cursor: props.disabled ? "not-allowed" : "pointer",
          },
          ...props.sx,
        }}
      >
        {props.children}
      </LoadingButton>
    );
  };

  return props?.to ? (
    <Link style={{ textDecoration: "none" }} to={props?.to}>
      <Button />
    </Link>
  ) : (
    <Button />
  );
}
