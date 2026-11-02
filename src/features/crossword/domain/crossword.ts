import type { Position } from "@/shared/misc/domain";

export type ClueDirection = "across" | "down";

export interface Clue {
    id: string;
    hint: string;
    word: string;
    pos: Position;
    direction: ClueDirection;
}

export interface Crossword {
    id: string;
    name: string;
    size: {
        h: string;
        w: string;
    }
    clues: Clue[];    
}
