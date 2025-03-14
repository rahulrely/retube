import mongoose, { Model ,Document,Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


interface IVideo extends Document {
    uploader : Object;
    approver :Object;
    title :string;
    description : string;
    tags: [];
    filePath:string;
    duration:Number;
    youtubeVideoId:string;
    status : string;
    approvedAt:Date;
}

const videoSchema = new mongoose.Schema<IVideo>({
    uploader: { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, // Secondary User
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, // Primary User (Null until approved)
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String
    },
    tags: [{
        type: String
    }], // Array of tags
    filePath: {
        type: String, required: true
    }, // Local storage before approval
    duration:{
        type:Number
    },
    youtubeVideoId: {
        type: String
    }, // YouTube Video ID after approval
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending" },
    approvedAt: {
        type: Date
    }
  },{
    timestamps:true
});

videoSchema.plugin(mongooseAggregatePaginate);

const Video :Model<IVideo>= mongoose.models.video || mongoose.model<IVideo>("videos",videoSchema);

export default Video;