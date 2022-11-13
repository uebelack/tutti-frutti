function int(env: string, def: number): number {
  if (env === undefined || env === null || env === '') {
    return def;
  }
  return parseInt(env, 10);
}

export default () => ({
  game: {
    wordsPerRound: int(process.env.TUTTI_FRUTTI_WORDS_PER_ROUND, 4),
    timeLimitInSeconds: int(process.env.TUTTI_FRUTTI_TIME_LIMIT_IN_SECONDS, 60),
    correctAnswerPoints: int(
      process.env.TUTTI_FRUTTI_CORRECT_ANSWER_POINTS,
      10
    ),
    incorrectAnswerPoints: int(
      process.env.TUTTI_FRUTTI_INCORRECT_ANSWER_POINTS,
      -10
    ),
    fiftyFiftyDefault: int(process.env.TUTTI_FRUTTI_FIFTY_FIFTY_DEFAULT, 1),
    fiftyFiftyTop: int(process.env.TUTTI_FRUTTI_FIFTY_FIFTY_TOP, 2),
    maxSkipRounds: int(process.env.TUTTI_FRUTTI_MAX_SKIP_ROUNDS, Infinity),
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
  },
});
