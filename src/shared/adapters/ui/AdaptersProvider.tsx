import { useViewportSize } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { type PropsWithChildren, useMemo } from "react";
import { type Adapters, AdaptersContext } from "@/shared/adapters/app";
import {
	useMantineNotifications,
	useReactRouterNavigation,
} from "@/shared/adapters/infra";
import { ReactRouter } from "./ReactRouter";

export function AdaptersProvider({ children }: PropsWithChildren) {
	return (
		<ReactRouter>
			<AdaptersProviderDependencyInjection>
				{children}
			</AdaptersProviderDependencyInjection>
			<Notifications />
		</ReactRouter>
	);
}

function AdaptersProviderDependencyInjection({ children }: PropsWithChildren) {
	const nav = useReactRouterNavigation();
	const notifications = useMantineNotifications();

	const value: Adapters = useMemo(
		() => ({
			nav,
			notifications,
			useViewport: useViewportSize,
		}),
		[nav, notifications],
	);

	return (
		<AdaptersContext.Provider value={value}>
			{children}
		</AdaptersContext.Provider>
	);
}
