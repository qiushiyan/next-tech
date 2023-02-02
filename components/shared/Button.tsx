import React from "react";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	className?: string;
}

export default function (props: Props) {
	return (
		<button
			type="button"
			className={clsx(
				"inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-sm ",
				"hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
				props.className,
			)}
			{...props}
		>
			{props.children}
		</button>
	);
}
