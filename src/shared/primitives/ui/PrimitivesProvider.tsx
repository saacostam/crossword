import { type PropsWithChildren, useMemo } from "react";
import { type Primitives, PrimitivesContext } from "@/shared/primitives/app";
import { Modal } from "@/shared/primitives/infra";

export function PrimitivesProvider({ children }: PropsWithChildren) {
	const value: Primitives = useMemo(
		() => ({
			Modal: Modal,
		}),
		[],
	);

	return (
		<PrimitivesContext.Provider value={value}>
			{children}
		</PrimitivesContext.Provider>
	);
}
