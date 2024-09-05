import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = {
  /**
   * send prompt to ai model.
   */

  sendMessage: async (input, { apiKey, model }) => {
    console.log("promoting gemini AI...");

    console.log("prompting", model);
    //send prompt to Gemini API
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const aiModel = genAI.getGenerativeModel({ model: model });
      const response = await aiModel.generateContent(input);
      const answer = response.response.text();
      // console.log("response: ", answer);
      console.log("prompting ai done!");
      
      return answer;
    } catch (err) {
      console.log(err);
      throw new Error("local model issues. details:" + err.message);
    }
  },

  getPromptForSingleCommit: (diff, {commitType, language }) => {
    //add language tag to the prompt if it was provided
    return (
      "I want you to act as the author of a commit message in git." +
      `I'll enter a git diff, and your job is to convert it into a useful commit message in ${language} language` +
      (commitType ? ` with commit type '${commitType}'. ` : ". ") +
      "Do not preface the commit with anything, use the present tense, return the full sentence, and use the conventional commits specification (<type in lowercase>: <subject>): " +
      '\n\n'+
      diff
    );
  },


  /**
   * @param {string} diff
   * @param {{ commitType: string, numOptions: number, language: string }} options
   * @returns {string}
   */
  getPromptForMultipleCommits: (diff, { commitType, numOptions, language: languageTag }) => {
    const commitTypeSuffix = commitType ? ` with commit type '${commitType}.'` : "";
    const languageSuffix = languageTag ? ` in ${languageTag}` : "";
    const numOptionsSuffix = ` and make ${numOptions} options that are separated by ";".`;

    return (
      "I want you to act as the author of a commit message in git." +
      `I'll enter a git diff, and your job is to convert it into a useful commit message ${languageSuffix} ${commitTypeSuffix} ${numOptionsSuffix}` +
      "For each option, use the present tense, return the full sentence, and use the conventional commits specification (<type in lowercase>: <subject>):" +
      diff
    );
  },



  filterApi: ({ prompt, numCompletion = 1, filterFee }) => {
    //ollama dont have any limits and is free so we dont need to filter anything
    return true;
  },
};

export default gemini;
