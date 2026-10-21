

const ChcekEligibility = (student, job) => {

    const criteria = job.eligibility;
    const reasons = [];

    // check degree

    if (criteria.degrees?.length && !criteria.degrees.includes(student.degree)) {

        reasons.push(" Degree requirement not satisfied");
    }

    if (criteria.branches?.length && !criteria.branches.includes(student.branch)) {

        reasons.push("Branch requirement not satisfied")
    }

    if (
        criteria.passingYear != null &&
        criteria.passingYear !== student.passingYear
    ) {
        reasons.push("Passing year requirement not satisfied");
    }


    if (
        criteria.minPercentage != null &&
        student.percentage < criteria.minPercentage
    ) {
        reasons.push("Overall percentage requirement not satisfied");
    }

    if (
        criteria.minTenthPercentage != null &&
        student.tenthPercentage < criteria.minTenthPercentage
    ) {
        reasons.push("10th percentage requirement not satisfied");
    }

    if (
    criteria.minTwelfthPercentage != null &&
    student.twelfthPercentage < criteria.minTwelfthPercentage
  ) {
    reasons.push("12th percentage requirement not satisfied");
  }


    if (
        criteria.minUgPercentage != null &&
        student.ugPercentage < criteria.minUgPercentage
    ) {
        reasons.push("UG percentage requirement not satisfied");
    }


    if (
        criteria.minPgPercentage != null &&
        student.pgPercentage < criteria.minPgPercentage
    ) {
        reasons.push("PG percentage requirement not satisfied");
    }


    if (
        criteria.maxBacklogs != null &&
        student.activeBacklogs > criteria.maxBacklogs
    ) {
        reasons.push("Backlog requirement not satisfied");
    }

    if (
        criteria.maxGapYears != null &&
        student.gapYears > criteria.maxGapYears
    ) {
        reasons.push("Academic gap requirement not satisfied");
    }

    return {
        eligible: reasons.length === 0,
        reasons,
    };



};

export default ChcekEligibility;