import { UnstyledButton } from "@mantine/core";
import type { ComponentType } from "react";
import {
	CrosswordItem,
	type CrosswordItemProps,
	CrosswordPicker,
} from "@/features/crossword/picker/ui";
import { useNavigation } from "@/shared/navigation/app";
import { ScreenName } from "@/shared/navigation/domain";

const CrosswordItemWithNav: ComponentType<CrosswordItemProps> = (props) => {
	const nav = useNavigation();

	return (
		<UnstyledButton
			component="div"
			onClick={() =>
				nav.setScreen({
					name: ScreenName.CROSSWORD_BY_ID,
					payload: { id: props.crossword.id },
				})
			}
		>
			<CrosswordItem {...props} />
		</UnstyledButton>
	);
};

export function CrosswordPickerScreen() {
	return <CrosswordPicker CrosswordItem={CrosswordItemWithNav} />;
}
