import { Divider, Text, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { usePrimitives } from "@/shared/primitives/app";

const crossword = CROSSWORDS[1];

export function CrosswordScreen() {
	const { Modal } = usePrimitives();

	const [isCrosswordComplete, setIsCrosswordComplete] = useState(false);

	const onCrosswordCompleted = useCallback(
		() => setIsCrosswordComplete(true),
		[],
	);

	const onClose = useCallback(() => setIsCrosswordComplete(false), []);

	return (
		<>
			<Title size="2rem" ta="center">
				Cross
				<Text inherit display="inline">
					Word
				</Text>
			</Title>
			<Divider my="sm" />
			<CrosswordBoard
				crossword={crossword}
				onCrosswordCompleted={onCrosswordCompleted}
			/>
			<Modal
				opened={isCrosswordComplete}
				onClose={onClose}
				title="Crossword Completed"
			>
				<Text>Congratulations!</Text>
			</Modal>
		</>
	);
}
