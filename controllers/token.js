import TokenManager from "../managers/token.js";

const encoder = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await TokenManager.encoder({ text });
    return res.status(200).send({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const decoder = async (req, res) => {
  try {
    const { encodedValues } = req.body;
    const result = await TokenManager.decoder({ encodedValues });
    return res.status(200).send({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const TokenController = {
  encoder,
  decoder,
};

export default TokenController;
