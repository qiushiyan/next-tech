// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AllGoals, Payload } from "@lib/store";
import { OpenAIStream, OpenAIStreamPayload } from "@lib/stream";

export const config = {
	runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
	throw new Error("Missing env var from OpenAI");
}

const handler = async (req: Request) => {
	const payload = (await req.json()) as Payload;
	let prompt: string;
	if (payload.goal === AllGoals.COMPARE) {
		prompt = `Compare ${payload.languages[0]} with ${payload.languages[1]}. \nMake a list of 3 pros and cons for each language, each pro or con should be less than 30 words. Make sure it meets my needs. ${payload.description}. Answer in the form of "{Language} {Pros}" and "{Language} {Cons}".`;
	} else if (payload.goal === AllGoals.FIND_BEST) {
		prompt = `${payload.description}. \nGive me a list of the top 3 programming languages or frameworks in those languages I could learn, include a reason shorter than 50 words and a link to resources. Answer in to form of "{langauge} - {reason}"`;
	}

	const request: OpenAIStreamPayload = {
		model: "text-davinci-003",
		prompt: prompt!,
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: payload.goal === AllGoals.COMPARE ? 300 : 240,
		stream: true,
		n: 1,
	};

	const stream = await OpenAIStream(request);

	return new Response(stream);
};

export default handler;
