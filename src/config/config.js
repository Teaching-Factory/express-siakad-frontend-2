// src/config/config.js
const PRODUCTION_URL = 'https://jj.id';
const DEVELOPMENT_URL = 'http://localhost:4000';

export const BASE_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL;
export const API_URL = `${BASE_URL}`;
