export interface Notifications {
	notify(args: NotificationsPayload["notify"]["args"]): void;
}

export interface NotificationsPayload {
	notify: {
		args: {
			id?: string;
			type: "success" | "error";
			msg: string;
			title?: string;
		};
	};
}
