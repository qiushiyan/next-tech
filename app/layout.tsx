import Header from "@components/Header";
import "./styles/tailwind.css";
import { Inter, Lexend } from "@next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "500", "700"],
});

const lexend = Lexend({
	subsets: ["latin"],
	weight: ["300", "500", "700"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body className="bg-gradient-to-br from-cyan-100 to-indigo-100 via-white min-h-screen font-sans">
				<Header />
				<div className="font-sans">
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
