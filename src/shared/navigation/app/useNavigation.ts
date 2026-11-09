import { useContext } from "react";
import { NavigationContext } from "./navigation-context";

export function useNavigation() {
	return useContext(NavigationContext);
}
