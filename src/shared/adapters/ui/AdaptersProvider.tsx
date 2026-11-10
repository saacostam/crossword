import { useViewportSize } from "@mantine/hooks";
import { type PropsWithChildren, useMemo } from "react";
import { type Adapters, AdaptersContext } from "@/shared/adapters/app";
import { useReactRouterNavigation } from "@/shared/adapters/infra";
import { ReactRouter } from "./ReactRouter";

export function AdaptersProvider({ children }: PropsWithChildren) {
	return (
		<ReactRouter>
			<AdaptersProviderDependencyInjection>
				{children}
			</AdaptersProviderDependencyInjection>
		</ReactRouter>
	);
}

function AdaptersProviderDependencyInjection({ children }: PropsWithChildren) {
	const nav = useReactRouterNavigation();

	const value: Adapters = useMemo(
		() => ({
			nav,
			useViewport: useViewportSize,
		}),
		[nav],
	);

	return (
		<AdaptersContext.Provider value={value}>
			{children}
		</AdaptersContext.Provider>
	);
}
