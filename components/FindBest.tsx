import { setDescription } from "@lib/store";
import Container from "./shared/Container";
import SecondaryHeading from "./shared/SecondaryHeading";

export default function () {
	return (
		<Container>
			<SecondaryHeading>Write down your needs</SecondaryHeading>
			<form className="w-2/3 mx-auto my-4">
				<textarea
					rows={3}
					name="comment"
					id="comment"
					className="block w-full rounded-lg resize-none border-0 border-b border-transparent px-4 py-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
					placeholder="I want to develop a web application that uses machine learning algorithms to detect fake news. I know the basics of HTML and CSS. I don't want to learn JavaScript."
					defaultValue={""}
					onChange={(e) => setDescription(e.currentTarget.value)}
				/>
			</form>
		</Container>
	);
}
