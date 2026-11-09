import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAdapters } from "@/shared/adapters/app";

export interface UseCellHeightArgs {
	numberOfCellsInHorizontalAxis: number;
}

export function useCellHeight({
	numberOfCellsInHorizontalAxis,
}: UseCellHeightArgs) {
	const { useViewport } = useAdapters();

	const gridRef = useRef<HTMLDivElement>(null);
	const { width } = useViewport();
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		if (!gridRef.current) return;

		const effectiveWidth = Math.min(width, gridRef.current.clientWidth);
		const cellWidth = effectiveWidth / numberOfCellsInHorizontalAxis;

		setHeight(cellWidth);
	}, [numberOfCellsInHorizontalAxis, width]);

	return useMemo(
		() => ({
			gridRef,
			height,
		}),
		[height],
	);
}
