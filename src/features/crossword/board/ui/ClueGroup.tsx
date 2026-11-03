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
				{clues.map((clue) => {
					const active = activeClueId === clue.id;

					return (
						<Button
							key={clue.id}
							size="compact-sm"
							justify="start"
							fw={active ? undefined : "normal"}
							ta="start"
							variant={active ? "light" : "subtle"}
							tabIndex={-1}
							onClick={() => onClickClue(clue.id)}
						>
							{clue.hint}
						</Button>
					);
				})}
			</Flex>
		</Flex>
	);
}
