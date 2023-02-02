"use client";

import { AllGoals, selectGoal, setResult } from "@lib/store";
import { ChangeEvent } from "react";
import Container from "./shared/Container";
import SecondaryHeading from "./shared/SecondaryHeading";

export default function () {
	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setResult("");
		selectGoal(e.currentTarget.value as AllGoals);
	};

	return (
		<Container>
			<div className="max-w-3xl mx-auto">
				<SecondaryHeading>Choose your goal</SecondaryHeading>
				<select
					id="goal"
					name="goal"
					className="mt-2 mx-auto w-2/3 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
					defaultValue="Canada"
					onChange={(e) => handleSelect(e)}
				>
					{(Object.keys(AllGoals) as Array<keyof typeof AllGoals>).map(
						(goal) => (
							<option className="text-center" key={goal}>
								{AllGoals[goal]}
							</option>
						),
					)}
				</select>
			</div>
		</Container>
	);
}
