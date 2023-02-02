import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
	return <div className="max-w-5xl mx-auto text-center my-8">{children}</div>;
}
