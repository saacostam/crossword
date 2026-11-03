import { v4 as uuid } from "uuid";
import type { CrosswordGridCell } from "@/features/crossword/core/app/crossword";
import type { Char, Cursor } from "@/features/crossword/core/domain";
import type { Position } from "@/shared/misc/domain";

export const handleLetterKey = (args: {
	chars: Char[];
	cursor: Cursor;
	grid: CrosswordGridCell[][];
	letter: string;
}): {
	cursor: Cursor;
	chars: Char[];
} => {
	const { chars, cursor, grid, letter } = args;

	// Update char in cell
	const char = letter.toLocaleUpperCase();

	const doesCellHaveChar = chars.find(
		(c) =>
			c.position.x === cursor.position.x && c.position.y === cursor.position.y,
	);

	const newChars = doesCellHaveChar
		? chars.map((pc) =>
				pc.id === doesCellHaveChar.id
					? {
							...doesCellHaveChar,
							char,
						}
					: pc,
			)
		: [
				...chars,
				{
					id: uuid(),
					char,
					position: cursor.position,
				},
			];

	// Update cursor position
	const positionCandidate: Position = {
		x: cursor.position.x + (cursor.direction === "horizontal" ? 1 : 0),
		y: cursor.position.y + (cursor.direction === "vertical" ? 1 : 0),
	};

	const cellCandidate = grid.at(positionCandidate.y)?.at(positionCandidate.x);
	if (cellCandidate === undefined || cellCandidate.status === "blocked")
		return { cursor, chars: newChars };

	return {
		cursor: { ...cursor, position: positionCandidate },
		chars: newChars,
	};
};
