import type { ComponentType, ReactNode } from "react";
import type { Mock } from "vitest";
import { vi } from "vitest";
import type { Adapters } from "@/shared/adapters/app";
import type { Clients } from "@/shared/clients/app";
import type { Primitives } from "@/shared/primitives/app";

type Mocked<T> =
	T extends ComponentType<infer P>
		? Mock<(props: P) => ReactNode>
		: T extends (...args: infer A) => infer R
			? Mock<(...args: A) => R>
			: T extends object
				? { [K in keyof T]: Mocked<T[K]> }
				: T;

export function mockDi(): {
	adapters: Mocked<Adapters>;
	clients: Mocked<Clients>;
	primitives: Mocked<Primitives>;
} {
	const clients = {
		crossword: {
			getAll: vi.fn(),
		},
	} satisfies Mocked<Clients>;

	const adapters = {
		nav: {
			setRoute: vi.fn(),
			getParams: vi.fn(),
			Link: vi.fn(),
		},
		useViewport: vi.fn(),
	} satisfies Mocked<Adapters>;

	const primitives = {
		Modal: vi.fn(),
	} satisfies Mocked<Primitives>;

	return {
		adapters,
		clients,
		primitives,
	};
}
