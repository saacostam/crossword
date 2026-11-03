import { Flex, Text, Title } from "@mantine/core";
import type { Clue } from "@/features/crossword/core/domain";

export interface ClueGroupProps {
	activeClueId: string | undefined;
	clues: Clue[];
	title: string;
}

export function ClueGroup({ activeClueId, clues, title }: ClueGroupProps) {
	return (
		<Flex direction="column" gap="xs">
			<Title size="lg">{title}</Title>
			<Flex direction="column" gap="0.1rem">
				{clues.map((clue) => (
					<Text
						key={clue.id}
						size="sm"
						c={activeClueId === clue.id ? "pink" : undefined}
					>
						{clue.hint}
					</Text>
				))}
			</Flex>
		</Flex>
	);
}
