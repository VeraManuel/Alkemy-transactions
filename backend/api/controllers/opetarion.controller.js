const { Operation, User, Category } = require("../models");

async function create(req, res) {
  const { userId, categoryId, concept, type, amount, dateOperation } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });

    const category = await Category.findOne({ where: { id: categoryId } });

    const operation = await Operation.create({
      userId: user.id,
      categoryId: category.id,
      concept,
      type,
      amount,
      dateOperation,
    });
    console.log(operation);
    return res.json(operation);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = {
  create,
};
