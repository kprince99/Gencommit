import { GoogleGenerativeAI } from "@google/generative-ai";

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

  getPromptForSingleCommit: (diff, { language }) => {
    //add language tag to the prompt if it was provided
    return (
      `Generate a concise git commit message written in present tense for the following code diff with the given specifications below:',
		  Message language: ${language},
      Needs to be in one line,
		  Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.` +
      "\n\n" +
      diff
    );
  },
};

export default gemini;
