import { Container, Divider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { Logo } from "@/shared/components";

export function AppLayout({ children }: PropsWithChildren) {
	return (
		<Container p="xs">
			<Logo size="2rem" ta="center" />
			<Divider my="sm" />
			{children}
		</Container>
	);
}
