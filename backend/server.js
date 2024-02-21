import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import passport from 'passport';
import session from 'express-session';

import userRouter from './roures/user.routes.js';
import exploreRouter from './roures/explore.routes.js';
import authRouter from './roures/auth.routes.js';

import './passport/auth.github.js';

import { connectMongoDB } from './db/connectMongoDb.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(__dirname + '/public'));

app.use('/api/user', userRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/auth', authRouter);

app.listen(5000, () => {
    connectMongoDB();
    console.log('App is running on the port : 5000')
})