import type { PropsWithChildren } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { AppLayout } from "@/shared/layout";
import { CrosswordPickerScreen, CrosswordScreen } from "@/shared/screens";

export function ReactRouter({ children }: PropsWithChildren) {
	return (
		<HashRouter>
			<Routes>
				<Route element={<AppLayout>{children}</AppLayout>}>
					<Route index element={<CrosswordPickerScreen />} />
					<Route path="/crossword/:id" element={<CrosswordScreen />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
