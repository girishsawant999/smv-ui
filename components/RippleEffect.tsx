import { useEffect, useState } from "react";
import { keyframes, styled } from "../stitches.config";

type C = {
	x: number;
	y: number;
};

type RippleEffectProps = {
	variant: "dark" | "light" | "warn";
	secondaryVariant?: "white";
	className?: string;
	coords: C;
	setCoords?: (coords: C) => void;
	time?: number;
}

const rippleEffect = keyframes({
  "0%": {
    transform: "scale(1)",
    opacity: "0.2"
  },
  "50%": {
    transform: "scale(5)",
    opacity: "0.375"
  },
  "100%": {
    transform: "scale(10)",
    opacity: "0"
  }
});

const FirstRipple = styled("span", {
  width: "5px",
  height: "5px",
  position: "absolute",
  display: "block",
  content: "",
  borderRadius: "50%",
  opacity: "1",
  animation: `0.25s ease 1 forwards ${rippleEffect}`,

  variants: {
    variant: {
      light: { backgroundColor: "$gray-300" },
      dark: { backgroundColor: "$gray-600" }
    }
  }
});

const SecondRipple = styled("span", {
  width: "5px",
  height: "5px",
  position: "absolute",
  display: "block",
  content: "",
  borderRadius: "50%",
  opacity: "1",
  animation: `0.25s ease 1 forwards ${rippleEffect}`,

  variants: {
    variant: {
      light: { backgroundColor: "$gray-300" },
      dark: { backgroundColor: "$gray-600" }
    },
    secondaryVariant: {}
  },

  compoundVariants: [
    {
      variant: "light",
      secondaryVariant: "white",
      css: { backgroundColor: "white" },
    }
  ]
});

export const RippleEffect = ({
  variant = "light",
  secondaryVariant,
  className,
  coords,
  time = 400
}: RippleEffectProps) => {
  const [ isRippling, setIsRippling ] = useState(false);
  const [ showSecondaryRipple, setShowSecondaryRipple ] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      const timeout = setTimeout(() => {
        setIsRippling(false);
        setShowSecondaryRipple(false);
        clearTimeout(timeout);
      }, time);
    } else setIsRippling(false);
  }, [ coords ]);

  return (
    <>
      {isRippling && (
        <>
          <FirstRipple
            id="ripple"
            className={className}
            variant={variant}
            style={{
              left: coords.x,
              top: coords.y,
              borderRadius: "50%"
            }}
          />
          {showSecondaryRipple && (
            <SecondRipple
              id="ripple"
              className={className}
              variant={variant}
              secondaryVariant={secondaryVariant}
              style={{
                left: coords.x,
                top: coords.y,
                borderRadius: "50%"
              }}/>
          )}
        </>
      )}
    </>
  );
};