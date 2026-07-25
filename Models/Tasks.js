
import mongoose from 'mongoose';

const taskschema = new mongoose.Schema({

    title:{ type: String , required:true },
    description: String,
    status: {
        type: String,
        enum: [ 'pending', 'progress', 'completed' ],
        default: 'pending'
      },
    dueDate: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default mongoose.model( "Task" , taskschema);