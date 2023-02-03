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

	const setSelected1 = (val: string, eraseOther: boolean = true) => {
		console.log(
			"in setSelected1",
			"select2 is ",
			selected2,
			" going to set selected1 to ",
			val,
		);
		_setSelected1(val);
		selectLanguage(0, val);
		if (eraseOther && selected2 === val) {
			setQuery2("");
			setSelected2("", false);
		}
	};

	const setSelected2 = (val: string, eraseOther: boolean = true) => {
		_setSelected2(val);
		selectLanguage(1, val);
		if (eraseOther && selected1 === val) {
			setSelected1("", false);
			setQuery1("");
		}
	};

	useEffect(() => {
		fetch("/api/list")
			.then((res) => res.json())
			.then((data) => setList(data));

		setQuery1("python");
		setSelected1("python");
		setQuery2("r");
		setSelected2("r");
	}, []);

	// if the list is empty, display "loading ..."
	// if the query is empty, display the whole list
	// othewise, filter the list to include matched items
	const filteredList = (query: string) => {
		if (list.length === 0) {
			return ["loading ..."];
		} else {
			const queryCliean = normalizeString(query);
			return list.filter((item) => normalizeString(item).includes(queryCliean));
		}
	};

	return (
		<Container>
			<div className="flex justify-around items-center gap-8">
				{[0, 1].map((idx) => {
					const selected = idx === 0 ? selected1 : selected2;
					const setSelected = idx === 0 ? setSelected1 : setSelected2;
					const query = idx === 0 ? query1 : query2;
					const setQuery = idx === 0 ? setQuery1 : setQuery2;
					const list = idx === 0 ? filteredList(query1) : filteredList(query2);
					return (
						<div className="w-3/4" key={idx}>
							<SecondaryHeading className="text-xl">
								Choose tech #{idx + 1}
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
