import { describe, expect, it } from "vitest";
import type {
	Crossword,
	CrosswordGridCell,
	Cursor,
} from "@/features/crossword/core/domain";
import { onArrowPress } from "./crossword-arrow-keys";

describe("onArrowPress", () => {
	const crossword = {
		size: { w: 3, h: 3 },
	} as Crossword;

	const createCursor = (x: number, y: number): Cursor => ({
		position: { x, y },
		direction: "horizontal",
	});

	const createGrid = (statuses: string[][]): CrosswordGridCell[][] =>
		statuses.map((row) =>
			row.map((status) => ({ status }) as CrosswordGridCell),
		);

	const grid = createGrid([
		["open", "open", "open"],
		["open", "blocked", "open"],
		["open", "open", "open"],
	]);

	it("should move right to the next cell", () => {
		const cursor = createCursor(0, 0);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 1, y: 0 },
			grid,
		});

		expect(result.position).toEqual({ x: 1, y: 0 });
	});

	it("should move left to the previous cell", () => {
		const cursor = createCursor(2, 0);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: -1, y: 0 },
			grid,
		});

		expect(result.position).toEqual({ x: 1, y: 0 });
	});

	it("should move down to the next cell", () => {
		const cursor = createCursor(0, 0);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 0, y: 1 },
			grid,
		});

		expect(result.position).toEqual({ x: 0, y: 1 });
	});

	it("should move up to the previous cell", () => {
		const cursor = createCursor(0, 2);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 0, y: -1 },
			grid,
		});

		expect(result.position).toEqual({ x: 0, y: 1 });
	});

	it("should wrap around the grid boundaries", () => {
		const cursor = createCursor(2, 0);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 1, y: 0 },
			grid,
		});

		expect(result.position).toEqual({ x: 0, y: 0 });
	});

	it("should skip blocked cells", () => {
		const cursor = createCursor(0, 1);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 1, y: 0 },
			grid,
		});

		expect(result.position).toEqual({ x: 2, y: 1 });
	});

	it("should preserve the cursor properties", () => {
		const cursor = createCursor(0, 0);

		const result = onArrowPress({
			crossword,
			cursor,
			delta: { x: 1, y: 0 },
			grid,
		});

		expect(result).toEqual({
			...cursor,
			position: { x: 1, y: 0 },
		});
	});
});
