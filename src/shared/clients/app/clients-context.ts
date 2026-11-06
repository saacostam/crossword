import { createContext } from "react";
import type { CrosswordClient } from "@/shared/clients/domain";

export interface Clients {
	crossword: CrosswordClient;
}

export const ClientsContext = createContext<Clients | null>(null);
