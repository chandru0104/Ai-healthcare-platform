import { kafka } from "../utils/kafka"
import nodemailer from "nodemailer"
import env from "dotenv"

env.config()

const consumer = kafka.consumer({
    groupId: "email-group"
   
})
 console.log("consumer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chandrus0104@gmail.com",
        pass: "cmyj aqef bxlv zfia"
    }
})

const connectConsumer = async () => {

    try {

        await consumer.connect()

        console.log("Consumer Connected")

        await consumer.subscribe({
            topic: "send-mail",
            fromBeginning: true
        })

        await consumer.run({
            eachMessage: async ({ message }) => {
                   console.log(message)
                try {

                    if (!message.value) {
                        throw new Error("Message is null")
                    }

                    const data =JSON.parse(message.value.toString())

                    const { email, otp } = data

                    await transporter.sendMail({
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Your OTP",
                        html: `<h2>OTP: ${otp}</h2>`
                    })

                    console.log(`Email Sent ${email}`)

                } catch (error: any) {
                    console.log(error.message)
                }
            }
        })

    } catch (error: any) {
        console.log(error.message)
    }
}

connectConsumer()   