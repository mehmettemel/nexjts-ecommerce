import connectDB from '../../../utils/connectDB'
import auth from '../../../middleware/auth'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'

connectDB()

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      await uploadInformation(req, res)
      break
  }
}

const uploadInformation = async (req, res) => {
  try {
    const result = await auth(req, res)
    const { name, avatar } = req.body

    const newUser = await Users.findOneAndUpdate(
      {
        _id: result.id,
      },
      { name, avatar }
    )
    res.json({
      msg: 'Update Success!',
      user: {
        name,
        avatar,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
