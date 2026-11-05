import { v4 as uuid } from "uuid";
import type {
	Char,
	Clue,
	Crossword,
	CrosswordGridCell,
	Cursor,
} from "@/features/crossword/core/domain";
import type { Direction, Position } from "@/shared/misc/domain";

export function computeCrosswordGrid(args: {
	chars: Char[];
	crossword: Crossword;
	cursor: Cursor;
}): CrosswordGridCell[][] {
	const { chars, crossword, cursor } = args;

	const grid: CrosswordGridCell[][] = new Array(crossword.size.h)
		.fill(null)
		.map(() =>
			new Array(crossword.size.w).fill(null).map(
				(): CrosswordGridCell => ({
					id: uuid(),
					status: "blocked",
				}),
			),
		);

	for (let i = 0; i < crossword.clues.length; i++) {
		const clue = crossword.clues[i];

		for (let wordIndex = 0; wordIndex < clue.word.length; wordIndex++) {
			const position: Position = {
				x: clue.pos.x + (clue.direction === "horizontal" ? wordIndex : 0),
				y: clue.pos.y + (clue.direction === "vertical" ? wordIndex : 0),
			};

			const cell = grid.at(position.y)?.at(position.x);
			if (!cell) continue;

			const matchingChar = chars.find(
				(char) =>
					char.position.x === position.x && char.position.y === position.y,
			);

			grid[position.y][position.x] = {
				...grid[position.y][position.x],
				status: "idle",
				realValue: clue.word[wordIndex],
				value: matchingChar?.char ?? "",
			};
		}
	}

	const explore = (initPos: Position, delta: Position) => {
		const position: Position = {
			x: initPos.x,
			y: initPos.y,
		};

		while (
			0 <= position.y &&
			position.y < crossword.size.h &&
			0 <= position.x &&
			position.x < crossword.size.w &&
			grid[position.y][position.x].status !== "blocked"
		) {
			grid[position.y][position.x].status = "highlighted";

			position.x = position.x + delta.x;
			position.y = position.y + delta.y;
		}
	};

	if (cursor.direction === "horizontal") {
		explore(cursor.position, { x: -1, y: 0 });
		explore(cursor.position, { x: 1, y: 0 });
	} else {
		explore(cursor.position, { x: 0, y: -1 });
		explore(cursor.position, { x: 0, y: 1 });
	}

	const cursorCell = grid[cursor.position.y][cursor.position.x];
	grid[cursor.position.y][cursor.position.x] =
		cursorCell.status === "blocked"
			? cursorCell
			: {
					...cursorCell,
					status: "focused",
				};

	return grid;
}

export function categorizeAndSortClues(args: {
	clues: Clue[];
}): Record<Direction, Clue[]> {
	const { clues } = args;

	// Categorize
	const response: Record<Direction, Clue[]> = {
		horizontal: [],
		vertical: [],
	};

	for (const clue of clues) {
		if (clue.direction === "horizontal") response.horizontal.push(clue);
		else response.vertical.push(clue);
	}

	// Sort
	response.horizontal.sort((a, b) =>
		a.pos.y === b.pos.y ? a.pos.x - b.pos.x : a.pos.y - b.pos.y,
	);
	response.vertical.sort((a, b) =>
		a.pos.x === b.pos.x ? a.pos.y - b.pos.y : a.pos.x - b.pos.x,
	);

	return response;
}

export function getCurrentClue(args: {
	cursor: Cursor;
	grid: CrosswordGridCell[][];
	clues: Clue[];
}) {
	const {
		cursor: { direction, position },
		grid,
		clues,
	} = args;

	const delta = direction === "horizontal" ? { x: -1, y: 0 } : { x: 0, y: -1 };

	const currPosition: Position = {
		x: position.x,
		y: position.y,
	};

	while (
		0 <= currPosition.y &&
		currPosition.y < grid.length &&
		0 <= currPosition.x &&
		currPosition.x < (grid.at(0)?.length ?? 0) &&
		grid[currPosition.y][currPosition.x].status !== "blocked"
	) {
		currPosition.x = currPosition.x + delta.x;
		currPosition.y = currPosition.y + delta.y;
	}

	currPosition.x += direction === "horizontal" ? 1 : 0;
	currPosition.y += direction === "vertical" ? 1 : 0;

	const clue = clues.find(
		(c) =>
			c.pos.x === currPosition.x &&
			c.pos.y === currPosition.y &&
			c.direction === direction,
	);

	return clue;
}
