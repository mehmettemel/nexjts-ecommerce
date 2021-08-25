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
    case 'GET':
      await getUsers(req, res)
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
const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Authentication is not valid' })
    const users = await Users.find().select('-password')
    res.json({ users })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
