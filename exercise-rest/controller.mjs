import express from 'express';
import model from './model.mjs';
import { check, validationResult, body } from 'express-validator';
const app = express();

app.use(express.json());

// Invoke the connect function in the model, which will establish the connection to MongoDB
model.connect();

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// 1. Create using POST /exercises
app.post('/exercises', [  
    
    // Validate that name exists, is a string and has at least one character
    check('name')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('name does not exist')
        .isString().withMessage('name is not a string')
        .isLength({ min: 1 }).withMessage('name is not at least one character'),
    
    // Validate that reps exists and is an integer that is greater than 0
    check('reps')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('reps does not exist')
        .isInt({ min: 1 }).withMessage('reps is not an integer or is less than 1'),
    
    // Validate that weight exists and is an integer that is greater than 0
    check('weight')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('weight does not exist')
        .isInt({ min: 1 }).withMessage('weight is not an integer or is less than 1'),

    // Validate that unit exists and is a string that matches 'kgs' or 'lbs'
    check('unit')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('unit does not exist')
        .isString().withMessage('unit is not a string')
        .isIn(['kgs', 'lbs']).withMessage('unit is not kgs or lbs'),

    // Validate that date exists, is a string and that the string format is valid
    check('date')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('date does not exist')
        .isString().withMessage('date is not a string'),
    check('date').custom((value) => {
        if (!isDateValid(value)) {
            throw new Error('date is not in a valid format');
        }
        return true;
    }),

    // Validate whether unexpected fields were included in the body of the request
    body().custom(value => {
        const requiredFields = ['name', 'reps', 'weight', 'unit', 'date'];
        const unexpectedProperties = Object.keys(value).filter(key => !requiredFields.includes(key));
        if (unexpectedProperties.length) {
            throw new Error('Unexpected properties were included in request body');
        }
        return true;
    })
], (req, res) => {
    
    const errors = validationResult(req);
    console.log('errors:', errors);

    /* If any of the checks fail, the request is invalid. */
    if (!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid request"});
    }
    
    /* Project assumes that request body will always be a JSON object. */
    const { name, reps, weight, unit, date } = req.body;

    const exercisePromise = model.createExercise(name, reps, weight, unit, date);
    
    exercisePromise.then((value) => {
        return res.status(201).json(value);
    });
});

// 2. Read using GET /exercises
app.get('/exercises', (req, res) => {
    
    // Request all exercises via the model
    const exercises = model.getExercises();
    exercises.then((value) => {
        return res.status(200).json(value);
    });
});

// 3. Read one using GET /exercises/:_id
app.get('/exercises/:_id', (req, res) => {
    
    // Grab the exerciseID so that it can be leveraged in the model
    const exerciseID = req.params._id;
    const exercises = model.getExerciseByID(exerciseID);
    exercises.then((value) => {
        if (value) {
            return res.status(200).json(value);
        }

        else {
            return res.status(404).json({ Error: "Not found"});
        }
    })
});

// 4. Update using PUT /exercises/:_id
app.put('/exercises/:_id', [
    
    // Validate that name exists, is a string and has at least one character
    check('name')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('name does not exist')
        .isString().withMessage('name is not a string')
        .isLength({ min: 1 }).withMessage('name is not at least one character'),
    
    // Validate that reps exists and is an integer that is greater than 0
    check('reps')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('reps does not exist')
        .isInt({ min: 1 }).withMessage('reps is not an integer or is less than 1'),
    
    // Validate that weight exists and is an integer that is greater than 0
    check('weight')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('weight does not exist')
        .isInt({ min: 1 }).withMessage('weight is not an integer or is less than 1'),

    // Validate that unit exists and is a string that matches 'kgs' or 'lbs'
    check('unit')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('unit does not exist')
        .isString().withMessage('unit is not a string')
        .isIn(['kgs', 'lbs']).withMessage('unit is not kgs or lbs'),

    // Validate that date exists, is a string and that the string format is valid
    check('date')
        .exists({ checkUndefined: true, checkNull: true, checkFalsy: true }).withMessage('date does not exist')
        .isString().withMessage('date is not a string'),
    check('date').custom((value) => {
        if (!isDateValid(value)) {
            throw new Error('date is not in a valid format');
        }
        return true;
    }),

    // Validate whether unexpected fields were included in the body of the request
    body().custom(value => {
        const requiredFields = ['name', 'reps', 'weight', 'unit', 'date'];
        const unexpectedProperties = Object.keys(value).filter(key => !requiredFields.includes(key));
        if (unexpectedProperties.length) {
            throw new Error('Unexpected properties were included in request body');
        }
        return true;
    })
], (req, res) => {

    const errors = validationResult(req);
    console.log('errors:', errors);

    /* If any of the checks fail, the request is invalid. */
    if (!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid request"});
    }


    // Grab the exerciseID and properties so that they can be leveraged in the model
    const exerciseID = req.params._id;
    const newProperties = req.body;

    const updatedDocument = model.updateExerciseByID(exerciseID, newProperties);
    updatedDocument.then((value) => {
        if (value) {
            return res.status(200).json(value);
        }

        else {
            return res.status(404).json({ Error: "Not found"});
        }
    })
});

// 5. Delete one using DELETE /exercises/:_id
app.delete('/exercises/:_id', (req, res) => {

    // Grab the exerciseID so that it can be leveraged in the model
    const exerciseID = req.params._id;
    const queryObject = model.deleteExerciseByID(exerciseID);
    queryObject.then((value) => {
        if (value) {
            return res.status(204).send();
        }

        else {
            return res.status(404).json({ Error: "Not found"});
        }
    });
});

// Don't change or add anything below this line
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});