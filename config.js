import * as dotenv from 'dotenv';
import { parseArguments } from './helpers.js';

dotenv.config();

export const args = parseArguments();
export const AI_PROVIDER = args.PROVIDER || process.env.PROVIDER || 'gemini'
export const MODEL = args.MODEL || process.env.MODEL || 'gemini-1.5-flash';