import { faker } from "@faker-js/faker";
import  jwt  from "jsonwebtoken";

export const generateToken = () => {
    const email = faker.internet.email()
    return jwt.sign({email}, process.env.JWT_SECRET,{
        expiresIn: "5m" //como es un test, podria decir que expire al minuto que seria lo ideal
    })
}
