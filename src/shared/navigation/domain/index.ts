export enum ScreenName {
	PICKER = "picker",
	CROSSWORD_BY_ID = "crossword by id",
}

export type SetScreenPayload =
	| {
			name: ScreenName.CROSSWORD_BY_ID;
			payload: {
				id: string;
			};
	  }
	| {
			name: ScreenName.PICKER;
	  };
