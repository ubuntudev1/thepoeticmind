exports.getApprovedPoems = async (req, res) => {
  const poems = await Poem.find({ status: 'approved' }).sort({ vettedAt: -1 });
  res.render("publicPoems", { poems });
};
