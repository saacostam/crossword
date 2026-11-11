import { Flex, Paper, Text, ThemeIcon } from "@mantine/core";
import type { LeanCrossword } from "@/features/crossword/core/domain";
import { PuzzlePieceIcon } from "@/shared/icons";

export interface CrosswordItemProps {
	crossword: LeanCrossword;
}

export function CrosswordItem({ crossword }: CrosswordItemProps) {
	return (
		<Paper p="md" withBorder>
			<Flex align="center" gap="md">
				<ThemeIcon p="0.4rem" size="lg" radius="100%" variant="light">
					<PuzzlePieceIcon />
				</ThemeIcon>
				<Text fw="bold" style={{ flex: 1, minWidth: 0 }} truncate>
					{crossword.name}
				</Text>
				<Text size="xs" style={{ color: "var(--mantine-primary-color-5)" }}>
					{crossword.size.w}x{crossword.size.h}
				</Text>
			</Flex>
		</Paper>
	);
}
