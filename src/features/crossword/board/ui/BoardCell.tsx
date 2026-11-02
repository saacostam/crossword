import type { CrosswordGridCell } from "@/features/crossword/core/app";
import { Input, type InputProps } from "@mantine/core";

export interface CrosswordBoardCellProps {
    cell: CrosswordGridCell;
}

export function CrosswordBoardCell({
    cell,
}: CrosswordBoardCellProps) {
    if (cell.status === "blocked") return <div/>

    return <Input 
        {...STATUS_STYLING[cell.status]}
        value={cell.value ?? ""}
    />
} 

const STATUS_STYLING: Record<CrosswordGridCell["status"], { c: InputProps["c"]}> = {
    "blocked": {
        c: "gray",
    },
    "idle": {
        c: undefined,
    },
    "highlighted": {
        c: "pink",
    },
    "focused": {
        c: "pink",
    }
}
