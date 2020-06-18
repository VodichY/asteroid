const cache = new Array;

function findNoteByIdInCache(id){
    return cache.find((asteroid) => asteroid.id === id);  
}

function clearNotesInCache() {
    cache.length = 0;
}

function updateNoteByIdInCache(id,obj){
    note = findNoteByIdInCache(id);
    if(note != undefined){
        extend(note, obj);  
    }
}

function addNoteInCache(data){
    cache.push(data);
}

function removeNoteInCache(id){
    let elem = findNoteByIdInCache(id);
    if(elem != undefined){
        cache.splice(cache.indexOf(elem),1);
    }
}

function extend(obj1, obj2){
    for (key in obj2){
        if(obj1.get(key) == undefined){
            continue;
        }
      obj1[key]=obj2[key];
    }
    return obj1;
}

module.exports = {
    clearNotesInCache: clearNotesInCache,
    findNoteByIdInCache: findNoteByIdInCache,
    updateNoteByIdInCache: updateNoteByIdInCache,
    addNoteInCache: addNoteInCache,
    findNoteByIdInCache: findNoteByIdInCache,
    removeNoteInCache: removeNoteInCache
}