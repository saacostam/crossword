import { createContext } from "react";
import type { UseViewport } from "@/shared/adapters/domain";

export interface Adapters {
	useViewport: UseViewport;
}

export const AdaptersContext = createContext(null as unknown as Adapters);
