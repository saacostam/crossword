import { Text, Title, type TitleProps } from "@mantine/core";

export function Logo(props: TitleProps) {
	return (
		<Title {...props}>
			Cross
			<Text
				inherit
				display="inline"
				style={{ color: "var(--mantine-primary-color-5)" }}
			>
				Word
			</Text>
		</Title>
	);
}
