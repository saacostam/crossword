import type {
	Crossword,
	LeanCrossword,
} from "@/features/crossword/core/domain";

export interface CrosswordClient {
	getAll(
		req: CrosswordClientPayload["getAll"]["req"],
	): Promise<CrosswordClientPayload["getAll"]["res"]>;

	getById(
		req: CrosswordClientPayload["getById"]["req"],
	): Promise<CrosswordClientPayload["getById"]["res"]>;
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
			crosswords: LeanCrossword[];
		};
	};

	getById: {
		req: {
			id: string;
		};
		res: {
			crossword: Crossword;
		};
	};
}
