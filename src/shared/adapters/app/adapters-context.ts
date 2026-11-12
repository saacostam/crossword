import { createContext } from "react";
import type {
	Navigation,
	Notifications,
	UseViewport,
} from "@/shared/adapters/domain";

export interface Adapters {
	nav: Navigation;
	notifications: Notifications;
	useViewport: UseViewport;
}

export const AdaptersContext = createContext(null as unknown as Adapters);
