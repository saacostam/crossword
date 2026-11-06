import { useCallback, useMemo } from "react";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import type { CrosswordClient } from "@/shared/clients/domain";

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

	return useMemo(
		() => ({
			getAll,
		}),
		[getAll],
	);
}
