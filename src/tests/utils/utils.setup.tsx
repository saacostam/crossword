import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren, ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { type Adapters, AdaptersContext } from "@/shared/adapters/app";
import { type Clients, ClientsContext } from "@/shared/clients/app";
import { type Primitives, PrimitivesContext } from "@/shared/primitives/app";

// CLIENTS
export type MockClients = {
	[K in keyof Clients]?: Partial<Clients[K]>;
};

interface ClientsProviderProps {
	children: ReactNode;
	mock?: MockClients;
}

export function MockClientsProvider({ children, mock }: ClientsProviderProps) {
	const value = mock as Clients;
	return (
		<ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
	);
}

// ADAPTERS
export type MockAdapters = {
	[K in keyof Adapters]?: Partial<Adapters[K]>;
};

interface AdapterProviderProps {
	children: ReactNode;
	mock?: MockAdapters;
}

export function MockAdaptersProvider({ children, mock }: AdapterProviderProps) {
	const value = mock as Adapters;
	return (
		<AdaptersContext.Provider value={value}>
			{children}
		</AdaptersContext.Provider>
	);
}

// PRIMITIVES
export type MockPrimitives = {
	[K in keyof Primitives]?: Partial<Primitives[K]>;
};

interface PrimitivesProviderProps {
	mock?: MockPrimitives;
}

export function MockPrimitivesProvider({
	children,
	mock,
}: PropsWithChildren<PrimitivesProviderProps>) {
	const value = mock as Primitives;

	return (
		<PrimitivesContext.Provider value={value}>
			{children}
		</PrimitivesContext.Provider>
	);
}

// NON INVERTED DEPENDENCIES
// ✅ A fresh QueryClient per test avoids cache bleed between tests
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false, // don't retry by default in tests
			},
		},
	});

interface ProvidersProps {
	children: ReactNode;
}

export function TestProviders({ children }: ProvidersProps) {
	const queryClient = createTestQueryClient();

	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>{children}</BrowserRouter>
			</QueryClientProvider>
		</MantineProvider>
	);
}
