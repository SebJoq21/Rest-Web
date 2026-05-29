import { Request, Response } from "express"
import prisma from "../../data/postgres";

const todos: { id: number; text: string; completedAt: Date | null }[] = [
    {id: 1, text:'Buy milk', completedAt: new Date()},
    {id: 2, text:'Buy bread', completedAt: new Date()},
    {id: 3, text:'Buy butter', completedAt: new Date()}
]

export class TodosController {

    //* Dependency Injection
    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoByID = (req: Request, res: Response) => {
        
        const id = +req.params.id!;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})

        const todo = todos.find( todo => todo.id === id);
        
        ( todo )
            ? res.json( todo )
            : res.status(404).json({ error: `TODO with ${ id } not found`});
    }

    public createTodo = async(req: Request, res: Response) => {

        const { text } = req.body
        if ( !text ) return res.status(400).json({ error: 'text property is required'})

        const todo = await prisma.todo.create({
            data: { text }
        });

        res.json( todo )

    }

    public updateTodo = (req: Request, res: Response) => {
        
        const id = +req.params.id!;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})

        const todo = todos.find( todo => todo.id === id);
        if( !todo ) return res.status(404).json({ error: `Todo with ${ id } not found`})
        
        const { text, completedAt } = req.body
            
        todo.text = text || todo.text;
        ( completedAt === 'null') 
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt )


        res.json(todo)
        
    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id!;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})

        const todo = todos.find( todo => todo.id === id);
        if( !todo ) return res.status(404).json({ error: `Todo with id: ${ id } not found`})
        
        todos.splice( todos.indexOf(todo), 1)
        res.json(todo)
    }
}
