export const isEligible = (student, job) => {
  const criteria = job.eligibility;

  // Current percentage
  if (
    criteria.minPercentage &&
    student.percentage < criteria.minPercentage
  ) {
    return false;
  }

  // Degree
  if (
    criteria.degrees?.length > 0 &&
    !criteria.degrees.includes(student.degree)
  ) {
    return false;
  }

  // Branch
  if (
    criteria.branches?.length > 0 &&
    !criteria.branches.includes(student.branch)
  ) {
    return false;
  }

  // Backlogs
  if (
    criteria.maxBacklogs !== undefined &&
    student.activeBacklogs > criteria.maxBacklogs
  ) {
    return false;
  }

  // Passing year
  if (
    criteria.passingYear &&
    student.passingYear !== criteria.passingYear
  ) {
    return false;
  }

  // Gap years
  if (
    criteria.maxGapYears !== undefined &&
    student.gapYears > criteria.maxGapYears
  ) {
    return false;
  }

  // 10th percentage
  if (
    criteria.minTenthPercentage &&
    student.tenthPercentage < criteria.minTenthPercentage
  ) {
    return false;
  }

  // 12th percentage
  if (
    criteria.minTwelfthPercentage &&
    student.twelfthPercentage < criteria.minTwelfthPercentage
  ) {
    return false;
  }

  return true;
};