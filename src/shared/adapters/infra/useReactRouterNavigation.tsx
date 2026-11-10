import { useCallback, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
	type Navigation,
	RouteName,
	type SetRoutePayload,
} from "@/shared/adapters/domain";

function genRoute(payload: SetRoutePayload): string {
	switch (payload.name) {
		case RouteName.CROSSWORD_BY_ID:
			return `/crossword/${payload.payload.id}`;
		case RouteName.PICKER:
			return "/";
	}
}

export function useReactRouterNavigation(): Navigation {
	const nav = useNavigate();
	const params = useParams();

	const NavLink: Navigation["Link"] = useCallback(
		({ children, to }) => (
			<Link
				to={genRoute(to)}
				style={{ textDecoration: "none", color: "inherit" }}
			>
				{children}
			</Link>
		),
		[],
	);

	const setRoute: Navigation["setRoute"] = useCallback(
		(payload) => nav(genRoute(payload)),
		[nav],
	);

	const getParams: Navigation["getParams"] = useCallback(
		<T,>() => params as T,
		[params],
	);

	return useMemo(
		() => ({
			Link: NavLink,
			setRoute,
			getParams,
		}),
		[NavLink, setRoute, getParams],
	);
}
