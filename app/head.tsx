export default function Head() {
	const title =
		"Language War: choosing your next programming languaeg made easy";
	const description =
		"Language war makes intelligent suggestions on your next programming language to learn based on your needs.";

	return (
		<>
			<title>{title}</title>
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
		</>
	);
}
