export type SeedMode = "dev" | "test" | "staging";

export type SeedContext = {
  mode: SeedMode;
  now: Date;
};

export type SeedResult<T extends Record<string, unknown> = Record<string, unknown>> = T;

export type SeedFn<T extends SeedResult = SeedResult> = (ctx: SeedContext) => Promise<T>;