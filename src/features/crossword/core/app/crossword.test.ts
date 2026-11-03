import { describe, expect, it } from "vitest";
import type { Clue } from "@/features/crossword/core/domain";
import { categorizeAndSortClues } from "./crossword";

describe("categorizeAndSortClues", () => {
	it("checks y first before x for horizontal", () => {
		const first: Clue = {
			id: "1",
			hint: "hello",
			word: "world",
			pos: {
				x: 0,
				y: 0,
			},
			direction: "horizontal",
		};
		const second: Clue = {
			id: "2",
			hint: "hello",
			word: "world",
			pos: {
				x: 2,
				y: 0,
			},
			direction: "horizontal",
		};
		const third: Clue = {
			id: "3",
			hint: "hello",
			word: "world",
			pos: {
				x: 0,
				y: 2,
			},
			direction: "horizontal",
		};

		const clues: Clue[] = [third, first, second];

		const result = categorizeAndSortClues({
			clues,
		});

		expect(result.vertical).toStrictEqual([]);
		expect(result.horizontal).toStrictEqual([first, second, third]);
	});

	it("checks x first before y for vertical", () => {
		const first: Clue = {
			id: "1",
			hint: "hello",
			word: "world",
			pos: {
				x: 0,
				y: 0,
			},
			direction: "vertical",
		};
		const second: Clue = {
			id: "2",
			hint: "hello",
			word: "world",
			pos: {
				x: 0,
				y: 2,
			},
			direction: "vertical",
		};
		const third: Clue = {
			id: "3",
			hint: "hello",
			word: "world",
			pos: {
				x: 2,
				y: 0,
			},
			direction: "vertical",
		};

		const clues: Clue[] = [third, first, second];

		const result = categorizeAndSortClues({
			clues,
		});

		expect(result.horizontal).toStrictEqual([]);
		expect(result.vertical).toStrictEqual([first, second, third]);
	});
});
