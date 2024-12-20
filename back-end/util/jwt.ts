import jwt from 'jsonwebtoken'
import { JWTload } from '../types/types';



const generateJwtToken = ({ email, role }: JWTload): string => {
    const options = {expiresIn: "8h", issuer: 'shitty_app'}

    try {
        return jwt.sign({ email, role }, `${process.env.JWT_SECRET}`  , options);
    } catch (err) {
        console.error(err);
        throw new Error('Error generating token');
    }
 }


const decodeJwtToken = (token: string): JWTload  => {
    try {
        return jwt.verify(token, `${process.env.JWT_SECRET}`) as JWTload;
    } catch (err) {
        console.error(err);
        throw new Error('Error decoding token');
    }
}

 export { generateJwtToken, decodeJwtToken };