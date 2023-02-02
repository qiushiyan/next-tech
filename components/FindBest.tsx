import Container from "./shared/Container";
import Description from "./shared/Description";

export default function () {
	const placeholder =
		"I want to develop a web application that uses machine learning algorithms to detect fake news. I know the basics of HTML and CSS. I don't want to learn JavaScript.";

	return (
		<Container>
			<Description placeholder={placeholder} className="mt-10" />
		</Container>
	);
}
