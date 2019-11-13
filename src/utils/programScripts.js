export const completedReps = results => {
  if (results === null) {
    return 0;
  }
  return results.length;
};

export const status = (numCompletedReps, numReps) => {
  if (numCompletedReps >= numReps) {
    return "Completed";
  }
  if (numCompletedReps === 0) {
    return "Not Started";
  }
  return "In progress";
};

export const sessionStatus = periods => {
  let totalReps = 0;
  let numCompletedReps = 0;
  let latestPeriod = 1;
  let latestRepetition = 1;
  let currentPeriodInfo = periods[0];
  periods.forEach((period, i) => {
    totalReps += period.nb_repetitions;
    const currentReps = completedReps(period.results);
    numCompletedReps += currentReps;
    if (currentReps !== 0) {
      latestPeriod = i + 1;
      latestRepetition = currentReps + 1;
      currentPeriodInfo = period;
    }
  });
  return {
    status: status(numCompletedReps, totalReps),
    latestPeriod,
    latestRepetition,
    currentPeriodInfo
  };
};
