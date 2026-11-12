import { Box, Divider, SimpleGrid, Skeleton, Space } from "@mantine/core";

export function CrosswordByIdSkeleton() {
	return (
		<Box data-testid="crossword-by-id-skeleton">
			<Skeleton h="3.5rem" />
			<Space h="lg" />
			<Skeleton h="30rem" maw="30rem" mx="auto" />
			<Divider my="sm" />
			<SimpleGrid spacing="xs" cols={{ base: 1, xs: 2 }}>
				<Skeleton h="8rem" />
				<Skeleton h="8rem" />
			</SimpleGrid>
		</Box>
	);
}
