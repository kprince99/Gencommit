# Gen-Commit
Tired of Writing bad commit messages. Here Gen-Commit will help you!

## About

This is a simple command line tool that uses [Gemini's API](https://github.com/google/generative-ai) to generate commit messages for you. It will generate a commit message based on the diff of your current branch.

## Usage

You can use this tool by running the following command in your terminal:

1. Clone this repository
2. Generate a GEMINI API key [here](https://aistudio.google.com/app/apikey )	
3. In the repository, run `npm i && sudo npm link -g` for Linux and `npm link` for Windows to link this application globally
4. Set your `GEMINI_API_KEY` environment variable to your API key	
5. Make your code changes and stage them with `git add .`	
6. Type `gencommit` in your terminal	
7. Gen-Commit will analyze your changes and generate a commit message.
8. Approve the commit message and Gen-Commit will create the commit for you ✅

# Things to add.
- [] Git hook integration: To enable Gen-Commit to automatically produce commit messages whenever changes are staged.

