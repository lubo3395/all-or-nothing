import type { Card } from "../types/types";

function createGameController(cards: Array<Card>, hooks: any = {}) {
    const totalPairs = cards.length / 2;
    const state: {
        cards: Array<Card>;
        flipped: Array<Card>;
        successCount: number;
        totalPairs: number;
        isLock: boolean;
        status: string;
    } = {
        cards,
        flipped: [],
        successCount: 0,
        totalPairs,
        isLock: false,
        status: "playing",
    };
    const emit = (name: string, payload?: any) => {
        if (typeof hooks[name] === "function") {
            hooks[name](payload, state);
        }
    };
    function getCard(id: number) {
        return state.cards.find((c) => c.id === id);
    }
    function flipCard(id: number) {
        if (state.isLock) return;
        if (state.status !== "playing") return;

        const card = getCard(id);
        if (!card) return;
        if (card.state !== "hidden") return;
        if (state.flipped.length === 2) return;
        // 翻牌
        card.state = "revealed";
        state.flipped.push(card);
        emit("onFlip", card);
        if (state.flipped.length === 2) {
            checkMatch();
        }
    }
    function checkMatch() {
        const [a, b] = state.flipped;
        if (!a || !b) return;
        state.isLock = true;
        if (a.value === b.value) {
            // 匹配成功
            state.successCount++;
            emit("onMatch", [a, b]);
            state.flipped = [];
            state.isLock = false;

            if (state.successCount === state.totalPairs) {
                state.status = "win";
                emit("onWin");
            }
        } else {
            emit("onFail");
            // 匹配失败：全局重置
            setTimeout(resetAll, 800);
        }
    }
    function resetAll() {
        for (const card of state.cards) {
            card.state = "hidden";
        }
        state.flipped = [];
        state.successCount = 0;
        state.isLock = false;
        emit("onReset");
    }
    function resetGame() {
        resetAll();
        state.status = "playing";
    }
    return {
        state,
        flipCard,
        resetGame,
    };
}
export { createGameController };
