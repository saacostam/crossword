import type { Clue, Cursor } from "@/features/crossword/core/domain";

export const handleTabKey = (args: {
	currClue?: Clue;
	cursor: Cursor;
	sortedClues: Clue[];
	shift?: boolean;
}): Cursor => {
	const { currClue, cursor, sortedClues, shift } = args;

	const delta = shift ? -1 : 1;

	const currIndex = sortedClues.findIndex((clue) => clue.id === currClue?.id);

	const nextIndex =
		(currIndex + delta + sortedClues.length) % sortedClues.length;
	const nextClue = sortedClues.at(nextIndex);

	return nextClue
		? {
				...cursor,
				position: nextClue.pos,
				direction: nextClue.direction,
			}
		: cursor;
};
