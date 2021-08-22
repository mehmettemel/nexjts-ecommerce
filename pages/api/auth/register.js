import connectDB from '../../../utils/connectDB'
import bcrypt from 'bcrypt'
import valid from '../../../utils/valid'
import Users from '../../../models/userModel'
connectDB()

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await register(req, res)
      break
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body

    const errMsg = valid(name, email, password, cf_password)
    if (errMsg) return res.status(400).json({ err: errMsg })

    const user = await Users.findOne({
      email,
    })
    if (user)
      return res.status(400).json({ err: 'This email is already exists' })

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      cf_password,
    })

    res.json({ msg: 'Register Success' })
    await newUser.save()
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
