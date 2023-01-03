import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import validate from "../../util/validation.js";
import User from "../../models/user.js";
import Session from "../../models/session.js";
const { SECRET } = process.env;
export default {
    register: async (_, { info: { first_name, last_name, email, password, confirm_password } }) => {
        const { valid, errors } = await validate.registration({
            first_name,
            last_name,
            email,
            password,
            confirm_password,
        });
        if (!valid)
            throw new GraphQLError("Registration Error", {
                extensions: { code: "BAD_USER_INPUT", errors },
            });
        password = await bcrypt.hash(password, 12);
        const user = await new User({
            first_name,
            last_name,
            email,
            password,
            join_date: new Date().toISOString(),
            sessions: [],
        }).save();
        const token = jwt.sign({ user_id: user._id }, SECRET, {
            noTimestamp: true,
        });
        return {
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                sessions: user.sessions,
            },
        };
    },
    login: async (_, { email, password }) => {
        const { valid, errors, user } = await validate.log_in({
            email,
            password,
        });
        if (!valid)
            throw new GraphQLError("Login Error", {
                extensions: { code: "BAD_USER_INPUT", errors },
            });
        const token = jwt.sign({ user_id: user._id }, SECRET, {
            noTimestamp: true,
        });
        return {
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                sessions: user.sessions,
            },
        };
    },
    delete_user: async (_, { user_id }) => {
        try {
            const user = await User.findByIdAndDelete(user_id);
            user.sessions.forEach(async (session_id) => {
                await Session.findByIdAndDelete(session_id);
            });
            user.sessions = [];
            return {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                sessions: user.sessions,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    },
};
