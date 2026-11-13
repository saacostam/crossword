import { lazy, type PropsWithChildren, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { SuspenseLoader } from "@/shared/components";
import { AppLayout } from "@/shared/layout";

const CrosswordPickerScreen = lazy(
	() => import("@/shared/screens/CrosswordPickerScreen"),
);
const CrosswordScreen = lazy(() => import("@/shared/screens/CrosswordScreen"));

export function ReactRouter({ children }: PropsWithChildren) {
	return (
		<HashRouter>
			<Suspense fallback={<SuspenseLoader style={{ height: "100vh" }} />}>
				<Routes>
					<Route element={<AppLayout>{children}</AppLayout>}>
						<Route index element={<CrosswordPickerScreen />} />
						<Route path="/crossword/:id" element={<CrosswordScreen />} />
					</Route>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}
