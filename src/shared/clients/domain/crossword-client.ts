import type { Crossword } from "@/features/crossword/core/domain";

export interface CrosswordClient {
	getAll(
		req: CrosswordClientPayload["getAll"]["req"],
	): Promise<CrosswordClientPayload["getAll"]["res"]>;
}

export interface CrosswordClientPayload {
	getAll: {
		req: {
			page: number;
			size?: number;
		};
		res: {
			total: number;
			page: number;
			crosswords: Crossword[];
		};
	};
}
