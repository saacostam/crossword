import { type PropsWithChildren, useMemo } from "react";
import { type Clients, ClientsContext } from "@/shared/clients/app";
import { useCrosswordClient } from "@/shared/clients/infra";

export function ClientsProvider({ children }: PropsWithChildren) {
	const crossword = useCrosswordClient();

	const clients: Clients = useMemo(
		() => ({
			crossword,
		}),
		[crossword],
	);

	return (
		<ClientsContext.Provider value={clients}>
			{children}
		</ClientsContext.Provider>
	);
}
