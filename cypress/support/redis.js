// const Redis = require("ioredis");
// const redis = new Redis({
//   // url: "redis://13.233.178.148:6379", // Replace with your Redis host
//   // password: "Ship#Phoenix-0112", // Uncomment if your Redis server requires a password

//   host: "redis://3.233.17.148", // Replace with your Redis host
//   port: 6379, // Replace with your Redis port
//   password: "Ship#-0112",
// });

// async function RedisConnect() {
//   try {
//     await redis.connect();
//     console.log("Redis Connected");
//   } catch (err) {
//     redis.on("error", (err) => console.error(err));
//     console.log(err.message);
//   }
// }
// RedisConnect();

// redis.on("ready", () => {
//   console.log("Connected to Redis successfully");
// });

// async function setValue(key, value) {
//   try {
//     await redis.set(key, value);
//     console.log(`Key set successfully: ${key} = ${value}`);
//   } catch (error) {
//     console.error("Error setting value in Redis:", error);
//   }
// }

// export async function getValue(key) {
//   try {
//     const value = await redis.get(key);
//     console.log(`Value retrieved successfully: ${key} = ${value}`);
//     return value;
//   } catch (error) {
//     console.error("Error getting value from Redis:", error);
//     return null; // Return null in case of error
//   }
// }

//module.exports = { setValue, getValue };
