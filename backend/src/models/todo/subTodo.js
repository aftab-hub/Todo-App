const mongoose = require("mongoose")

const SubTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default : false
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps : ture})



const SubTodo = mongoose.model("SubTodo",SubTodoSchema)

export default SubTodo