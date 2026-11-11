import { Alert, Divider, SimpleGrid, Space } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCellHeight } from "@/features/crossword/board/app";
import {
	categorizeAndSortClues,
	computeCrosswordGrid,
	genCrosswordIdGrid,
	getCurrentClue,
	handleBackspaceKey,
	handleLetterKey,
	handleTabKey,
	onArrowPress,
} from "@/features/crossword/core/app";
import type { Char, Crossword, Cursor } from "@/features/crossword/core/domain";
import { ArrowsRightLeftIcon, ArrowsUpDownIcon } from "@/shared/icons";
import type { Position } from "@/shared/misc/domain";
import { ClueGroup } from "./ClueGroup";
import { CrosswordBoardCell } from "./CrosswordBoardCell";

export interface CrosswordBoardProps {
	crossword: Crossword;
	onCrosswordCompleted: () => void;
}

export function CrosswordBoard({
	crossword,
	onCrosswordCompleted,
}: Readonly<CrosswordBoardProps>) {
	const [chars, setChars] = useState<Char[]>([]);
	const [cursor, setCursor] = useState<Cursor>({
		position: { x: 0, y: 0 },
		direction: "horizontal",
	});

	const idGrid = useMemo(() => genCrosswordIdGrid({ crossword }), [crossword]);
	const grid = useMemo(
		() => computeCrosswordGrid({ chars, cursor, crossword, idGrid }),
		[chars, cursor, crossword, idGrid],
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

	const onClickClue = useCallback(
		(id: string) => {
			const clue = crossword.clues.find((c) => c.id === id);
			if (!clue) return;

			setCursor({
				position: clue.pos,
				direction: clue.direction,
			});
		},
		[crossword.clues],
	);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const isLetter = event.key.length === 1 && /^[a-z]$/i.test(event.key);
			const isHandledKey =
				isLetter ||
				event.key === " " ||
				event.key === "Tab" ||
				event.key === "Backspace" ||
				event.key.startsWith("Arrow");

			if (!isHandledKey) return;
			if (event.ctrlKey || event.altKey || event.metaKey) return;

			event.preventDefault();

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
					const sortedClues = [...clues.horizontal, ...clues.vertical];

					setCursor((c) =>
						handleTabKey({
							currClue,
							cursor: c,
							sortedClues,
							shift: event.shiftKey,
						}),
					);
					break;
				}
				default: {
					if (isLetter) {
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
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [clues, chars, crossword, cursor, currClue, grid]);

	const { gridRef, height } = useCellHeight({
		numberOfCellsInHorizontalAxis: grid.at(0)?.length ?? 0,
	});

	const prevIsCrosswordComplete = useRef(false);
	useEffect(() => {
		const isCrosswordComplete = grid.every((row) =>
			row.every(
				(cell) => cell.status === "blocked" || cell.value === cell.realValue,
			),
		);

		if (isCrosswordComplete && prevIsCrosswordComplete.current === false) {
			onCrosswordCompleted();
		}

		prevIsCrosswordComplete.current = isCrosswordComplete;
	}, [onCrosswordCompleted, grid]);

	return (
		<>
			<Alert
				icon={
					currClue?.direction ? (
						currClue.direction === "horizontal" ? (
							<ArrowsRightLeftIcon />
						) : (
							<ArrowsUpDownIcon />
						)
					) : undefined
				}
			>
				{currClue?.hint}
			</Alert>
			<Space h="lg" />
			<SimpleGrid
				spacing="0"
				cols={crossword.size.h}
				ref={gridRef}
				maw="32rem"
				mx="auto"
			>
				{grid.map((row, y) =>
					row.map((cell, x) => (
						<CrosswordBoardCell
							key={cell.id}
							cell={cell}
							height={height}
							onClickCell={() => onFocusCell({ x, y })}
						/>
					)),
				)}
			</SimpleGrid>
			<Divider my="sm" />
			<SimpleGrid spacing="xs" cols={{ base: 1, xs: 2 }}>
				<ClueGroup
					title="Horizontal"
					clues={clues.horizontal}
					activeClueId={currClue?.id}
					onClickClue={onClickClue}
				/>
				<ClueGroup
					title="Vertical"
					clues={clues.vertical}
					activeClueId={currClue?.id}
					onClickClue={onClickClue}
				/>
			</SimpleGrid>
		</>
	);
}
