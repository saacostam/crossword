import {
	type ComponentType,
	createContext,
	type PropsWithChildren,
} from "react";
import type { ModalProps } from "@/shared/primitives/domain";

export interface Primitives {
	Modal: ComponentType<PropsWithChildren<ModalProps>>;
}

export const PrimitivesContext = createContext(null as unknown as Primitives);
