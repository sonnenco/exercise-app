import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_APP_DB_NAME = 'exercise_app_db';
const EXERCISE_APP_DB_COLLECTION = 'exercises';
const EXERCISE_APP_DB_CLASS = "Exercises";

let connection = undefined;
let Exercises = createModel();

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop EXERCISE_APP_DB_COLLECTION if asked to do so.
 *  3. Creates a model class for the exercise schema.
 * @param {Boolean} dropCollection If true, drop EXERCISE_APP_DB_COLLECTION
 */
async function connect(dropCollection){
    
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_APP_DB_COLLECTION);
        }
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_APP_DB_NAME});
    return mongoose.connection;
}

/**
 * Define a schema for the exercises collection, compile a model, and return.
 * @returns A model object for the exerciseSchema
 */
function createModel (){
    
    // Define the schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required:true},
        reps: {type: Number, required:true},
        weight: {type: Number, required:true},
        unit: {type: String, required:true},
        date: {type: String, required:true}
    });
    // Compile the exercise class from the schema
    return mongoose.model(EXERCISE_APP_DB_CLASS, exerciseSchema);
}

// 1. Create using POST /exercises
async function createExercise (name, reps, weight, unit, date){
     
    // Call the constructor to create an instance of the model class Exercises
    const exercise = new Exercises({name: name, reps: reps, weight: weight, unit: unit, date: date});
        
    // Call save to persist the object as a document in MongoDB
    return exercise.save();
}

// 2. Read using GET /exercises
async function getExercises (){

    // Call the database to gather all exercises
    const queryObject = Exercises.find({});
    return queryObject.exec();

}

// 3. Read one using GET /exerciss/:_id
async function getExerciseByID(exerciseID){
    
    // Find and return documents which match the exerciseID
    const queryObject = Exercises.findById(exerciseID);
    return queryObject.exec();
}

// 4. Update using PUT /exercises/:_id
async function updateExerciseByID(exerciseID, newProperties){
    
    // Find the exercise associated with the ID parameter, and update using the newProperties
    await Exercises.updateOne({_id: exerciseID}, newProperties);
    const queryObject = Exercises.findById(exerciseID);
    return queryObject.exec();
}

// 5. Delete one using DELETE /exersises/:_id
async function deleteExerciseByID(exerciseID){

    // Find the exercise associated with the ID parameter, and delete using the newProperties
    const result = await Exercises.findByIdAndDelete(exerciseID);
    return result;
}

export default { connect, createExercise, getExercises, getExerciseByID, updateExerciseByID, deleteExerciseByID };