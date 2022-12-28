import React, { useEffect, useState } from "react";
import { clsx } from "../../utils";
import { CrossButton } from "../Button";
import "./style.scss";

export interface IOverlay {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	theme?: "light" | "dark";
	coords?: {
		x: number;
		y: number;
	};
}
const Overlay = ({ children, open, onClose, theme = "light", coords }: IOverlay): JSX.Element => {
	const [innerHeight, setInnerHeight] = useState<number | null>(null);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.removeProperty("overflow");
		}
	}, [open]);

	useEffect(() => {
    if(typeof window === 'undefined') return;
		const handleResize = () => {
			setInnerHeight(window.innerHeight);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [window?.innerHeight]);

	return (
		<div
			data-show={open}
			data-theme={theme}
			className={clsx("overlayContainer")}
			style={
				{
					"--transform-coords": coords ? `${coords.x}px ${coords.y}px` : "center",
					"--window-height": innerHeight ? `${innerHeight}px` :  '100vh'
				} as React.CSSProperties
			}>
			<CrossButton ripple={false} onClick={onClose} className="close-button" />
			<div className={clsx("overlayContent")}>
				{children}
			</div>
		</div>
	);
};

export default Overlay;
