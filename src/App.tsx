import { CrosswordBoard } from "@/features/crossword/board/ui";
import { CROSSWORDS } from "@/features/crossword/core/domain";
import { MantineProvider } from "@mantine/core";

const crossword = CROSSWORDS[0];

function App() {
  return <MantineProvider>
    <CrosswordBoard 
      crossword={crossword}
    />
  </MantineProvider>;
}

export default App
