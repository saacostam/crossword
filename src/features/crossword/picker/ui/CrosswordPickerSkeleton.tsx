import { Flex, Grid, Skeleton, Stack } from "@mantine/core";
import { useMemo } from "react";

export function CrosswordPickerSkeleton() {
	const content = useMemo(() => {
		const arr = new Array(2).fill(null);

		return arr.map((_, index) => (
			<Grid.Col key={+index} span={{ base: 12, sm: 6 }}>
				<Skeleton h="4.3rem" w="100%" />
			</Grid.Col>
		));
	}, []);

	return (
		<Stack data-testid="crossword-picker-skeleton" gap="md">
			<Grid gap="md">{content}</Grid>
			<Flex justify="center">
				<Skeleton h="4rem" w="6rem" />
			</Flex>
		</Stack>
	);
}
