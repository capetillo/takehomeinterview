// exporting for reusability

// start and end refer to startDate and endDate's time, respectively and 1 and 2 refer to which interval it pertains to
 const checkForOverlap = (start1, end1, start2, end2) => {
    // checking if the start of one interval overlaps with the start of another interval
    return (start1 >= start2 && start1 <= end2) || (start2 >= start1 && start2 <= end1);
}

export default checkForOverlap;