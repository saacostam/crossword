import { useViewportSize } from "@mantine/hooks";
import { type PropsWithChildren, useMemo } from "react";
import { type Adapters, AdaptersContext } from "@/shared/adapters/app";

export function AdaptersProvider({ children }: PropsWithChildren) {
	const value: Adapters = useMemo(
		() => ({
			useViewport: useViewportSize,
		}),
		[],
	);

	return (
		<AdaptersContext.Provider value={value}>
			{children}
		</AdaptersContext.Provider>
	);
}
