import { Modal as MantineModal, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";
import type { ModalProps } from "@/shared/primitives/domain";

export function Modal({
	children,
	opened,
	onClose,
	title,
}: PropsWithChildren<ModalProps>) {
	return (
		<MantineModal
			opened={opened}
			onClose={onClose}
			title={
				<Text fw="bold" size="lg">
					{title}
				</Text>
			}
		>
			{children}
		</MantineModal>
	);
}
