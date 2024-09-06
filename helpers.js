import { execSync } from "child_process";
import readline from "node:readline";

const parseArguments = () => {
  const args = process.argv.slice(2);
  const parsedArguments = {};

  for (let index = 0; index < args.length; index++) {
    const currentArg = args[index];
    const key = currentArg.replace(/^--/, "");
    const nextArgument = args[index + 1];

    if (/^--/.test(nextArgument) || nextArgument === undefined) {
      parsedArguments[key] = true;
    } else {
      parsedArguments[key] = nextArgument;
      i++;
    }
  }

  return parsedArguments;
};

const checkGitRepository = () => {
  try {
    const output = execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf-8",
    });
    return output.trim() === "true";
  } catch (err) {
    return false;
  }
};

const getUserPromptFromConsole = async (question) => {
  return new Promise((resolve) => {
    const options = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    options.question(question, (answer) => {
      options.close();
      resolve( answer.toLowerCase());
    });
  });
};

export { parseArguments, checkGitRepository, getUserPromptFromConsole };
