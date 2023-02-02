"use client";

import { AllGoals, payloadStore } from "@lib/store";
import { useStore } from "@nanostores/react";
import Compare from "./Compare";
import FindBest from "./FindBest";
import Container from "./shared/Container";

export default function InputWrapper() {
	const payload = useStore(payloadStore);
	const component =
		payload.goal === AllGoals.COMPARE ? <Compare /> : <FindBest />;

	return <Container>{component}</Container>;
}
