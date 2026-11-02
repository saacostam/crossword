import type { CrosswordGridCell } from "@/features/crossword/core/app";
import { Button } from "@mantine/core";

export interface CrosswordBoardCellProps {
    cell: CrosswordGridCell;
    onClickCell: () => void;
}

export function CrosswordBoardCell({
    cell,
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
