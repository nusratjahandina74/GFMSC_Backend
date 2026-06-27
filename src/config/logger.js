const formatMessage = (
  level,
  message,
  meta = undefined
) => {
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    level,
    message,
    ...(meta ? { meta } : {}),
  };
};

export const logger = {
  info(message, meta) {
    console.log(
      JSON.stringify(
        formatMessage("info", message, meta)
      )
    );
  },
  warn(message, meta) {
    console.warn(
      JSON.stringify(
        formatMessage("warn", message, meta)
      )
    );
  },
  error(message, meta) {
    console.error(
      JSON.stringify(
        formatMessage("error", message, meta)
      )
    );
  },
};

export default logger;
