import GithubIcon from "./shared/GithubIcon";

export default function () {
	return (
		<a
			href="https://github.com/qiushiyan/languagewar"
			target="_blank"
			rel="noreferrer"
			className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-black bg-white px-7 py-2 text-black transition-colors hover:bg-black hover:text-white"
		>
			<GithubIcon className="w-5 h-5" />
			<p className="text-sm font-semibold">Star on GitHub</p>
		</a>
	);
}
