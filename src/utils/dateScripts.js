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

export const getNbDaysSinceLastResult = period => {
  const { repetitions } = period;

  if (repetitions && repetitions.length > 0) {
    const currentDate = new Date();
    const lastWorkOutDate = new Date(repetitions[repetitions.length - 1].date);
    return Math.round(
      (currentDate.getTime() - lastWorkOutDate.getTime()) / (1000 * 3600 * 24)
    );
  }
  return period.nb_days;
};
