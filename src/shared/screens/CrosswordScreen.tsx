import { Anchor, Breadcrumbs, Space, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CrosswordById } from "@/features/crossword/by-id/ui";
import { useAdapters } from "@/shared/adapters/app";
import { RouteName } from "@/shared/adapters/domain";
import { SuspenseLoader } from "@/shared/components";
import { usePrimitives } from "@/shared/primitives/app";

export default function CrosswordScreen() {
	const { nav, notifications } = useAdapters();

	const { id: crosswordId } = nav.getParams<{ id: string | undefined }>();

	const { Modal } = usePrimitives();

	const [isCrosswordComplete, setIsCrosswordComplete] = useState(false);

	const onCrosswordCompleted = useCallback(
		() => setIsCrosswordComplete(true),
		[],
	);

	const onClose = useCallback(() => setIsCrosswordComplete(false), []);

	const onCrosswordNotFound = useCallback(() => {
		nav.setRoute({ name: RouteName.PICKER });
		notifications.notify({
			id: "crossword-not-found",
			type: "error",
			title: "Not Found",
			msg: "Crossword not found",
		});
	}, [nav, notifications]);

	useEffect(() => {
		if (!crosswordId) {
			onCrosswordNotFound();
		}
	}, [crosswordId, onCrosswordNotFound]);

	if (!crosswordId) return <SuspenseLoader style={{ height: "100vh" }} />;

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
			<CrosswordById
				key={crosswordId}
				id={crosswordId}
				CrosswordBoard={CrosswordBoard}
				onCrosswordComplete={onCrosswordCompleted}
				onNotFound={onCrosswordNotFound}
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
