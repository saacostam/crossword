import { Anchor, Breadcrumbs, Space, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { useNavigation } from "@/shared/navigation/app";
import { ScreenName } from "@/shared/navigation/domain";
import { usePrimitives } from "@/shared/primitives/app";

export interface CrosswordScreenProps {
	crosswordId: string;
}

export function CrosswordScreen({ crosswordId }: CrosswordScreenProps) {
	const nav = useNavigation();

	const { Modal } = usePrimitives();

	const [isCrosswordComplete, setIsCrosswordComplete] = useState(false);

	const onCrosswordCompleted = useCallback(
		() => setIsCrosswordComplete(true),
		[],
	);

	const onClose = useCallback(() => setIsCrosswordComplete(false), []);

	const crossword = useMemo(
		() => CROSSWORDS.find((c) => c.id === crosswordId),
		[crosswordId],
	);

	useEffect(() => {
		if (crossword === undefined) {
			nav.setScreen({ name: ScreenName.PICKER });
		}
	}, [crossword, nav]);

	if (crossword === undefined) return null;

	return (
		<>
			<Breadcrumbs>
				<Anchor onClick={() => nav.setScreen({ name: ScreenName.PICKER })}>
					Home
				</Anchor>
				<span>
					<Text style={{ color: "var(--mantine-color-anchor)" }}>
						Crossword
					</Text>
				</span>
			</Breadcrumbs>
			<Space h="md" />
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
