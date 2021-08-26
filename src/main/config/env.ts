export default {
  mongoUrl: 'mongodb://127.0.0.1:27017/clean-node-api' || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
