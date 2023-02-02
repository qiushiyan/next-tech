export default function Head() {
	const title = "Next Tech: choosing your next tech stack made easy";
	const description =
		"Next tech makes intelligent suggestions on your next programming language or frameworks to learn based on your needs.";

	return (
		<>
			<title>{title}</title>
			<meta content="width=device-width, initial-scale=1" name="viewport" />
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
		</>
	);
}
