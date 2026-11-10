import { createContext } from "react";
import type { Navigation, UseViewport } from "@/shared/adapters/domain";

export interface Adapters {
	nav: Navigation;
	useViewport: UseViewport;
}

export const AdaptersContext = createContext(null as unknown as Adapters);
