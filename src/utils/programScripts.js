export const completedReps = results => {
  if (results === null) {
    return 0;
  }
  return results.length;
};

export const status = (numCompletedReps, numReps) => {
  if (numCompletedReps === numReps) {
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
  let currentPeriod = 1;
  let currentPeriodInfo = null;
  periods.forEach((period, i) => {
    totalReps += period.nb_repetitions;
    const currentReps = completedReps(period.results);
    numCompletedReps += currentReps;
    if (currentReps !== 0) {
      currentPeriod = i + 1;
      currentPeriodInfo = period;
    }
  });
  return {
    status: status(numCompletedReps, totalReps),
    currentPeriod,
    currentPeriodInfo
  };
};
