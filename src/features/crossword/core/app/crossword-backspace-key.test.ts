import { describe, expect, it } from "vitest";
import type {
	Char,
	CrosswordGridCell,
	Cursor,
} from "@/features/crossword/core/domain";
import { handleBackspaceKey } from "./crossword-backspace-key";

describe("handleBackspaceKey", () => {
	const createCursor = (
		x: number,
		y: number,
		direction: Cursor["direction"] = "horizontal",
	): Cursor =>
		({
			position: { x, y },
			direction,
		}) as Cursor;

	const createChar = (id: string, char: string, x: number, y: number): Char =>
		({
			id,
			char,
			position: { x, y },
		}) as Char;

	const createGrid = (statuses: string[][]): CrosswordGridCell[][] =>
		statuses.map((row) =>
			row.map((status) => ({ status }) as CrosswordGridCell),
		);

	const grid = createGrid([
		["open", "open", "open"],
		["open", "blocked", "open"],
		["open", "open", "open"],
	]);

	it("should remove the character at the current position without moving the cursor", () => {
		const cursor = createCursor(1, 0);
		const chars = [createChar("1", "A", 1, 0), createChar("2", "B", 2, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result).toEqual({
			cursor,
			chars: [chars[1]],
		});
	});

	it("should move the cursor backward horizontally when the current cell is empty", () => {
		const cursor = createCursor(2, 0);
		const chars = [createChar("1", "A", 0, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result.cursor.position).toEqual({ x: 1, y: 0 });
		expect(result.chars).toEqual([chars[0]]);
	});

	it("should move the cursor backward vertically when the current cell is empty", () => {
		const cursor = createCursor(0, 2, "vertical");
		const chars = [createChar("1", "A", 0, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result.cursor.position).toEqual({ x: 0, y: 1 });
		expect(result.chars).toEqual([chars[0]]);
	});

	it("should remove the character at the newly focused position", () => {
		const cursor = createCursor(2, 0);
		const chars = [createChar("1", "A", 1, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result.cursor.position).toEqual({ x: 1, y: 0 });
		expect(result.chars).toEqual([]);
	});

	it("should not move the cursor when moving backward would go beyond the grid", () => {
		const cursor = createCursor(0, 0);
		const chars = [createChar("1", "A", 2, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result).toEqual({ cursor, chars });
	});

	it("should not move the cursor when the previous cell is blocked", () => {
		const cursor = createCursor(2, 1);
		const chars = [createChar("1", "A", 0, 0)];

		const result = handleBackspaceKey({ chars, cursor, grid });

		expect(result).toEqual({ cursor, chars });
	});

	it("should preserve the cursor direction when moving backward", () => {
		const cursor = createCursor(0, 2, "vertical");

		const result = handleBackspaceKey({
			chars: [],
			cursor,
			grid,
		});

		expect(result.cursor).toEqual({
			...cursor,
			position: { x: 0, y: 1 },
		});
	});
});
