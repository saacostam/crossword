import {v4 as uuid} from "uuid"
import type { Char, Crossword, Cursor } from "@/features/crossword/core/domain";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CrosswordBoardCell } from "./BoardCell";
import { SimpleGrid } from "@mantine/core";
import { computeCrosswordGrid } from "@/features/crossword/core/app";
import type { Position } from "@/shared/misc/domain";

export interface CrosswordBoardProps {
    crossword: Crossword;
}

export function CrosswordBoard({
    crossword,
}: Readonly<CrosswordBoardProps>) {
    const [chars, setChars] = useState<Char[]>([]);
    const [cursor, setCursor] = useState<Cursor>({
        position: { x: 0, y: 0 },
        direction: "horizontal",
    });

    const grid = useMemo(
        () => computeCrosswordGrid({ chars, cursor, crossword }),
        [chars, cursor, crossword],
    );

    const onFocusCell = useCallback((position: Position) => {
        setCursor((cursor) => {
            if (cursor.position.x === position.x && cursor.position.y === position.y) return {
                ...cursor,
                direction: cursor.direction === "horizontal" ? "vertical" : "horizontal",
            }

            return {
                ...cursor,
                position,
            }
        });
    }, []);

    useEffect(() => {
        const onArrowPress = (delta: Position) => {
            setCursor((c) => {
                let isInitial = true;
                let position: Position = {
                    x: c.position.x,
                    y: c.position.y,
                }

                while (isInitial || grid[position.y][position.x].status === "blocked") {
                    position.x = (position.x + delta.x + crossword.size.w) % crossword.size.w;
                    position.y = (position.y + delta.y + crossword.size.h) % crossword.size.h;
                    isInitial = false;
                }

                return {
                    ...c,
                    position,
                };
            })
        }

        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case " ":
                    setCursor(c => ({...c, direction: c.direction === "horizontal" ? "vertical" : "horizontal"}))
                    break;
                case "ArrowUp":
                    onArrowPress({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    onArrowPress({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    onArrowPress({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    onArrowPress({ x: 1, y: 0 });
                    break;
                case "Backspace":
                    setCursor((cursor) => {
                        const char = chars.find(char => char.position.x === cursor.position.x && char.position.y === cursor.position.y)
                        
                        // If there is a char we simply remove and don't move cursor
                        if (char?.char) {
                            setChars(prevChars => prevChars.filter(pc => pc.id !== char.id))
                            return cursor;
                        };

                        // Else, we move cursor and remove newly focused char
                        const positionCandidate: Position = {
                            x: cursor.position.x + (cursor.direction === "horizontal" ? -1 : 0),
                            y: cursor.position.y + (cursor.direction === "vertical" ? -1 : 0),
                        }
                        
                        if (positionCandidate.x < 0 || positionCandidate.y < 0) return cursor;
                        
                        const cellCandidate = grid.at(positionCandidate.y)?.at(positionCandidate.x);
                        if (cellCandidate?.status === "blocked") return cursor;

                        const newChar = chars.find(char => char.position.x === positionCandidate.x && char.position.y === positionCandidate.y);
                        setChars(prevChars => prevChars.filter(pc => pc.id !== newChar?.id));
                        
                        return {
                            ...cursor,
                            position: positionCandidate,
                        }
                    })
                    break;
                case "Tab":
                    break;
                default:
                    if (event.key.length === 1) {
                        return setCursor(cursor => {
                            setChars(prevChars => {
                                 // Update char in cell
                                const char = event.key.toLocaleUpperCase();

                                const doesCellHaveChar = prevChars.find(c => c.position.x === cursor.position.x && c.position.y === cursor.position.y);

                                if (doesCellHaveChar) {
                                    return prevChars.map(
                                        pc => pc.id === doesCellHaveChar.id ? {
                                            ...doesCellHaveChar,
                                            char,
                                        } : pc
                                    )
                                }
                                return [
                                    ...prevChars,
                                    {
                                        id: uuid(),
                                        char,
                                        position: cursor.position,
                                    }
                                ]
                            })

                            // Update cursor position
                            const positionCandidate: Position = {
                                x: cursor.position.x + (cursor.direction === "horizontal" ? 1 : 0),
                                y: cursor.position.y + (cursor.direction === "vertical" ? 1 : 0),
                            }
                            
                            const cellCandidate = grid.at(positionCandidate.y)?.at(positionCandidate.x);
                            if (cellCandidate === undefined || cellCandidate.status === "blocked") return cursor;

                            return {...cursor, position: positionCandidate}
                        })
                    }
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [chars, crossword.size.h, crossword.size.w, grid]);

    return (
        <SimpleGrid spacing="xs" cols={crossword.size.h}>
            {grid.map((row, y) =>
                row.map((cell, x) => (
                    <CrosswordBoardCell
                        key={cell.id}
                        cell={cell}
                        onClickCell={() => onFocusCell({ x, y })}
                    />
                )),
            )}
        </SimpleGrid>
    );
}