import { MantineProvider } from "@mantine/core";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { AdaptersProvider } from "@/shared/adapters/ui";

const crossword = CROSSWORDS[0];

const theme = {
	primaryColor: "pink",
};

function App() {
	return (
		<MantineProvider theme={theme}>
			<AdaptersProvider>
				<CrosswordBoard crossword={crossword} />
			</AdaptersProvider>
		</MantineProvider>
	);
}

export default App;
