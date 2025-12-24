import type { Card } from "../types/types";

/** 洗牌算法（Fisher-Yates Shuffle）
 * @param {Array} arr - 需要洗牌的数组
 * @returns {Array} - 洗牌后的数组
 * */
function shuffle(arr: Array<any>): Array<any> {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
/**
 * 生成翻翻乐卡牌列表
 * @param {number} n - 卡牌布局边长（n x n）
 * @param {string[]} symbols - 卡牌符号数组，长度必须为 n*n/2
 * @returns {Array<{id:number,value:string,state:string}>}
 */
export function generateCards(n: number, symbols: string[]): Array<Card> {
    const total = n * n;
    if (total % 2 !== 0) {
        throw new Error("卡牌总数必须为偶数");
    }
    if (symbols.length !== total / 2) {
        throw new Error(`符号数量不正确：需要 ${total / 2} 个，实际传入 ${symbols.length} 个`);
    }
    let id = 0;
    const cards = [];
    for (const symbol of symbols) {
        cards.push(
            { id: id++, value: symbol, state: "hidden" },
            { id: id++, value: symbol, state: "hidden" }
        );
    }
    return shuffle(cards);
}
/** 延时函数
 * @param {number} ms - 延时毫秒数
 * @returns {Promise<void>}
 * */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
