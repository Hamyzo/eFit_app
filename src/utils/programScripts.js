export const completedReps = repetitions => {
  if (repetitions === null) {
    return 0;
  }
  return repetitions.length;
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
  let isStarted = false;
  periods.forEach((period, i) => {
    totalReps += period.nb_repetitions;
    const currentReps = completedReps(period.repetitions);
    numCompletedReps += currentReps;
    console.log(
      "Current Reps: " +
        currentReps +
        " current nb_reps: " +
        period.nb_repetitions
    );
    if (
      (currentReps > 0 && currentReps < period.nb_repetitions) ||
      (currentReps === 0 && !isStarted)
    ) {
      if (!isStarted) {
        isStarted = true;
      }
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
