import { Container } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function AppLayout({ children }: PropsWithChildren) {
	return <Container p="xs">{children}</Container>;
}
