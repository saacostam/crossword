import type { Char, Crossword, Cursor } from "@/features/crossword/core/domain";
import { useMemo, useState } from "react";
import { CrosswordBoardCell } from "./BoardCell";
import { SimpleGrid, } from "@mantine/core";
import { computeCrosswordGrid } from "@/features/crossword/core/app";

export interface CrosswordBoardProps {
    crossword: Crossword;
}

export function CrosswordBoard({
    crossword
}: Readonly<CrosswordBoardProps>) {
    const [chars] = useState<Char[]>([]);
    const [cursor] = useState<Cursor>({ position: { x: 0, y: 0 }, direction: "horizontal"});

    const grid = useMemo(() => computeCrosswordGrid({ chars, cursor, crossword }), [chars, cursor, crossword]);

    return <SimpleGrid spacing="xs" cols={crossword.size.h} >
        {grid.map((row) => row.map((cell) => {
            return <CrosswordBoardCell 
                key={cell.id}
                cell={cell}
            />
        }))}
    </SimpleGrid>
}
