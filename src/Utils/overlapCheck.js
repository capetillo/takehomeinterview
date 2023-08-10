// exporting for reusability and readability 

// start and end refer to startDate and endDate's time, respectively and 1 and 2 refer to which interval it pertains to
 export const checkForOverlap = (start1, end1, start2, end2) => {
    // converting strings to dates
    start1 = new Date(start1);
    end1 = new Date(end1);
    start2 = new Date(start2);
    end2 = new Date(end2);


    // checking if the start of one interval overlaps with the start of another interval
    return (start1 >= start2 && start1 <= end2) || (start2 >= start1 && start2 <= end1);
}

