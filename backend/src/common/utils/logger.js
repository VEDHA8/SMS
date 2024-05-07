import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: `SYS:dd-mm-yyyy, hh:MM:ss`,
      ignore: "pid,hostname",
    },
  },
});


export default logger;
