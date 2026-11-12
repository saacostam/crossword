import { notifications } from "@mantine/notifications";
import { useCallback, useMemo } from "react";
import type { Notifications } from "@/shared/adapters/domain";

export function useMantineNotifications(): Notifications {
	const notify: Notifications["notify"] = useCallback(
		({ id, type, msg, title }) => {
			const defaultTitle = type === "error" ? "Error" : "Success";

			notifications.show({
				id,
				title: title ?? defaultTitle,
				message: msg,
				color: type === "error" ? "red" : "green",
			});
		},
		[],
	);

	return useMemo(
		() => ({
			notify,
		}),
		[notify],
	);
}
