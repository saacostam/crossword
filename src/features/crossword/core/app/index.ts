import { v4 as uuid } from "uuid"
import type { Char, Crossword, Cursor } from "@/features/crossword/core/domain";
import type { Position } from "@/shared/misc/domain";

export type CrosswordGridCell = {
    id: string;
    status: "blocked";
} | {
    id: string;
    status:  "idle" | "highlighted" | "focused";
    realValue: string;
    value: string;
}

export function computeCrosswordGrid(args: {
    chars: Char[],
    crossword: Crossword,
    cursor: Cursor,
}): CrosswordGridCell[][] {
    const {
        chars,
        crossword,
        cursor,
    } = args;
    
    const grid: CrosswordGridCell[][] = new Array(crossword.size.h).fill(null).map(
            () => new Array(crossword.size.w).fill(null).map(
                (): CrosswordGridCell => ({
                    id: uuid(),
                    status: "blocked",
            })
        )
    );

    for (let i = 0; i < crossword.clues.length; i++) {
        const clue = crossword.clues[i];

        for (let wordIndex = 0; wordIndex < clue.word.length; wordIndex++) {
            const position: Position = {
                x: clue.pos.x + (clue.direction === "horizontal" ? wordIndex : 0),
                y: clue.pos.y + (clue.direction === "vertical" ? wordIndex : 0),
            }

            const cell = grid.at(position.y)?.at(position.x);
            if (!cell) continue;

            const matchingChar = chars.find((char) => char.position.x === position.x && char.position.y === position.y);

            grid[position.y][position.x] = {
                ...grid[position.y][position.x],
                status: "idle",
                realValue: clue.word[wordIndex],
                value: matchingChar?.char ?? "",
            }
        }
    }

    for (let x = 0; x < crossword.size.w; x++) {
        const cell = grid[cursor.position.y][x];
        
        if (cell.status === "blocked") continue;

        grid[cursor.position.y][x] = {
            ...cell,
            status: "highlighted",
        }
    }
    for (let y = 0; y < crossword.size.h; y++) {
        const cell = grid[y][cursor.position.x];
        
        if (cell.status === "blocked") continue;

        grid[y][cursor.position.x] = {
            ...cell,
            status: "highlighted",
        }
    }

    const cursorCell = grid[cursor.position.y][cursor.position.x];
    grid[cursor.position.y][cursor.position.x] = cursorCell.status === "blocked" ? cursorCell : {
        ...cursorCell,
        status: "focused",
    }

    return grid;
}
