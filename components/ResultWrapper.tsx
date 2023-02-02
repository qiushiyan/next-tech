"use client";
import { AllGoals, payloadStore } from "@lib/store";
import { useStore } from "@nanostores/react";
import Compare from "./Compare";
import FindBest from "./FindBest";
import Button from "./shared/Button";
import clsx from "clsx";
import { useState } from "react";
import Card from "./shared/Card";
import SecondaryHeading from "./shared/SecondaryHeading";

export default function InputWrapper() {
	const payload = useStore(payloadStore);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState("");
	const InputComponent =
		payload.goal === AllGoals.COMPARE ? <Compare /> : <FindBest />;

	const getAnswer = async () => {
		setLoading(true);
		setResult("");
		const response = await fetch("/api/answer", {
			method: "POST",
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		// This data is a ReadableStream
		const data = response.body;
		if (!data) {
			return;
		}

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			setResult((prev) => prev + chunkValue);
		}
		setLoading(false);
	};

	return (
		<>
			{InputComponent}
			<div
				className={clsx(
					"flex justify-center items-center flex-col",
					"hover:translate-y-2 duration-200",
				)}
			>
				<Button onClick={() => getAnswer()} disabled={loading}>
					{loading ? (
						<>
							<div
								className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
								role="status"
							>
								<span className="flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
									<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
								</span>
							</div>
							<span className="pl-4">Loading</span>
						</>
					) : (
						<span>Find Answer</span>
					)}
				</Button>
				{result !== "" &&
					payload.goal === AllGoals.FIND_BEST &&
					result
						.substring(result.indexOf("1") + 3) // remove the first 3 characters: 1, dot and the space
						.split(/\d./g)
						.map((res) => {
							return (
								<Card key={res} className="mt-4">
									{res}
								</Card>
							);
						})}
				{result !== "" && payload.goal === AllGoals.COMPARE && (
					<div className="grid grid-cols-2 gap-8 max-w-4xl my-5">
						{result.split("\n\n").map((res) => {
							const langContent = res.substring(res.indexOf("1") + 3);
							const langName = res.substring(0, res.indexOf("1") - 3);
							const isPro = langName.includes("Pro");
							return (
								<div className="grid-cols-1 flex gap-2 flex-col">
									<SecondaryHeading
										className={clsx(
											"text-center",
											isPro ? "text-green-500" : "text-red-500",
										)}
									>
										{langName}
									</SecondaryHeading>
									{langContent.split(/\d./).map((feat) => (
										<Card key={feat} className="w-full">
											{feat}
										</Card>
									))}
								</div>
							);
						})}
					</div>
				)}
				{/* {JSON.stringify(result, null, 2)} */}
			</div>
		</>
	);
}
