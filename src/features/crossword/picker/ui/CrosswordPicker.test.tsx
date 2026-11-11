import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { CrosswordClientPayload } from "@/shared/clients/domain";
import { renderWithProviders } from "@/tests";
import { mockDi } from "@/tests/utils/mock-di";
import type { CrosswordItemProps } from "./CrosswordItem";
import { CrosswordPicker } from "./CrosswordPicker";

const mockCrosswordItem = ({ crossword }: CrosswordItemProps) => (
	<div data-testid="crossword-item">{crossword.id}</div>
);

const createResponse = (
	ids: string[],
): CrosswordClientPayload["getAll"]["res"] => ({
	crosswords: ids.map((id) => ({ id, name: id, size: { w: 11, h: 11 } })),
	total: 2,
	page: 1,
});

describe("CrosswordPicker", () => {
	it("render skeleton while the query is pending", () => {
		const { clients } = mockDi();

		clients.crossword.getAll.mockReturnValue(new Promise(() => {}));

		renderWithProviders(<CrosswordPicker CrosswordItem={mockCrosswordItem} />, {
			clients,
		});

		expect(screen.getByTestId("crossword-picker-skeleton")).toBeInTheDocument();
		expect(screen.queryByTestId("crossword-item")).not.toBeInTheDocument();
	});

	it("render query error when query fails", async () => {
		const di = mockDi();

		di.clients.crossword.getAll.mockRejectedValue(new Error());

		renderWithProviders(
			<CrosswordPicker CrosswordItem={mockCrosswordItem} />,
			di,
		);

		const skeleton = screen.getByTestId("crossword-picker-skeleton");
		expect(skeleton).toBeInTheDocument();

		await waitForElementToBeRemoved(skeleton);

		expect(screen.queryByTestId("query-error")).toBeInTheDocument();
	});

	it("renders the returned crossword items", async () => {
		const { clients } = mockDi();

		clients.crossword.getAll.mockResolvedValue(
			createResponse(["crossword-1", "crossword-2"]),
		);

		renderWithProviders(<CrosswordPicker CrosswordItem={mockCrosswordItem} />, {
			clients,
		});

		expect(await screen.findAllByTestId("crossword-item")).toHaveLength(2);

		expect(screen.getByText("crossword-1")).toBeInTheDocument();
		expect(screen.getByText("crossword-2")).toBeInTheDocument();
	});

	it("fetches the next page when pagination changes", async () => {
		const user = userEvent.setup();
		const { clients } = mockDi();

		clients.crossword.getAll
			.mockResolvedValueOnce(createResponse(["crossword-1"]))
			.mockResolvedValueOnce(createResponse(["crossword-2"]));

		renderWithProviders(<CrosswordPicker CrosswordItem={mockCrosswordItem} />, {
			clients,
		});

		expect(await screen.findByText("crossword-1")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "2" }));

		await waitFor(() => {
			expect(clients.crossword.getAll).toHaveBeenCalledTimes(2);
		});

		expect(await screen.findByText("crossword-2")).toBeInTheDocument();
	});
});
