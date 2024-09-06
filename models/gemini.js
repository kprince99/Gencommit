import { GoogleGenerativeAI } from '@google/generative-ai';

const gemini = {
  /**
   * send prompt to ai model.
   */

  generatePrompt: async (input, { apiKey, model }) => {
    console.log("promoting gemini AI...");
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
      throw new Error("Issue with Model. details:" + err);
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
};

export default gemini;
