import { Flex, Grid, Pagination, Stack } from "@mantine/core";
import type { ComponentType } from "react";
import type { CrosswordClientPayload } from "@/shared/clients/domain";
import type { CrosswordItemProps } from "./CrosswordItem";

export interface CrosswordPickerContentProps {
	CrosswordItem: ComponentType<CrosswordItemProps>;
	queryCrosswords: CrosswordClientPayload["getAll"]["res"];
	page: number;
	setPage: (page: number) => void;
}

export function CrosswordPickerContent({
	CrosswordItem,
	queryCrosswords,
	page,
	setPage,
}: CrosswordPickerContentProps) {
	return (
		<Stack gap="md">
			<Grid gap="md">
				{queryCrosswords.crosswords.map((c) => (
					<Grid.Col key={c.id} span={{ base: 12, sm: 6 }}>
						<CrosswordItem crossword={c} />
					</Grid.Col>
				))}
			</Grid>

			<Flex justify="center">
				<Pagination
					total={queryCrosswords.total}
					value={page}
					onChange={setPage}
				/>
			</Flex>
		</Stack>
	);
}
