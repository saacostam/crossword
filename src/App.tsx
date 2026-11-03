import { MantineProvider } from "@mantine/core";
import { AdaptersProvider } from "@/shared/adapters/ui";
import { AppLayout } from "@/shared/layout";
import { CrosswordScreen } from "@/shared/screens";

const PRIMARY_COLOR = "indigo";

const theme = {
	primaryColor: PRIMARY_COLOR,
};

function App() {
	return (
		<MantineProvider theme={theme}>
			<AdaptersProvider>
				<AppLayout>
					<CrosswordScreen />
				</AppLayout>
			</AdaptersProvider>
		</MantineProvider>
	);
}

export default App;
