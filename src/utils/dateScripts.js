export const getRemainingDays = period => {
  const { repetitions } = period;
  if (repetitions && repetitions.length > 0) {
    const currentDate = new Date();
    const deadLine = new Date(repetitions[0].date);
    deadLine.setDate(deadLine.getDate() + period.nb_days);
    return Math.round(
      (deadLine.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );
  }
  return period.nb_days;
};

export const getNbDaysSinceLastResult = (currentPeriod, previousPeriod) => {
  const { repetitions } = currentPeriod;
  const { lastRepetitions } = previousPeriod;

  if (repetitions && repetitions.length > 0) {
    const currentDate = new Date();
    const lastWorkOutDate = new Date(repetitions[repetitions.length - 1].date);
    return Math.round(
      (currentDate.getTime() - lastWorkOutDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  if (!repetitions && repetitions.length === 0) {
    const currentDate = new Date();
    const lastWorkOutDate = new Date(
      lastRepetitions[lastRepetitions.length - 1].date
    );
    return Math.round(
      (currentDate.getTime() - lastWorkOutDate.getTime()) / (1000 * 3600 * 24)
    );
  }
  return 0;
};

export const getTimeMMSSFormat = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const time = `${
    minutes > 0 ? `${minutes < 10 ? `0${minutes}` : minutes}:` : ""
  }${seconds < 10 ? `0${seconds}` : seconds}${
    minutes > 0 ? " minutes" : " seconds"
  }`;
  return time;
};
