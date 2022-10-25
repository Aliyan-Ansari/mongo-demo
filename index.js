const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MondoDB error is: ', err));

    // First Make Schema 
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPubished: Boolean,
});

//  compile that in a model
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    const course = new Course({
        name: 'React Course',
        author: 'Ansari',
        tags: ['react', 'frontend'],
        isPubished: true,
    });   
    const result = await course.save();
    console.log('Result of Create:', result);
}

// ---- Get Data -----
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
    .find({ author: 'Aliyan', isPubished: true})
    //  -------- comparison operator --------
    // .find({ price: { $gt: 10, $lt: 20 }})
    // .find({ price: { $in: [10, 15, 20] }})
    // ------ Locgical operator -----
    // .find()
    // .or([ { author: 'Aliyan' }, { isPubished: true }])
    // --------- Regular Expression ----
    // ----- Aliyan in start of the string ----
    // .find({ author: /^Aliyan/ })
    //  ----- Search Ansari in end of the string -------   
    // ----- i for insensitive string ---
    // .find({ author: /Ansari$/i})
    // ------- Contains Aliyan ------
    // .find({ author: /.*Aliyan.*/i})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    // .count()
    .select({ name: 1, tags: 1 });
    console.log('--Courses from Database: ', courses);
}

getCourses();
// createCourse();
