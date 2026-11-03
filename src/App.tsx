import { Divider, MantineProvider, Text, Title } from "@mantine/core";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { AdaptersProvider } from "@/shared/adapters/ui";
import { AppLayout } from "@/shared/layout";

const crossword = CROSSWORDS[0];

const PRIMARY_COLOR = "indigo";

const theme = {
	primaryColor: PRIMARY_COLOR,
};

function App() {
	return (
		<MantineProvider theme={theme}>
			<AdaptersProvider>
				<AppLayout>
					<Title size="2rem" ta="center">
						Cross
						<Text c={PRIMARY_COLOR} inherit display="inline">
							Word
						</Text>
					</Title>
					<Divider my="sm" />
					<CrosswordBoard crossword={crossword} />
				</AppLayout>
			</AdaptersProvider>
		</MantineProvider>
	);
}

export default App;
