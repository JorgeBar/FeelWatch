import path from 'node:path';
import assert from 'node:assert';
import list from '../models/list.js';
import {query , body , validationResult} from 'express-validator';

const __dirname = import.meta.dirname;

export function index(req, res, next) {
    res.sendFile(path.join(__dirname, '../../docs/index.html'));
}

export function paramsInList(req,res,next){
    const listsId = req.params.listsId
    const movieid = req.params.movieid

    res.send(`This is the movie ${movieid} and it is from the list  ${listsId} `)
}

export async function filters(req,res,next){
    const listsId = req.query.listsId
    const movieid = req.query.movieid
    const sort = req.query.sort
    const skip = req.query.skip
    const filterList = { list} 
        if(filterName){
            filterList.name = filterName
        }
    
        if(filterMovie){
            filterList.movieid = filterMovie
        }
    const lists = await lists.list(filter,resourceLimits,skip,sort)
    res.json(`This is the movie ${movieid} and it is from the list  ${listsId} `)
}

// post example

export function createExample(req,res,next){
    const item = req.bodyitem

    assert(item, 'item is required')

    res.send('Received ' + item)
}
