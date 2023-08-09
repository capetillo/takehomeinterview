// importing package for uniqueid generator
import { v4 as uuidv4 } from 'uuid';
// creating a uniqueID for each downtime
const _id = uuidv4();

// initializes defaultValue of object where the keys are the downtime features and their values are set to empty strings and null 
const defaultValue = {
    site: '', 
    telescope: '', 
    // initializing startDate and endDate to null because if preselected, it can create erroneous data
    // where startDate and endDate can be the exact same value 
    startDate: null, 
    endDate: null, 
    reason: '',
    // unique id
    id: _id
}

// exporting it so it can be used throughout the app for cleaner code
export default defaultValue