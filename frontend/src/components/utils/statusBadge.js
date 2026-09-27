export function statusPillClass(status) {
  if (status === "Present") {
    return "status-pill status-present";
  }

  if (status === "Absent") {
    return "status-pill status-absent";
  }

  if (status === "Upcoming") {
    return "status-pill status-upcoming";
  }

  if (status === "Ongoing") {
    return "status-pill status-ongoing";
  }

  if (status === "Completed") {
    return "status-pill status-completed";
  }

  if (status === "Registered") {
    return "status-pill status-registered";
  }

  return "status-pill";
}