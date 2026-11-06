import { useContext } from "react";
import { type Clients, ClientsContext } from "./clients-context";

export function useClients(): Clients {
	const clients = useContext(ClientsContext);

	if (clients === null) {
		throw new Error("Clients context not found");
	}

	return clients;
}
