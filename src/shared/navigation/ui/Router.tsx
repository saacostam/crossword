import { useMemo, useState } from "react";
import { AppLayout } from "@/shared/layout";
import { type Navigation, NavigationContext } from "@/shared/navigation/app";
import { ScreenName, type SetScreenPayload } from "@/shared/navigation/domain";
import { CrosswordPickerScreen, CrosswordScreen } from "@/shared/screens";

export function Router() {
	const [screen, setScreen] = useState<SetScreenPayload>({
		name: ScreenName.PICKER,
	});

	const navigation: Navigation = useMemo(
		() => ({
			screen,
			setScreen,
		}),
		[screen],
	);

	return (
		<NavigationContext.Provider value={navigation}>
			<AppLayout>
				{screen.name === ScreenName.PICKER && <CrosswordPickerScreen />}
				{screen.name === ScreenName.CROSSWORD_BY_ID && (
					<CrosswordScreen
						key={screen.payload.id}
						crosswordId={screen.payload.id}
					/>
				)}
			</AppLayout>
		</NavigationContext.Provider>
	);
}
