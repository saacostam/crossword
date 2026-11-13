import { Button, Container, Space, Text, Title } from "@mantine/core";
import { useAdapters } from "@/shared/adapters/app";
import type { SetRoutePayload } from "@/shared/adapters/domain";

export interface ErrorScreenProps {
	resetHref: SetRoutePayload;
}

export default function ErrorScreen({ resetHref }: ErrorScreenProps) {
	const { nav } = useAdapters();

	return (
		<Container size="sm" py="xl" ta="center">
			<Title size="h2" order={4}>
				Page Not Found
			</Title>
			<Space h="md" />
			<Title size="h1" order={5} style={{ fontSize: "48px" }}>
				404
			</Title>
			<Space h="xs" />
			<Text size="sm" fw={500}>
				Sorry, we couldn&apos;t find the page you&apos;re looking for.
			</Text>
			<Space h="md" />
			<nav.Link to={resetHref}>
				<Button mx="auto" size="sm">
					Back To Home
				</Button>
			</nav.Link>
		</Container>
	);
}
