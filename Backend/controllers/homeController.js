import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'node:assert';
import {query , body , validationResult} from 'express-validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function index(req, res, next) {
    res.sendFile(path.join(__dirname, '../../docs/index.html'));
}

export function paramsInList(req,res,next){
    const listsId = req.params.listsId
    const movieid = req.params.movieid

    res.send(`This is the movie ${movieid} and it is from the list  ${listsId} `)
}

export function querysInList(req,res,next){
    const listsId = req.query.listsId
    const movieid = req.query.movieid

    res.send(`This is the movie ${movieid} and it is from the list  ${listsId} `)
}

// post example

export function createExample(req,res,next){
    const item = req.bodyitem

    assert(item, 'item is required')

    res.send('Received ' + item)
}
