import { Button } from "@mantine/core";
import type { CrosswordGridCell } from "@/features/crossword/core/app";

export interface CrosswordBoardCellProps {
	cell: CrosswordGridCell;
	height?: number;
	onClickCell: () => void;
}

export function CrosswordBoardCell({
	cell,
	height,
	onClickCell,
}: CrosswordBoardCellProps) {
	if (cell.status === "blocked") return <div />;

	return (
		<Button
			variant={STATUS_VARIANT[cell.status]}
			radius={0}
			p={0}
			tabIndex={-1}
			onClick={onClickCell}
			h={height}
			c={cell.value && cell.value !== cell.realValue ? "red" : undefined}
		>
			{cell.value ?? ""}
		</Button>
	);
}

const STATUS_VARIANT: Record<
	CrosswordGridCell["status"],
	"default" | "light" | "filled"
> = {
	blocked: "default",
	idle: "default",
	highlighted: "light",
	focused: "filled",
};
