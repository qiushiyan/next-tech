import { useCallback, useEffect, useState } from "react";
import Container from "./shared/Container";
import SecondaryHeading from "./shared/SecondaryHeading";
import { normalizeString } from "@lib/utils";
import Dropdown from "./shared/Dropdown";
import { selectLanguage } from "@lib/store";
import Description from "./shared/Description";

export default function Compare() {
	const placeholder =
		"I want to learn Bayesian statistics craft data visualizations. I want to deploy my model to the cloud easily.";
	const [list, setList] = useState([]);
	const [selected1, _setSelected1] = useState("");
	const [selected2, _setSelected2] = useState("");
	const [query1, setQuery1] = useState("");
	const [query2, setQuery2] = useState("");

	const setSelected1 = useCallback((val: string) => {
		_setSelected1(val);
		selectLanguage(0, val);
	}, []);

	const setSelected2 = useCallback((val: string) => {
		_setSelected2(val);
		selectLanguage(1, val);
	}, []);

	useEffect(() => {
		fetch("/api/list")
			.then((res) => res.json())
			.then((data) => setList(data));

		setQuery1("Python");
		setSelected1("Python");
		setQuery2("R");
		setSelected2("R");
	}, []);

	// if the list is empty, display "loading ..."
	// if the query is empty, display the whole list
	// othewise, filter the list to include matched items, and exclude the selected item on the other dropdown
	const filteredList = (query: string, exclude: string) => {
		if (list.length === 0) {
			return ["loading ..."];
		} else {
			const queryCliean = normalizeString(query);
			const excludeClean = normalizeString(exclude);
			return list.filter((item) => {
				const itemClean = normalizeString(item);
				return itemClean.includes(queryCliean) && itemClean !== excludeClean;
			});
		}
	};

	return (
		<Container>
			<div className="flex justify-around items-center gap-8">
				{[1, 2].map((idx) => {
					const selected = idx === 1 ? selected1 : selected2;
					const setSelected = idx === 1 ? setSelected1 : setSelected2;
					const query = idx === 1 ? query1 : query2;
					const setQuery = idx === 1 ? setQuery1 : setQuery2;
					const list =
						idx === 1
							? filteredList(query1, selected2)
							: filteredList(query2, selected1);
					return (
						<div className="w-3/4" key={idx}>
							<SecondaryHeading className="text-xl">
								Choose tech #{idx}
							</SecondaryHeading>
							<Dropdown
								selected={selected}
								setSelected={setSelected}
								query={query}
								setQuery={setQuery}
								filteredList={list}
							/>
						</div>
					);
				})}
			</div>
			<Description placeholder={placeholder} className="mt-10" />
		</Container>
	);
}
