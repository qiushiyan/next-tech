import { atom, map } from "nanostores";

export enum AllGoals {
	FIND_BEST = "Find the best technology for a task",
	COMPARE = "Compare two languages/frameworks",
}

export interface Payload {
	goal: AllGoals;
	description: string;
	languages: [string, string];
}

// export const selectedGoal = atom<AllGoals>(AllGoals.COMPARE);

// export const switchGoal = (goal: AllGoals) => {
// 	selectedGoal.set(goal);
// };

export const payloadStore = map<Payload>({
	goal: AllGoals.FIND_BEST,
	description: "",
	languages: ["", ""],
});

export const resultStore = atom<string>("");

export const selectLanguage = (index: 0 | 1, lang: string) => {
	const langs = payloadStore.get().languages;
	langs[index] = lang;
	payloadStore.setKey("languages", langs);
};

export const selectGoal = (goal: AllGoals) => {
	payloadStore.setKey("goal", goal);
};

export const setDescription = (description: string) => {
	payloadStore.setKey("description", description);
};

export const setResult = (result: string) => {
	resultStore.set(result);
};
