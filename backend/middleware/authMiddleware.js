

import dotenv from 'dotenv'
dotenv.config();

import jsonwebtoken from 'jsonwebtoken'
import { getUserById } from "../services/user.js"

const jwt = jsonwebtoken;

export const protect = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token
            let token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //get user from token
            let authorizedUser = await getUserById(decoded)
            req.user = authorizedUser
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            res.json({'error': 'Not authorized'})
        }
    } else {
        res.status(401)
        res.json({'error': 'Not authorized'})
    }
}

export const protectAdmin = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token
            let token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //get user from token
            let authorizedUser = await getUserById(decoded)
            req.user = authorizedUser
            if (req.user.is_admin == 0) {
                throw new Error("Not authorized")
              }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            res.json({'error': 'Not authorized'})
        }
    } else {
        res.status(401)
        res.json({'error': 'Not authorized'})
    }
}
