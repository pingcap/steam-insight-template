import pino, { Logger } from "pino";

const logLevelData = {
  "*": "info",
};

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger?: string): string {
  if (!logger) {
    return "info";
  }
  return logLevels.get(logger) || logLevels.get("*") || "info";
}

export function getLogger(name?: string): Logger {
  const logger = pino({ name: name || "*", level: getLogLevel(name) });
  return logger;
}
