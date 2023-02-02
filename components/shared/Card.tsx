import React from "react";
import clsx from "clsx";
import SecondaryHeading from "./SecondaryHeading";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactNode;
	title?: string;
}

export default function (props: Props) {
	return (
		<div
			className={clsx(
				"bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border w-2/3",
				props.className,
			)}
		>
			<SecondaryHeading className="text-xl">{props.title}</SecondaryHeading>
			{props.children}
		</div>
	);
}
