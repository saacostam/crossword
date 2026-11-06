import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AdaptersProvider } from "@/shared/adapters/ui";
import { ClientsProvider } from "@/shared/clients/ui";
import { AppLayout } from "@/shared/layout";
import { PrimitivesProvider } from "@/shared/primitives/ui";
import { CrosswordScreen } from "@/shared/screens";

const PRIMARY_COLOR = "indigo";

const theme = {
	primaryColor: PRIMARY_COLOR,
};

const queryClient = new QueryClient();

function App() {
	return (
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<PrimitivesProvider>
					<AdaptersProvider>
						<ClientsProvider>
							<AppLayout>
								<CrosswordScreen />
							</AppLayout>
						</ClientsProvider>
					</AdaptersProvider>
				</PrimitivesProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</MantineProvider>
	);
}

export default App;
