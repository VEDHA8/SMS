import mongoose from "mongoose";

const schema = mongoose.Schema;

const UsercommonSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Usercommon = mongoose.model("Usercommon", UsercommonSchema);

export default Usercommon;
