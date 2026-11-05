import type {
	Char,
	CrosswordGrid,
	Cursor,
} from "@/features/crossword/core/domain";
import type { Position } from "@/shared/misc/domain";

export const handleBackspaceKey = (args: {
	chars: Char[];
	cursor: Cursor;
	grid: CrosswordGrid;
}): {
	cursor: Cursor;
	chars: Char[];
} => {
	const { chars, cursor, grid } = args;

	const char = chars.find(
		(char) =>
			char.position.x === cursor.position.x &&
			char.position.y === cursor.position.y,
	);

	// If there is a char we simply remove and don't move cursor
	if (char?.char) {
		return {
			cursor,
			chars: chars.filter((pc) => pc.id !== char.id),
		};
	}

	// Else, we move cursor and remove newly focused char
	const positionCandidate: Position = {
		x: cursor.position.x + (cursor.direction === "horizontal" ? -1 : 0),
		y: cursor.position.y + (cursor.direction === "vertical" ? -1 : 0),
	};

	if (positionCandidate.x < 0 || positionCandidate.y < 0)
		return { cursor, chars };

	const cellCandidate = grid.at(positionCandidate.y)?.at(positionCandidate.x);
	if (cellCandidate?.status === "blocked") return { cursor, chars };

	const newChar = chars.find(
		(char) =>
			char.position.x === positionCandidate.x &&
			char.position.y === positionCandidate.y,
	);
	const newChars = chars.filter((pc) => pc.id !== newChar?.id);

	return {
		cursor: {
			...cursor,
			position: positionCandidate,
		},
		chars: newChars,
	};
};
