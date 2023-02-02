export const config = {
	runtime: "edge",
};

type Tag = {
	name: string;
	has_synonyms: boolean;
	is_moderator_only: boolean;
	is_required: boolean;
	count: number;
};

export default async function handler(req: Request, res: Response) {
	const key = process.env.STACKOVERFLOW_API_KEY || "";
	const response = await fetch(
		`https://api.stackexchange.com/2.3/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow&key=${key}`,
	);
	const data = (await response.json()).items.map((tag: Tag) => tag.name);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
