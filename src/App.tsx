import { MantineProvider } from "@mantine/core";
import { AdaptersProvider } from "@/shared/adapters/ui";
import { ClientsProvider } from "@/shared/clients/ui";
import { AppLayout } from "@/shared/layout";
import { PrimitivesProvider } from "@/shared/primitives/ui";
import { CrosswordScreen } from "@/shared/screens";

const PRIMARY_COLOR = "indigo";

const theme = {
	primaryColor: PRIMARY_COLOR,
};

function App() {
	return (
		<MantineProvider theme={theme}>
			<PrimitivesProvider>
				<AdaptersProvider>
					<ClientsProvider>
						<AppLayout>
							<CrosswordScreen />
						</AppLayout>
					</ClientsProvider>
				</AdaptersProvider>
			</PrimitivesProvider>
		</MantineProvider>
	);
}

export default App;
