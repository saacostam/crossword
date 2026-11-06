import type { Direction, Position } from "@/shared/misc/domain";

export interface Clue {
	id: string;
	hint: string;
	word: string;
	pos: Position;
	direction: Direction;
}

export interface LeanCrossword {
	id: string;
	name: string;
	size: {
		h: number;
		w: number;
	};
}

export interface Crossword extends LeanCrossword {
	clues: Clue[];
}

export interface Char {
	id: string;
	char: string;
	position: Position;
}

export interface Cursor {
	position: Position;
	direction: Direction;
}

export type CrosswordGridCell =
	| {
			id: string;
			status: "blocked";
	  }
	| {
			id: string;
			status: "idle" | "highlighted" | "focused";
			realValue: string;
			value: string;
	  };

export type CrosswordGrid = CrosswordGridCell[][];

export type CrosswordIdGrid = string[][];
