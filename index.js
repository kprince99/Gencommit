#!/usr/bin/env node

"use strict";

import { execSync } from "child_process";
import { checkGitRepository, getUserPromptFromConsole } from "./helpers.js";
import gemini from "./models/gemini.js";
import { AI_PROVIDER, MODEL, args } from "./config.js";

const language = args.language || process.env.AI_COMMIT_LANGUAGE || "english";
const apiKey = args.apiKey || process.env.API_KEY;

if (AI_PROVIDER == "gemini" && !apiKey) {
  console.error("Please set the Gemini_API KEY in the environment variable.");
  process.exit(1);
}

const commitType = args["commit-type"];
const provider = gemini;

const makeCommit = (input) => {
  console.log("Committing Message... 🚀 ");
  execSync(`git commit -F -`, { input });
  console.log("Commit Successful! 🎉");
};

const getPromptForSingleCommit = (diff) => {
  return provider.getPromptForSingleCommit(diff, { commitType, language });
};

const generateSingleCommit = async (diff) => {
  const prompt = getPromptForSingleCommit(diff);
  // console.log(prompt);
  console.log("Generating commit message... 🤖");

  if (!(await provider.filterApi({ prompt, filterFee: args["filter-fee"] }))) {
    process.exit(1);
  }

  const text = await provider.sendMessage(prompt, { apiKey, model: MODEL });

  if (!text) {
    console.log("Sorry, I can't generate a commit message. 😔");
    process.exit(1);
  }

  console.log(
    `Here is yout Commit Message: \n -------------------------------------\n
    ${text}
    \n---------------------------------------`
  );

    const answer = await getUserPromptFromConsole("Do you want to push this commit? [y/n] ");
    console.log(answer);
    if (answer === "n" ) {
      console.log("Commit aborted by user.");
      process.exit(1);
    } 

    makeCommit(text);
};

async function generateAICommit() {
  const isGitRepository = checkGitRepository();

  if (!isGitRepository) {
    console.error("This is not a git repository.");
    process.exit(1);
  }

  const diff = execSync("git diff --staged").toString();

  if (!diff) {
    console.log("No changes to commit 🙅");
    console.log(
      "May be you forgot to add the files? Try git add . and then run this script again."
    );
    process.exit(1);
  }

  await generateSingleCommit(diff);
}

await generateAICommit();
