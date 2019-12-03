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

export const periodStatus = period => {
  if (period.repetitions === null || period.repetitions.length === 0) {
    return {
      color: "gray",
      iconType: "close-circle"
    };
  }
  if (period.repetitions.length === period.nb_repetitions) {
    return {
      color: "green",
      iconType: "check-circle"
    };
  }
  return {
    iconType: "play-circle"
  };
};

export const sessionStatus = periods => {
  let totalReps = 0;
  let numCompletedReps = 0;
  let latestPeriod = 1;
  let latestRepetition = 1;
  let currentPeriodInfo = periods[0];
  let previousPeriod = null;
  let isStarted = false;
  periods.forEach((period, i) => {
    totalReps += period.nb_repetitions;
    const currentReps = completedReps(period.repetitions);
    numCompletedReps += currentReps;
    if (
      (currentReps > 0 && currentReps < period.nb_repetitions) ||
      (currentReps === 0 && !isStarted)
    ) {
      if (!isStarted) {
        isStarted = true;
      }
      latestPeriod = i + 1;
      previousPeriod = i;
      latestRepetition = currentReps + 1;
      currentPeriodInfo = period;
    }
  });
  return {
    status: status(numCompletedReps, totalReps),
    latestPeriod,
    previousPeriod,
    latestRepetition,
    currentPeriodInfo
  };
};

export const focusSessionStatus = focusSessions => {
  let currentFocusSession = focusSessions[focusSessions.length - 1];
  let nextFocusSession = null;
  let nextFocusSessionIndex = 0;
  let found = false;
  focusSessions.forEach((focusSession, i) => {
    if (
      (!focusSession.results || focusSession.results.length === 0) &&
      !found
    ) {
      found = true;
      currentFocusSession = i === 0 ? null : focusSessions[i - 1];
      nextFocusSession = focusSessions[i];
      nextFocusSessionIndex = i;
    }
  });
  return { currentFocusSession, nextFocusSession, nextFocusSessionIndex };
};

export const focusSessionDisplayButton = (
  currentSessionStatus,
  previousStatus,
  sessionIndex,
  focusSessions
) => {
  let showButton = false;
  let showReminderBanner = true;
  const {
    currentFocusSession,
    nextFocusSession,
    nextFocusSessionIndex
  } = focusSessionStatus(focusSessions);

  console.log("current session index", sessionIndex);
  console.log("Next focus session index", nextFocusSessionIndex);
  if (
    currentSessionStatus === "Not Started" &&
    previousStatus !== "In progress" &&
    sessionIndex === nextFocusSessionIndex
  ) {
    showButton = true;
    showReminderBanner = false;
  }

  return {
    showButton,
    showReminderBanner,
    currentFocusSession,
    nextFocusSession
  };
};

export const lastWorkout = customer => {
  var lastWO = new Date(customer.registration_date);
  if (hasResults(customer.current_program)) {
    customer.current_program.sessions.forEach(session => {
      session.periods.forEach(period => {
        period.repetitions.forEach(rep => {
          lastWO = rep.date;
        });
      });
    });
  }
  return lastWO;
};

export const hasResults = program => {
  if (
    program.sessions.length > 0 ||
    program.sessions != null ||
    program.sessions[0].periods.length > 0 ||
    program.sessions[0].periods != null ||
    program.sessions[0].periods[0].repetitions.length > 0 ||
    program.sessions[0].periods[0].repetitions != null ||
    program.sessions[0].periods[0].repetitions[0].results != null ||
    program.sessions[0].periods[0].repetitions[0].results.length > 0
  ) {
    return true;
  } else {
    return false;
  }
};

export const formatDate = rawDate => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  const d = new Date(rawDate);
  const day = d.getDate();
  const monthIndex = d.getMonth();
  return `${day}/${monthNames[monthIndex]}`;
};

export const addDaysDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const percentageDifference = (n1, n2) => {
  return ((n1 - n2) / ((n1 + n2) / 2)) * 100;
};

export const removeFocusSessionsNotDone = focusSessions => {
  for (var i = 0; i < focusSessions.length; i++) {
    if (focusSessions[i].results.length == 0) {
      focusSessions.splice(i, 1);
    }
  }
  return focusSessions;
};
