import { useCallback, useMemo } from "react";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import type { CrosswordClient } from "@/shared/clients/domain";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";

const PAGE_SIZE = 10;

export function useCrosswordClient(): CrosswordClient {
	const getAll: CrosswordClient["getAll"] = useCallback(
		async ({ page: _page, size: _size }) => {
			const page = Math.max(1, _page);
			const size = _size || PAGE_SIZE;

			const total = Math.ceil(CROSSWORDS.length / size);
			const slice = CROSSWORDS.slice((page - 1) * size, page * size);

			return {
				page,
				total,
				crosswords: slice,
			};
		},
		[],
	);

	const getById: CrosswordClient["getById"] = useCallback(async ({ id }) => {
		const crossword = CROSSWORDS.find((c) => c.id === id);

		if (!crossword) {
			const msg = `Crossword with id ${id} not found`;
			throw new DomainError({
				type: DomainErrorType.NOT_FOUND,
				msg,
				userMsg: msg,
			});
		}

		return {
			crossword,
		};
	}, []);

	return useMemo(
		() => ({
			getAll,
			getById,
		}),
		[getAll, getById],
	);
}
