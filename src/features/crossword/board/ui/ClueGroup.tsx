import { Button, Flex, Title } from "@mantine/core";
import type { Clue } from "@/features/crossword/core/domain";

export interface ClueGroupProps {
	activeClueId: string | undefined;
	clues: Clue[];
	title: string;
	onClickClue: (id: string) => void;
}

export function ClueGroup({
	activeClueId,
	clues,
	title,
	onClickClue,
}: ClueGroupProps) {
	return (
		<Flex direction="column" gap="xs" p="xs">
			<Title size="lg" ta="center">
				{title}
			</Title>
			<Flex direction="column" gap="0.1rem">
				{clues.map((clue) => (
					<Button
						key={clue.id}
						size="compact-sm"
						justify="start"
						ta="start"
						variant={activeClueId === clue.id ? "light" : "subtle"}
						tabIndex={-1}
						onClick={() => onClickClue(clue.id)}
					>
						{clue.hint}
					</Button>
				))}
			</Flex>
		</Flex>
	);
}
