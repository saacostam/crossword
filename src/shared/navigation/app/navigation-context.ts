import { createContext } from "react";
import type { SetScreenPayload } from "@/shared/navigation/domain";

export interface Navigation {
	screen: SetScreenPayload;
	setScreen: (payload: SetScreenPayload) => void;
}

export const NavigationContext = createContext<Navigation>(
	null as unknown as Navigation,
);
