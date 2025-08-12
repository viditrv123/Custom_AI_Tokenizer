export const validateEncodedRequest = (req, res, next) => {
  const { text } = req.body;

  const keys = Object.keys(req?.body || {});

  if (keys.length === 0 || !text) {
    return res.status(400).json({ error: "Request body missing key: text" });
  }

  if (typeof text !== "string" || text === "") {
    return res.status(400).json({ error: "text must be a non-empty string" });
  }

  if (keys.length > 1) {
    return res
      .status(400)
      .json({ error: "Request body can only have: text as the key" });
  }

  next();
};

export default validateEncodedRequest;
