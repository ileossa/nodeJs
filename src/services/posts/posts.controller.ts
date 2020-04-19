import * as express from 'express'
import Post from './post.interface'
import postModel from "./posts.model";
import {NextFunction, request} from "express";
import PostNotFoundException from "../../exceptions/PostNotFoundException";
import {validationDTO} from "../../middleware/validationDTO";
import {CreatePostDto} from "./posts.dto";

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
        this.router.post(this.path, validationDTO(CreatePostDto), this.createAPost)
        this.router.patch(`${this.path}/:id`, validationDTO(CreatePostDto), this.modifyPost)
        this.router.delete(`${this.path}/:id`, this.deletePost)
    }

    private getAllPosts = (req: express.Request, res: express.Response) => {
        this.model.find()
            .then((postfind) => {
                res.send(postfind)
            })
    }

    private getPostById = (req: express.Request, res: express.Response, next: NextFunction) => {
        const id = req.params.id
        this.model.findById(id)
            .then((postfind) => {
                postfind ? res.send(postfind) : next(new PostNotFoundException(id))
            })
    }

    private modifyPost = (req: express.Request, res: express.Response, next: NextFunction) => {
        const id = req.params.id
        const input = req.body
        this.model.findByIdAndUpdate(id, input, {new: true})
            .then((postUpdate) => {
                postUpdate ? res.send(postUpdate) : next(new PostNotFoundException(id))
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

    private deletePost = (req: express.Request, res: express.Response, next: NextFunction) => {
        const id = request.params.id
        this.model.findByIdAndDelete(id)
            .then((successPostCreated) => {
                successPostCreated ? res.send(200) : next(new PostNotFoundException(id))
            })
    }

}