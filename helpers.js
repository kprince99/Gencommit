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

async function getStagedDiff(excludeFiles = false) {
  const excludeFromDiff = (path) => `:!${path}`;

  const filesToExclude = ["package-lock.json", "*.lock"].map(
    excludeFromDiff
  );

  const command = "git diff --cached --diff-algorithm=minimal";
  const gitCommand = command + ' --name-only -- ' + `'${filesToExclude}'`+ (excludeFiles ? excludeFiles.map(excludeFromDiff) : []);
  try {
    // Execute the git command synchronously
    const files = execSync(gitCommand).toString().trim();
    if (!files) {
      return;
    }

    const diffCommand = command + ' ' +  `'${filesToExclude}'` + (excludeFiles ? excludeFiles.map(excludeFromDiff) : [])

    const diff = execSync(diffCommand).toString();
    return {
      files: files.split("\n"),
      diff,
    };
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
}

const getUserPromptFromConsole = async (question) => {
  return new Promise((resolve) => {
    const options = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    options.question(question, (answer) => {
      options.close();
      resolve( answer.toLowerCase().trim());
    });
  });
};

export { parseArguments, checkGitRepository, getUserPromptFromConsole, getStagedDiff };
