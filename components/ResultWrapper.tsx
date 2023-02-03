"use client";
import { AllGoals, payloadStore, resultStore, setResult } from "@lib/store";
import { useStore } from "@nanostores/react";
import Button from "./shared/Button";
import clsx from "clsx";
import { useState } from "react";
import Card from "./shared/Card";
import SecondaryHeading from "./shared/SecondaryHeading";
import { showError } from "@lib/utils";

export default function ResultWrapper() {
	const payload = useStore(payloadStore);
	const result = useStore(resultStore);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAnswer = async () => {
		setError("");
		setLoading(true);
		setResult("");
		try {
			const response = await fetch("/api/answer", {
				method: "POST",
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				return setError(response.statusText);
			}

			// This data is a ReadableStream
			const data = response.body;
			if (!data) {
				return;
			}

			const reader = data.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let prev = "";

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value);
				setResult(prev + chunkValue);
				prev = prev + chunkValue;
			}
		} catch (e) {
			setError(showError(e));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="my-10">
			<div className="flex justify-center items-center flex-col">
				{error && (
					<div className="w-1/4 text-center outline rounded outline-red-500 my-5">
						{error}
					</div>
				)}
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
				<div className="max-w-5xl mx-auto min-h-[10vh] flex justify-center items-center flex-col">
					{result !== "" &&
						payload.goal === AllGoals.FIND_BEST &&
						result
							.substring(result.indexOf("1") + 3) // remove the first 3 characters: 1, dot and the space
							.split(/\d\.\s?/g)
							.map((res) => {
								const langStart = res.match(/.+?\s*-\s*/)?.at(0);
								const langName = langStart?.split("-")[0];
								return res.trim() !== "" ? (
									<div className="w-3/4 mt-4">
										{langName && (
											<h3 className="text-blue-400 my-2">{langName}</h3>
										)}
										<Card key={res} className="w-full">
											{res.substring(res.indexOf("-") + 1)}
										</Card>
									</div>
								) : null;
							})}
					{result !== "" && payload.goal === AllGoals.COMPARE && (
						<div className="grid grid-cols-2 gap-8 max-w-4xl my-5">
							{result.split("\n\n").map((res, idx) => {
								const langContent = res.substring(res.indexOf("1") + 3);
								const langName = res.substring(0, res.indexOf("1") - 3);
								return (
									<div
										className="grid-cols-1 flex gap-2 flex-col items-center"
										key={langName}
									>
										<SecondaryHeading
											className={clsx(
												"text-center",
												idx % 2 === 0 ? "text-green-500" : "text-red-500",
											)}
										>
											{langName}
										</SecondaryHeading>
										{langContent.split(/\d\./).map((feat) => {
											return (
												feat.trim() !== "" && (
													<Card key={feat} className="w-full mx-10">
														{feat}
													</Card>
												)
											);
										})}
									</div>
								);
							})}
						</div>
					)}
				</div>

				{/* {JSON.stringify(result, null, 2)} */}
			</div>
		</div>
	);
}
