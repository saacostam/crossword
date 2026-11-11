import { Alert, Button, Flex } from "@mantine/core";
import { useEffect } from "react";
import { ExclamationCircleIcon } from "@/shared/icons";

export interface Retry {
	onClick: () => void;
	isPending: boolean;
}

export interface QueryErrorProps {
	msg: string;
	retry: Retry;
	title?: string;
	error: unknown;
	where: string;
}

// Mocked while adapter is added
const errorLogger = {
	report: (_error: unknown, _metadata: { where: string }) => {},
};

export function QueryError({
	msg,
	retry,
	title: _title,
	error,
	where,
}: QueryErrorProps) {
	const title = _title ?? "Something went wrong!";

	useEffect(() => {
		errorLogger.report(error, { where });
	}, [error, where]);

	return (
		<Alert
			color="red"
			data-testid="query-error"
			icon={<ExclamationCircleIcon />}
			title={title}
		>
			{msg}
			<Flex justify="end">
				<Button color="red" loading={retry.isPending} onClick={retry.onClick}>
					Retry
				</Button>
			</Flex>
		</Alert>
	);
}
