// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from 'next'
const { Configuration, OpenAIApi } = require("openai");

export default async function handler(
  req,
  res
) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:\n\n${req.body.text}.`, // res.body.text
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response);
    res.status(200).json({ suggestion: response.data.choices[0].text })
  }
  catch(e) {
    console.log(e);
  }
}


// import { createApi } from "openai";

// const openai = createApi(process.env.OPENAI_API_KEY);

// export default async function handler(req, res) {
//   const { data } = await openai.grammarCorrection({
//     text: req.body.text,
//   });
//   res.status(200).json({ data });
// }


// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Correct this to standard English:\n\nShe no went to the market.",
//   temperature: 0,
//   max_tokens: 60,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });

// // Check grammar and provide suggestions
// //async function checkGrammar(text) {
// //   const response = await openai.createCompletion({
// //     engine: 'text-davinci-002',
// //     prompt: `Please correct the grammar of the following text:\n"${text}"\n\nSuggested corrections:`,
// //     max_tokens: 60,
// //     n: 1,
// //     stop: '\n',
// //     temperature: 0.5,
// //   });

// //   if (response.choices && response.choices.length > 0) {
// //     const suggestion = response.choices[0].text.trim();
// //     return suggestion;
// //   } else {
// //     return 'Unable to check grammar at this time. Please try again later.';
// //   }
// // }
