import { lazy, type PropsWithChildren, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { RouteName } from "@/shared/adapters/domain";
import { SuspenseLoader } from "@/shared/components";
import { AppLayout } from "@/shared/layout";

const CrosswordPickerScreen = lazy(
	() => import("@/shared/screens/CrosswordPickerScreen"),
);
const CrosswordScreen = lazy(() => import("@/shared/screens/CrosswordScreen"));

const ErrorScreen = lazy(() => import("@/shared/screens/ErrorScreen"));

export function ReactRouter({ children }: PropsWithChildren) {
	return (
		<HashRouter>
			<Suspense fallback={<SuspenseLoader style={{ height: "100vh" }} />}>
				<Routes>
					<Route element={<AppLayout>{children}</AppLayout>}>
						<Route index element={<CrosswordPickerScreen />} />
						<Route path="/crossword/:id" element={<CrosswordScreen />} />
						<Route
							path="*"
							element={
								<ErrorScreen
									resetHref={{
										name: RouteName.PICKER,
									}}
								/>
							}
						/>
					</Route>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}
