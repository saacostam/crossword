import { Divider, Text, Title } from "@mantine/core";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";

const crossword = CROSSWORDS[0];

export function CrosswordScreen() {
	return (
		<>
			<Title size="2rem" ta="center">
				Cross
				<Text inherit display="inline">
					Word
				</Text>
			</Title>
			<Divider my="sm" />
			<CrosswordBoard crossword={crossword} />
		</>
	);
}
