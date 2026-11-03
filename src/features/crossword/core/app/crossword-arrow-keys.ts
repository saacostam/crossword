import type { Crossword, Cursor } from "@/features/crossword/core/domain";
import type { Position } from "@/shared/misc/domain";
import type { CrosswordGridCell } from "./crossword";

export const onArrowPress = (args: {
	crossword: Crossword;
	cursor: Cursor;
	delta: Position;
	grid: CrosswordGridCell[][];
}): Cursor => {
	const { crossword, cursor, delta, grid } = args;

	let isInitial = true;
	const position: Position = {
		x: cursor.position.x,
		y: cursor.position.y,
	};

	while (isInitial || grid[position.y][position.x].status === "blocked") {
		position.x = (position.x + delta.x + crossword.size.w) % crossword.size.w;
		position.y = (position.y + delta.y + crossword.size.h) % crossword.size.h;
		isInitial = false;
	}

	return {
		...cursor,
		position,
	};
};
