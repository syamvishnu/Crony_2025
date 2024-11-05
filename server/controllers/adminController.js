const getUser = (req, res) => {
  try {
    res.status(200).json({ Message: "Ok" });
  } catch (error) {}
};

export { getUser };
