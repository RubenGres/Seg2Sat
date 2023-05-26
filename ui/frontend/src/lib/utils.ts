export function randomSeed() {
	return BigInt(13248873089935215612 & (((1 << 63) - 1) * Math.random()));
}
