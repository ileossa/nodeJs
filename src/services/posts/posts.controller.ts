import * as express from 'express'
import Post from './post.interface'
import postModel from "./posts.model";
import {request} from "express";

export default class PostsController {
    public path = '/posts'
    public router = express.Router()
    private model = postModel

    constructor() {
        this.initializaRoutes()
    }

    public initializaRoutes() {
        this.router.get(this.path, this.getAllPosts)
        this.router.get(`${this.path}/:id`, this.getPostById)
        this.router.put(`${this.path}/:id`, this.modifyPost)
        this.router.delete(`${this.path}/:id`, this.deletePost)
        this.router.post(this.path, this.createAPost)
    }

    private getAllPosts = (req: express.Request, res: express.Response) => {
        this.model.find()
            .then((postfind) => {
                res.send(postfind)
            })
    }

    private getPostById = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        this.model.findById(id)
            .then((postfind) => {
                res.send(postfind)
            })
    }

    private modifyPost = (req: express.Request, res: express.Response) => {
        const id = req.params.id
        const input = req.body
        this.model.findByIdAndUpdate(id, input, {new: true})
            .then((postUpdate) => {
                res.send(postUpdate)
            })
    }

    private createAPost = (req: express.Request, res: express.Response) => {
        const input: Post = req.body
        const createdPost = new this.model(input)
        createdPost.save()
            .then((postCreated) => {
                res.send(postCreated)
            })
    }

    private deletePost = (req: express.Request, res: express.Response) => {
        const id = request.params.id
        this.model.findByIdAndDelete(id)
            .then((successPostCreated) => {
                successPostCreated ? res.send(200) : res.send(500)
            })
    }

}