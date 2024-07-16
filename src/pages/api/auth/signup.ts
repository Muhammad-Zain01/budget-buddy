import { NextApiRequest, NextApiResponse } from "next";
import { HashPassword } from "@/lib/auth";
import prisma from "@/lib/db";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const { name, username, email, password } = data

    if (name.trim() == "" || username.trim() == "" || email.trim() == "" || password.trim() == "") {
        return res.status(400).json({ status: 0, message: 'All fields are required' })
    }

    const result = await prisma.user.findFirst({
        where: {
            OR: [{ username: username }, { email: email }]
        },
        select: { id: true, username: true, email: true, password: true }
    })

    if (result) {
        return res.status(401).json({ status: 0, message: 'User Already Registered' })
    }

    const hashedPassword = await HashPassword(password)
    const userData = { name, username, email, password: hashedPassword }
    const user = await prisma.user.create({
        data: userData
    })
    if (user) {
        return res.status(200).json({ status: 1, message: 'User Created Successfully' })
    }
    res.status(500).json({ status: 0, message: 'Something went wrong' })
}

export default handler