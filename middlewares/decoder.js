export const validateDecoderRequest = (req, res, next) => {
  const { encodedValues } = req.body;

  const keys = Object.keys(req?.body || {});

  if (keys.length === 0 || !encodedValues) {
    return res
      .status(400)
      .json({ error: "Request body missing key: encodedValues" });
  }

  if (!Array.isArray(encodedValues) || encodedValues.length === 0) {
    return res
      .status(400)
      .json({ error: "encodedValues must be a non-empty array" });
  }

  if (keys.length > 1) {
    return res
      .status(400)
      .json({ error: "Request body can only have: encodedValues as the key" });
  }

  next();
};

export default validateDecoderRequest;
