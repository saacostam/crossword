import type { ComponentType, PropsWithChildren } from "react";

export enum RouteName {
	PICKER = "picker",
	CROSSWORD_BY_ID = "crossword by id",
}

export type SetRoutePayload =
	| {
			name: RouteName.CROSSWORD_BY_ID;
			payload: {
				id: string;
			};
	  }
	| {
			name: RouteName.PICKER;
	  };

export interface LinkProps {
	to: SetRoutePayload;
}

export interface Navigation {
	setRoute: (payload: SetRoutePayload) => void;
	getParams: <T = Record<string, string | undefined>>() => T;
	Link: ComponentType<PropsWithChildren<LinkProps>>;
}
