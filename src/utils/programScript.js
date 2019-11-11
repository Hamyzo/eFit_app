completedReps = results => {
  if (results == null) {
    return 0;
  } else {
    return results.length;
  }
};
sessionStatus = periods => {
  var totalReps = 0;
  var completedRep = 0;
  for (var i = 0; i < periods.length; i++) {
    totalReps = totalReps + periods[i].nb_repetitions;
    completedRep = completedRep + this.completedReps(periods[i].results);
  }
  return this.status(completedRep, totalReps);
};

status = (completedReps, numReps) => {
  if (completedReps == numReps) {
    return "Completed";
  } else if (completedReps == 0) {
    return "Not Started";
  } else {
    return "In progress";
  }
};
