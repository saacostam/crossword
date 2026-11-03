import { MantineProvider } from "@mantine/core";
import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";

const crossword = CROSSWORDS[0];

const theme = {
	primaryColor: "pink",
};

function App() {
	return (
		<MantineProvider theme={theme}>
			<CrosswordBoard crossword={crossword} />
		</MantineProvider>
	);
}

export default App;
