import type { Clue, Cursor } from "@/features/crossword/core/domain";

export const handleTabKey = (args: {
	currClue?: Clue;
	cursor: Cursor;
	sortedClues: Clue[];
}): Cursor => {
	const { currClue, cursor, sortedClues } = args;

	const currIndex = sortedClues.findIndex((clue) => clue.id === currClue?.id);

	const nextIndex = (currIndex + 1 + sortedClues.length) % sortedClues.length;
	const nextClue = sortedClues.at(nextIndex);

	return nextClue
		? {
				...cursor,
				position: nextClue.pos,
				direction: nextClue.direction,
			}
		: cursor;
};
