import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AdaptersProvider } from "@/shared/adapters/ui";
import { ClientsProvider } from "@/shared/clients/ui";
import { Router } from "@/shared/navigation/ui";
import { PrimitivesProvider } from "@/shared/primitives/ui";

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
							<Router />
						</ClientsProvider>
					</AdaptersProvider>
				</PrimitivesProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</MantineProvider>
	);
}

export default App;
