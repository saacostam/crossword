import { useContext } from "react";
import { PrimitivesContext } from "./primitives-context";

export function usePrimitives() {
	return useContext(PrimitivesContext);
}
