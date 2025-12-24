export type Card = {
    id: number;
    value: string;
    state: "hidden" | "revealed";
};
export type GameStatus = "playing" | "win";
export type GameState = {
    cards: Card[];
    flipped: Card[];
    successCount: number;
    totalPairs: number;
    isLock: boolean;
    status: GameStatus;
};
