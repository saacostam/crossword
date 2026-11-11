import { Box, Stack, Text, Title } from "@mantine/core";
import type { ComponentType } from "react";
import {
	CrosswordItem,
	type CrosswordItemProps,
	CrosswordPicker,
} from "@/features/crossword/picker/ui";
import { useAdapters } from "@/shared/adapters/app";
import { RouteName } from "@/shared/adapters/domain";

const CrosswordItemWithNav: ComponentType<CrosswordItemProps> = (props) => {
	const { nav } = useAdapters();

	return (
		<nav.Link
			to={{
				name: RouteName.CROSSWORD_BY_ID,
				payload: { id: props.crossword.id },
			}}
		>
			<CrosswordItem {...props} />
		</nav.Link>
	);
};

export function CrosswordPickerScreen() {
	return (
		<Stack gap="md">
			<Box>
				<Title size="lg">Crosswords</Title>
				<Text c="dimmed" size="sm">
					Choose a crossword from the list below to start playing.
				</Text>
			</Box>
			<CrosswordPicker CrosswordItem={CrosswordItemWithNav} />
		</Stack>
	);
}
