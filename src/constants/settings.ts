export const ENV = {
  NODE_ENV: 'NODE_ENV',
  BOT_TOKEN: 'BOT_TOKEN',
  BOT_TEST_TOKEN: 'BOT_TEST_TOKEN',
  GUILD_ID: 'GUILD_ID',
  DATABASE_URL: 'DATABASE_URL',
} as const;
export type Env = typeof ENV[keyof typeof ENV];
