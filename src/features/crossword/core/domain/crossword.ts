import type { Direction, Position } from "@/shared/misc/domain";

export interface Clue {
    id: string;
    hint: string;
    word: string;
    pos: Position;
    direction: Direction;
}

export interface Crossword {
    id: string;
    name: string;
    size: {
        h: number;
        w: number;
    }
    clues: Clue[];    
}
