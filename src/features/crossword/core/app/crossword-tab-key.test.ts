import { describe, expect, it } from "vitest";
import type { Clue, Cursor } from "@/features/crossword/core/domain";
import { handleTabKey } from "./crossword-tab-key";

describe("handleTabKey", () => {
	const createCursor = (
		x: number,
		y: number,
		direction: Cursor["direction"] = "horizontal",
	): Cursor =>
		({
			position: { x, y },
			direction,
		}) as Cursor;

	const createClue = (
		id: string,
		x: number,
		y: number,
		direction: Clue["direction"] = "horizontal",
	): Clue =>
		({
			id,
			pos: { x, y },
			direction,
		}) as Clue;

	const cursor = createCursor(0, 0);

	const clues = [
		createClue("1", 0, 0, "horizontal"),
		createClue("2", 2, 0, "vertical"),
		createClue("3", 1, 2, "horizontal"),
	];

	it("should move the cursor to the next clue", () => {
		const result = handleTabKey({
			currClue: clues[0],
			cursor,
			sortedClues: clues,
		});

		expect(result).toEqual({
			...cursor,
			position: clues[1].pos,
			direction: clues[1].direction,
		});
	});

	it("should wrap around to the first clue when on the last clue", () => {
		const result = handleTabKey({
			currClue: clues[2],
			cursor,
			sortedClues: clues,
		});

		expect(result).toEqual({
			...cursor,
			position: clues[0].pos,
			direction: clues[0].direction,
		});
	});

	it("should move to the first clue when no current clue is provided", () => {
		const result = handleTabKey({
			cursor,
			sortedClues: clues,
		});

		expect(result).toEqual({
			...cursor,
			position: clues[0].pos,
			direction: clues[0].direction,
		});
	});

	it("should return the cursor when there are no clues", () => {
		const result = handleTabKey({
			currClue: clues[0],
			cursor,
			sortedClues: [],
		});

		expect(result).toBe(cursor);
	});

	it("should return the cursor when the current clue is not in the sorted clues", () => {
		const currClue = createClue("unknown", 1, 1);

		const result = handleTabKey({
			currClue,
			cursor,
			sortedClues: clues,
		});

		expect(result).toEqual({
			...cursor,
			position: clues[0].pos,
			direction: clues[0].direction,
		});
	});

	it("should preserve other cursor properties", () => {
		const cursor = createCursor(1, 1, "vertical");

		const result = handleTabKey({
			currClue: clues[0],
			cursor,
			sortedClues: clues,
		});

		expect(result).toEqual({
			...cursor,
			position: clues[1].pos,
			direction: clues[1].direction,
		});
	});
});
