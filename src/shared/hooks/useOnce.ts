import { type EffectCallback, useEffect } from "react";

export function useOnce(effect: EffectCallback): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: use once
	useEffect(
		effect,
		// oxlint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
}
