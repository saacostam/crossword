import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { mockDi, renderWithProviders } from "@/tests";
import { CrosswordById, type CrosswordByIdProps } from "./CrosswordById";

const TEST_IDS = {
	MOCK_CROSSWORD_BOARD: "mock-crossword-board",
	QUERY_ERROR: "query-error",
	SKELETON: "crossword-by-id-skeleton",
};

const mockIdentifier = "mock-id";

const MockCrosswordBoard = () => (
	<div data-testid={TEST_IDS.MOCK_CROSSWORD_BOARD} />
);

function setup(args: {
	di: ReturnType<typeof mockDi>;
	CrosswordBoard?: CrosswordByIdProps["CrosswordBoard"];
}) {
	const { di } = args;

	const onCrosswordComplete = vi.fn();
	const onNotFound = vi.fn();

	const CrosswordBoard = args?.CrosswordBoard ?? vi.fn();

	renderWithProviders(
		<CrosswordById
			id={mockIdentifier}
			CrosswordBoard={CrosswordBoard}
			onCrosswordComplete={onCrosswordComplete}
			onNotFound={onNotFound}
		/>,
		di,
	);

	return {
		onCrosswordComplete,
		onNotFound,
	};
}

describe("CrosswordById", () => {
	it("renders skeleton while query is pending", () => {
		const di = mockDi();

		di.clients.crossword.getById.mockImplementation(
			() => new Promise(() => {}),
		);

		setup({ di });

		expect(screen.getByTestId(TEST_IDS.SKELETON)).toBeInTheDocument();
	});

	it("render query error when query fails", async () => {
		const di = mockDi();

		di.clients.crossword.getById.mockRejectedValue(new Error());

		const { onNotFound } = setup({ di });

		await waitForElementToBeRemoved(screen.getByTestId(TEST_IDS.SKELETON));
		expect(screen.getByTestId(TEST_IDS.QUERY_ERROR)).toBeInTheDocument();

		expect(onNotFound).not.toHaveBeenCalled();
	});

	it("calls onNotFound props w/ query fails with not found type", async () => {
		const di = mockDi();

		di.clients.crossword.getById.mockRejectedValue(
			new DomainError({
				type: DomainErrorType.NOT_FOUND,
				msg: "Not found",
				userMsg: "Not found",
			}),
		);

		const { onNotFound } = setup({ di });

		await waitForElementToBeRemoved(screen.getByTestId(TEST_IDS.SKELETON));
		expect(screen.getByTestId(TEST_IDS.QUERY_ERROR)).toBeInTheDocument();

		expect(onNotFound).toHaveBeenCalledOnce();
	});

	it("render content when query succeeds", async () => {
		const di = mockDi();

		di.clients.crossword.getById.mockResolvedValue({
			crossword: {
				id: mockIdentifier,
				clues: [],
				name: "name",
				size: {
					w: 1,
					h: 1,
				},
			},
		});

		setup({ di, CrosswordBoard: MockCrosswordBoard });

		await waitForElementToBeRemoved(screen.getByTestId(TEST_IDS.SKELETON));

		expect(screen.queryByTestId(TEST_IDS.QUERY_ERROR)).not.toBeInTheDocument();
		expect(
			screen.getByTestId(TEST_IDS.MOCK_CROSSWORD_BOARD),
		).toBeInTheDocument();
	});
});
