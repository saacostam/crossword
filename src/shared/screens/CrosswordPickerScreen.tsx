import type { ComponentType } from "react";
import {
	CrosswordItem,
	type CrosswordItemProps,
	CrosswordPicker,
} from "@/features/crossword/picker/ui";
import { useAdapters } from "@/shared/adapters/app";
import { RouteName } from "@/shared/adapters/domain";

const CrosswordItemWithNav: ComponentType<CrosswordItemProps> = (props) => {
	const { nav } = useAdapters();

	return (
		<nav.Link
			to={{
				name: RouteName.CROSSWORD_BY_ID,
				payload: { id: props.crossword.id },
			}}
		>
			<CrosswordItem {...props} />
		</nav.Link>
	);
};

export function CrosswordPickerScreen() {
	return <CrosswordPicker CrosswordItem={CrosswordItemWithNav} />;
}
