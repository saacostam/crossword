import { Flex, SimpleGrid } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	categorizeAndSortClues,
	computeCrosswordGrid,
	getCurrentClue,
	handleBackspaceKey,
	handleLetterKey,
	handleTabKey,
	onArrowPress,
} from "@/features/crossword/core/app";
import type { Char, Crossword, Cursor } from "@/features/crossword/core/domain";
import type { Position } from "@/shared/misc/domain";
import { CrosswordBoardCell } from "./BoardCell";
import { ClueGroup } from "./ClueGroup";

export interface CrosswordBoardProps {
	crossword: Crossword;
}

export function CrosswordBoard({ crossword }: Readonly<CrosswordBoardProps>) {
	const [chars, setChars] = useState<Char[]>([]);
	const [cursor, setCursor] = useState<Cursor>({
		position: { x: 0, y: 0 },
		direction: "horizontal",
	});

	const grid = useMemo(
		() => computeCrosswordGrid({ chars, cursor, crossword }),
		[chars, cursor, crossword],
	);

	const clues = useMemo(
		() => categorizeAndSortClues({ clues: crossword.clues }),
		[crossword.clues],
	);

	const currClue = useMemo(
		() =>
			getCurrentClue({
				cursor,
				grid,
				clues: crossword.clues,
			}),
		[cursor, grid, crossword.clues],
	);

	const onFocusCell = useCallback((position: Position) => {
		setCursor((cursor) => {
			if (cursor.position.x === position.x && cursor.position.y === position.y)
				return {
					...cursor,
					direction:
						cursor.direction === "horizontal" ? "vertical" : "horizontal",
				};

			return {
				...cursor,
				position,
			};
		});
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case " ":
					setCursor((c) => ({
						...c,
						direction: c.direction === "horizontal" ? "vertical" : "horizontal",
					}));
					break;
				case "ArrowUp":
					setCursor((c) =>
						onArrowPress({
							delta: { x: 0, y: -1 },
							crossword,
							cursor: c,
							grid,
						}),
					);
					break;
				case "ArrowDown":
					setCursor((c) =>
						onArrowPress({
							delta: { x: 0, y: 1 },
							crossword,
							cursor: c,
							grid,
						}),
					);
					break;
				case "ArrowLeft":
					setCursor((c) =>
						onArrowPress({
							delta: { x: -1, y: 0 },
							crossword,
							cursor: c,
							grid,
						}),
					);
					break;
				case "ArrowRight":
					setCursor((c) =>
						onArrowPress({
							delta: { x: 1, y: 0 },
							crossword,
							cursor: c,
							grid,
						}),
					);
					break;
				case "Backspace": {
					const result = handleBackspaceKey({
						chars,
						cursor,
						grid,
					});

					setCursor(result.cursor);
					setChars(result.chars);
					break;
				}
				case "Tab": {
					event.preventDefault();

					const sortedClues = [...clues.horizontal, ...clues.vertical];

					setCursor((c) =>
						handleTabKey({
							currClue,
							cursor: c,
							sortedClues,
						}),
					);
					break;
				}
				default:
					if (event.key.length === 1) {
						const result = handleLetterKey({
							chars,
							cursor,
							grid,
							letter: event.key,
						});

						setCursor(result.cursor);
						setChars(result.chars);
					}
					break;
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [clues, chars, crossword, cursor, currClue, grid]);

	return (
		<Flex direction="column" gap="md">
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
			<SimpleGrid spacing="xs" cols={{ base: 1, sm: 2 }}>
				<ClueGroup
					title="Horizontal"
					clues={clues.horizontal}
					activeClueId={currClue?.id}
				/>
				<ClueGroup
					title="Vertical"
					clues={clues.vertical}
					activeClueId={currClue?.id}
				/>
			</SimpleGrid>
		</Flex>
	);
}
