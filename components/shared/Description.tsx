"use client";

import { setDescription } from "@lib/store";
import SecondaryHeading from "./SecondaryHeading";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
	placeholder?: string;
	title?: string;
}

export default function ({
	placeholder = "",
	title = "Write down your needs",
	...props
}: Props) {
	return (
		<div {...props}>
			<SecondaryHeading>{title}</SecondaryHeading>
			<form className="w-2/3 mx-auto my-4">
				<textarea
					rows={3}
					name="comment"
					id="comment"
					className="block w-full rounded-lg resize-none border-0 border-b border-transparent px-4 py-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
					placeholder={placeholder}
					defaultValue={""}
					onChange={(e) => setDescription(e.currentTarget.value)}
				/>
			</form>
		</div>
	);
}
