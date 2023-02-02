import React from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
	children?: React.ReactNode;
	className?: string;
}

export default function (props: Props) {
	return (
		<h2
			className={clsx(props.className, "text-2xl font-bold text-gray-700")}
			{...props}
		>
			{props.children}
		</h2>
	);
}
