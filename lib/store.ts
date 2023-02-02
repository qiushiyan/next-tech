import { map } from "nanostores";

export enum AllGoals {
	COMPARE = "Compare two programming languages",
	FIND_BEST = "Find the best programming language for a task",
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
	goal: AllGoals.COMPARE,
	description: "",
	languages: ["Python", "R"],
});

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
