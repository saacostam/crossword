import { type ComponentType, useEffect, useMemo } from "react";
import type { CrosswordBoardProps } from "@/features/crossword/board/ui";
import { useQueryCrosswordById } from "@/features/crossword/core/app";
import { QueryError, type Retry } from "@/shared/components";
import { DomainError, DomainErrorType } from "@/shared/errors/domain";
import { CrosswordByIdSkeleton } from "./CrosswordByIdSkeleton";

export interface CrosswordByIdProps {
	id: string;
	CrosswordBoard: ComponentType<CrosswordBoardProps>;
	onCrosswordComplete: () => void;
	onNotFound: () => void;
}

export function CrosswordById({
	id,
	CrosswordBoard,
	onCrosswordComplete,
	onNotFound,
}: CrosswordByIdProps) {
	const queryCrosswordById = useQueryCrosswordById({
		id,
	});

	const retry: Retry = useMemo(
		() => ({
			isPending: queryCrosswordById.isPending,
			onClick: queryCrosswordById.refetch,
		}),
		[queryCrosswordById.isPending, queryCrosswordById.refetch],
	);

	useEffect(() => {
		if (
			queryCrosswordById.isError &&
			queryCrosswordById.error instanceof DomainError &&
			queryCrosswordById.error.type === DomainErrorType.NOT_FOUND
		) {
			onNotFound();
		}
	}, [onNotFound, queryCrosswordById]);

	return (
		<>
			{queryCrosswordById.isLoading && <CrosswordByIdSkeleton />}
			{queryCrosswordById.isError && (
				<QueryError
					msg="Unable to retrieve crossword"
					retry={retry}
					error={queryCrosswordById.error}
					where="CrossById.queryCrosswordById"
				/>
			)}
			{queryCrosswordById.isSuccess && (
				<CrosswordBoard
					crossword={queryCrosswordById.data.crossword}
					onCrosswordCompleted={onCrosswordComplete}
				/>
			)}
		</>
	);
}
