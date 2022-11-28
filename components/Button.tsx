import React, { useState } from "react";
import { styled } from "../stitches.config";
import { RippleEffect } from "./RippleEffect";

const DEFAULT_TAG = "button";

const Styledbutton = styled("button", {
  // Reset
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  outline: "none",
  "&::before": { boxSizing: "border-box", },
  "&::after": { boxSizing: "border-box", },

  // Custom reset?
  display: "inline-flex",
  flexShrink: 0,
  justifyContent: "center",
  lineHeight: "1",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",

  // Custom
  px: "$2",
  cursor: "pointer",
  fontFamily: "$Manrope",
  fontSize: "0.75rem",
  fontWeight: 800,
  fontVariantNumeric: "tabular-nums",
  
  "&:disabled": {
    boxShadow: "inset 0 0 0 1px $colors$slate7",
    cursor: "not-allowed",
    opacity: "0.75"
  },

  variants: {
    size: {
      "1": {
        width: "125px",
        height: "45px",
        borderRadius: "12px",
        px: "$2",
        fontSize: "$7",
        lineHeight: "$sizes$5",
      },
      "2": {
        // will scale between 256px and 375px depending on available space
        maxWidth: "375px",
        minWidth: "256px",
        width: "100%",

        borderRadius: "20px",

        height: "60px",

        px: "$3",
        fontSize: "$7",
        lineHeight: "$sizes$6",
      },
      "3": {
        borderRadius: "$2",
        height: "$7",
        px: "$4",
        fontSize: "$4",
        lineHeight: "$sizes$7",
      },
    },
    variant: {
      dark: {
        color: "white",
        background: "$gray-300"
      },
      light: {
        background: "white",
        color: "$gray-300",
        border: "solid 1px $gray-300"
      },
      warn: {
        background: "$red-300",
        color: "$red-700"
      }
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "2",
    variant: "gray",
  },
});
type StyledbuttonProps = React.ComponentProps<typeof Styledbutton> & { isRipple?: boolean };

export const Button = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, StyledbuttonProps>(
  (props, forwardedRef) => {
    const [ coords, setCoords ] = useState({
      x: -1,
      y: -1
    });
    return (
      <Styledbutton
        {...props}
        onClick={(e) => {
          if (props.isRipple) {
            const container = e.currentTarget.getBoundingClientRect();
            setCoords({
              x: e.clientX - container.left,
              y: e.clientY - container.top
            });
          }
          props.onClick && props.onClick(e);
        }}
        ref={forwardedRef}
      >
        {props.isRipple && <RippleEffect variant={props.variant as any} coords={coords} setCoords={setCoords} />}
        {props.children}
      </Styledbutton>
    );
  }
);