const mongoose = require('mongoose');
const schema = mongoose.Schema;

var asteroidSchema = new schema({
    name: String,
    weight: Number,
    diameter: Number,
    composition: {
        metal: String,
        color: String,
        round: Boolean
    }
});

var Asteroid = mongoose.model('Asteroid', asteroidSchema);

function createNewNote(obj) {
    asteroid = new Asteroid(obj);
    return asteroid.save();
}

function deleteNoteById(id) {
    return Asteroid.findByIdAndRemove(id);
}

function findNotes() {
    return Asteroid.find().exec();
}

function findNoteById(id) {
    return Asteroid.findById(id).exec();
}

async function updateNoteById(id, obj) {
    return await Asteroid.updateOne({_id: id}, obj);
}

async function deleteNotes(){
    return await Asteroid.remove();
}

module.exports = {
    createNewNote: createNewNote,
    deleteNoteById: deleteNoteById,
    findNotes: findNotes,
    findNoteById: findNoteById,
    updateNoteById: updateNoteById,
    deleteNotes:deleteNotes
}