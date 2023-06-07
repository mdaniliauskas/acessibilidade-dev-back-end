const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generate = async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      }
    });
    return;
  }

  const text = req.body.text || '';
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid text",
      }
    });
    return;
  }

  try {
    let completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: validatePrompt(text),
      temperature: 0.6,
      max_tokens: 4,
    });
    if (completion.data.choices[0].text.toUpperCase().includes("SIM")) {
      completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 256,
      });
    } else if (completion.data.choices[0].text.toUpperCase().includes("NÃO")) {
      res.status(400).json({
        error: {
          message: "Está dúvida não é sobre acessibilidade digital!",
        }
      });
      return;
    }
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
function validatePrompt(text) {
  return `Essa dúvida é sobre acessibilidade digital, responda com sim ou não: "${text}"`;
}

function generatePrompt(text) {
  return `Dê uma solução para essa duvída sobre acessibilidade digital: ${text}`;
}
