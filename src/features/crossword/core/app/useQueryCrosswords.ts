import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/shared/async";
import { useClients } from "@/shared/clients/app";

export interface UseQueryCrosswordsArgs {
	page: number;
	size?: number;
}

export function useQueryCrosswords({ page, size }: UseQueryCrosswordsArgs) {
	const { crossword } = useClients();

	return useQuery({
		queryKey: [QueryKey.QUERY_CROSSWORDS, page, size],
		queryFn: () => crossword.getAll({ page, size }),
	});
}
