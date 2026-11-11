import { type ComponentType, useMemo, useState } from "react";
import { useQueryCrosswords } from "@/features/crossword/core/app";
import { QueryError, type Retry } from "@/shared/components";
import type { CrosswordItemProps } from "./CrosswordItem";
import { CrosswordPickerContent } from "./CrosswordPickerContent";
import { CrosswordPickerSkeleton } from "./CrosswordPickerSkeleton";

export interface CrosswordPickerProps {
	CrosswordItem: ComponentType<CrosswordItemProps>;
}

export function CrosswordPicker({ CrosswordItem }: CrosswordPickerProps) {
	const [page, setPage] = useState<number>(1);

	const queryCrosswords = useQueryCrosswords({
		page,
	});

	const retry: Retry = useMemo(
		() => ({
			onClick: queryCrosswords.refetch,
			isPending: queryCrosswords.isPending,
		}),
		[queryCrosswords.refetch, queryCrosswords.isPending],
	);

	return (
		<>
			{queryCrosswords.isLoading && <CrosswordPickerSkeleton />}
			{queryCrosswords.isSuccess && (
				<CrosswordPickerContent
					CrosswordItem={CrosswordItem}
					queryCrosswords={queryCrosswords.data}
					page={page}
					setPage={setPage}
				/>
			)}
			{queryCrosswords.isError && (
				<QueryError
					msg="Unable to retrieve crosswords"
					retry={retry}
					error={queryCrosswords.error}
					where="CrosswordPicker.queryCrosswords.isError"
				/>
			)}
		</>
	);
}
