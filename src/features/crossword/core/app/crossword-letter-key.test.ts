import { v4 as uuid } from "uuid";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type {
	Char,
	CrosswordGridCell,
	Cursor,
} from "@/features/crossword/core/domain";
import { handleLetterKey } from "./crossword-letter-key";

vi.mock("uuid", () => ({
	v4: vi.fn(),
}));

describe("handleLetterKey", () => {
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

	beforeEach(() => {
		vi.mocked(uuid).mockReturnValue(
			"generated-id" as unknown as Uint8Array<ArrayBufferLike>,
		);
	});

	it("should insert an uppercase character and move the cursor forward", () => {
		const cursor = createCursor(0, 0);

		const result = handleLetterKey({
			chars: [],
			cursor,
			grid,
			letter: "a",
		});

		expect(result.chars).toEqual([
			{
				id: "generated-id",
				char: "A",
				position: cursor.position,
			},
		]);
		expect(result.cursor.position).toEqual({ x: 1, y: 0 });
	});

	it("should replace the character at the current position", () => {
		const cursor = createCursor(0, 0);
		const existingChar = createChar("existing-id", "A", 0, 0);
		const otherChar = createChar("other-id", "B", 2, 0);

		const result = handleLetterKey({
			chars: [existingChar, otherChar],
			cursor,
			grid,
			letter: "c",
		});

		expect(result.chars).toEqual([{ ...existingChar, char: "C" }, otherChar]);
		expect(uuid).not.toHaveBeenCalled();
	});

	it("should move the cursor forward vertically", () => {
		const cursor = createCursor(0, 0, "vertical");

		const result = handleLetterKey({
			chars: [],
			cursor,
			grid,
			letter: "a",
		});

		expect(result.cursor.position).toEqual({ x: 0, y: 1 });
	});

	it("should not move the cursor when the next cell is blocked", () => {
		const cursor = createCursor(0, 1);

		const result = handleLetterKey({
			chars: [],
			cursor,
			grid,
			letter: "a",
		});

		expect(result.cursor).toEqual(cursor);
		expect(result.chars).toEqual([
			{
				id: "generated-id",
				char: "A",
				position: cursor.position,
			},
		]);
	});

	it("should not move the cursor when the next cell is outside the grid", () => {
		const cursor = createCursor(2, 0);

		const result = handleLetterKey({
			chars: [],
			cursor,
			grid,
			letter: "a",
		});

		expect(result.cursor).toEqual(cursor);
		expect(result.chars).toEqual([
			{
				id: "generated-id",
				char: "A",
				position: cursor.position,
			},
		]);
	});

	it("should preserve other characters when inserting a new one", () => {
		const cursor = createCursor(0, 0);
		const existingChar = createChar("existing-id", "B", 2, 0);

		const result = handleLetterKey({
			chars: [existingChar],
			cursor,
			grid,
			letter: "a",
		});

		expect(result.chars).toEqual([
			existingChar,
			{
				id: "generated-id",
				char: "A",
				position: cursor.position,
			},
		]);
	});
});
