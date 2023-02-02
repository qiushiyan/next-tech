export const normalizeString = (x: string): string => {
	return x.toLowerCase().replace(/\s+/g, "");
};

export const showError = (error: unknown): string => {
	return error instanceof Error ? error.message : String(error);
};
