import { Anchor, Breadcrumbs, Space, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { useAdapters } from "@/shared/adapters/app";
import { RouteName } from "@/shared/adapters/domain";
import { usePrimitives } from "@/shared/primitives/app";

export function CrosswordScreen() {
	const { nav } = useAdapters();

	const { id: crosswordId } = nav.getParams<{ id: string }>();

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
			nav.setRoute({ name: RouteName.PICKER });
		}
	}, [crossword, nav]);

	if (crossword === undefined) return null;

	return (
		<>
			<Breadcrumbs>
				<nav.Link to={{ name: RouteName.PICKER }}>
					<Anchor>Home</Anchor>
				</nav.Link>
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
