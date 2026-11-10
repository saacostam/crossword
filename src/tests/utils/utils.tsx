// oxlint-disable react/only-export-components
import {
	type RenderHookOptions,
	type RenderOptions,
	render,
	renderHook,
} from "@testing-library/react";
import type { mockDi } from "@/tests/utils/mock-di";
import {
	type MockAdapters,
	MockAdaptersProvider,
	MockClientsProvider,
	type MockPrimitives,
	MockPrimitivesProvider,
	TestProviders,
} from "./utils.setup";

/**
 * Shared wrapper factory for consistent provider hierarchy
 */
function createWrapper({
	adapters,
	clients,
	primitives,
}: {
	initialEntries?: string[];
} & Partial<ReturnType<typeof mockDi>>) {
	// biome-ignore lint/correctness/noComponentHookFactories: Only for testing
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<TestProviders>
				<MockPrimitivesProvider mock={primitives as MockPrimitives}>
					<MockClientsProvider mock={clients}>
						<MockAdaptersProvider mock={adapters as unknown as MockAdapters}>
							{children}
						</MockAdaptersProvider>
					</MockClientsProvider>
				</MockPrimitivesProvider>
			</TestProviders>
		);
	};
}

/**
 * Render a React component with all test providers.
 */
export function renderWithProviders(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper"> & Partial<ReturnType<typeof mockDi>>,
) {
	const { adapters, clients, primitives, ...renderOptions } = options ?? {};

	return render(ui, {
		wrapper: createWrapper({
			adapters,
			clients,
			primitives,
		}),
		...renderOptions,
	});
}

/**
 * Render a React hook with all test providers.
 */
export function renderHookWithProviders<Result, Props>(
	callback: (props: Props) => Result,
	options?: Omit<RenderHookOptions<Props>, "wrapper"> &
		Partial<ReturnType<typeof mockDi>>,
) {
	const { adapters, clients, primitives, ...renderOptions } = options ?? {};

	return renderHook(callback, {
		wrapper: createWrapper({
			adapters,
			clients,
			primitives,
		}),
		...renderOptions,
	});
}
