const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const asteroid = require('./asteroid');
const cache = require('./cache');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

async function start() {
    try {
        let connection = await mongoose.connect('mongodb+srv://VodzichY:(2063)<f[ec@cluster0-nuzmw.mongodb.net/test', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('server has been started...');
        });

    } catch (error) {
        console.log(error);
    }
}

app.post('/asteroid', function (req, res) {
    asteroid.createNewNote(req.body)
        .then(data => {
            cache.addNoteInCache(data);
            res.send('create note by id:' + data.id + ' succsess');
        })
        .catch(err => {
            res.send(err);
        });
});

app.delete('/asteroid/:id', function (req, res) {
    asteroid.deleteNoteById(req.params.id)
        .then(data => {
            cache.removeNoteInCache(req.params.id);
            res.send('remove note by id:' + data._id + ' succsess');
        })
        .catch(err => {
            res.send(err);
        });
});

app.get('/asteroid', function (req, res) {
    asteroid.findNotes()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get('/asteroid/:id', function (req, res) {
    let data = cache.findNoteByIdInCache(req.params.id);
    if(data != undefined){
        res.send(data);
        return;
    }

    asteroid.findNoteById(req.params.id)
    .then(data => {        
        if (data!= null){
            cache.addNoteInCache(data);
        }        
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });

});

app.put('/asteroid/:id', function (req, res) {
    asteroid.updateNoteById(req.params.id, req.body)
        .then(data => {
            cache.updateNoteByIdInCache(req.params.id,req.body);
            res.send(data.n + ' - documents that were found  \n' + data.nModified + ' - number of documents that were changed');
        })
        .catch(err => {
            res.send(err);
        });
});

app.delete('/asteroid', function (req, res) {
    asteroid.deleteNotes(req.params.id)
        .then(data => {
            cache.clearNotesInCache();
            res.send(data.deletedCount + ' - number of documents removed');
        })
        .catch(err => {
            res.send(err);
        });
});

start();