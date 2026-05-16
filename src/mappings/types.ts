export interface ReplacementRule {
	readonly find: string;
	readonly replace: string;
}

export type ReplacementMap = ReadonlyArray<ReplacementRule>;
