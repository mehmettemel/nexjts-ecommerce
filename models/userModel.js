import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dv4i7j6jq/image/upload/v1629289348/avatar-royalty-free-png-favpng-6920SU0BFdaEZTMCMSsrTTPws_ccsbki.jpg',
    },
  },
  {
    timestamps: true,
  }
)

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)

export default Dataset
