export const lerp = (current, target, factor) => current * (1 - factor) + target * factor

export function uIDG() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}