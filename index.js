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

createCourse();
