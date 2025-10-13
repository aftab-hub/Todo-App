const Todo = require("../models/todoSchema")

const createTodo = async(req, res, next)=>{  
// we are creating a controller to create a todo
try {
    const {title, description, dueDate, dueTime} = req.body;
    const newTodo = new Todo({
      title,
      description,
      dueTime: dueTime || null,
      dueDate: dueDate || null,
      user: req.user.id,
    })

    await newTodo.save();
    return res.status(201).json({
        message : "Todo Created successfully",
        result : newTodo,
       
    })
} catch (err) {
     return res.status(500).json({
        message : err.message,
     })
}
}


const deleteTodo = async(req, res)=>{
    try {
    //    const id = req.params.id;
       const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if(!todo){
            return res.status(404).json({
                message : "Todo not found",
            })
        }

        return res.status(200).json({
            message : "Todo Deleted Successfully",
            result : todo
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


const updateTodo = async(req, res)=>{
    try {
        const id = req.params.id
        const updateValues = {...req.body} // we are taking copy of the todo data from the req.body

    const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: req.user.id }, updateValues, { new: true });

     if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
       return res.json({
        message : "Todo updated successfully",
          result : updatedTodo
       })

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


const getTodos = async(req, res)=>{
    try {
     const todos = await Todo.find({ user: req.user.id });
        return res.status(200).json({
            message : "Todos Fetched",
            result : todos,
            count : todos.length
        }) 
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
    
}

const todoDetails = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }); // query object
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({ todo });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const status = async(req, res) =>{
 try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.status = !todo.status; // toggle
    await todo.save();

    res.json({ success: true, todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 

module.exports = {
    createTodo, 
    deleteTodo,
    updateTodo,
    getTodos,
    todoDetails,
    status
}


