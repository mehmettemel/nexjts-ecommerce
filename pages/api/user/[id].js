import connectDB from '../../../utils/connectDB'
import auth from '../../../middleware/auth'
import Users from '../../../models/userModel'

connectDB()

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      await updateRole(req, res)
      break
    case 'DELETE':
      await deleteUser(req, res)
      break
  }
}

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (result.role !== 'admin' || result.root)
      return res.status(400).json({ err: 'Auth is not valid' })
    const { id } = req.query
    const { role } = req.body
    await Users.findOneAndUpdate({ _id: id }, { role })
    res.json({ msg: 'Update Success' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (result.role !== 'admin' || result.root)
      return res.status(400).json({ err: 'Auth is not valid' })
    const { id } = req.query
    await Users.findByIdAndDelete(id)
    res.json({ msg: 'User deleted successfully' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
