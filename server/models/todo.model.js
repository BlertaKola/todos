const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    name: { type: String,
    required: [
        true,
        "Name is required"
    ]
    },
    dueDate: { type: Date,
    required: [true, "Due date is required"],
    min: [new Date(), "Due date must be in the future dummy"]
    },
    state: {type: String,
    default: "To DO"
    }
}, { timestamps: true });
module.exports = mongoose.model('Todo', TodoSchema);

