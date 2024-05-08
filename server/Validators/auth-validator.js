const { z } = require("zod");

// creating an object schema for validation
const logInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at lest 3 chars." })
    .max(255, { message: "Email must not be more than 255 chars." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at lest 7 chars." })
    .max(1024, { message: "Password must not be more than 1024 chars." }),
});

const signupSchema = logInSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at lest 3 chars." })
    .max(255, { message: "Name must not be more than 255 chars." }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at lest 10 chars." })
    .max(20, { message: "Phone must not be more than 20 chars." }),
});

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at lest 3 chars." })
    .max(255, { message: "Name must not be more than 255 chars." }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at lest 3 chars." })
    .max(255, { message: "Email must not be more than 255 chars." }),

  message: z.string({ required_error: "Message is required" }).trim(),
});

module.exports = { signupSchema, logInSchema, contactSchema };
