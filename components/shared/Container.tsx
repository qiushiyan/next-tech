import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

export default function Container({ children, className }: Props) {
	return (
		<div className={clsx("max-w-5xl mx-auto text-center my-10", className)}>
			{children}
		</div>
	);
}
