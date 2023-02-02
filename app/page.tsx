import GoalSelect from "@components/GoalSelect";
import Hero from "@components/Hero";
import InputWrapper from "@components/InputWrapper";
import ResultWrapper from "@components/ResultWrapper";

export default function () {
	return (
		<>
			<Hero />;
			<GoalSelect />
			<InputWrapper />
			<ResultWrapper />
		</>
	);
}
