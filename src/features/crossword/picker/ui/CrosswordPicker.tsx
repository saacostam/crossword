import { type ComponentType, useState } from "react";
import { useQueryCrosswords } from "@/features/crossword/core/app";
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
		</>
	);
}
