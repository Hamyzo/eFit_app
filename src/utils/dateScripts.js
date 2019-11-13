export const getRemainingDays = period => {
  const { repetitions } = period;
  if (repetitions && repetitions.length > 0) {
    const currentDate = new Date();
    const deadLine = new Date(repetitions[0].date);
    deadLine.setDate(deadLine.getDate() + period.nb_days);
    console.log("Deadline: " + deadLine.toDateString());
    console.log("currentDate: " + currentDate.toDateString());
    return Math.round(
      (deadLine.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );
  }
  return period.nb_days;
};
