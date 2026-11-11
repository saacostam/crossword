import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/shared/async";
import { useClients } from "@/shared/clients/app";

export interface UseQueryCrosswordByIdArgs {
	id: string;
}

export function useQueryCrosswordById({ id }: UseQueryCrosswordByIdArgs) {
	const { crossword } = useClients();

	return useQuery({
		queryKey: [QueryKey.QUERY_CROSSWORD_BY_ID, id],
		queryFn: () => crossword.getById({ id }),
	});
}
