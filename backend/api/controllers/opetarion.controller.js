const { Operation, User, Category } = require("../models");
const { getPagination, getPaginationData } = require("../helpers/pagination");

async function create(req, res) {
  const { categoryId, concept, type, amount, dateOperation } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });

    const category = await Category.findOne({ where: { id: categoryId } });

    const operation = await Operation.create({
      userId: req.userId,
      categoryId: category.id,
      concept,
      type,
      amount,
      dateOperation,
    });
    return res.json(operation);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
}

async function getOperations(req, res) {
  const { page, size } = req.query;
  const userId = req.userId;

  const { limit, offset } = getPagination(page, size);

  await Operation.findAndCountAll({
    where: { userId },
    limit,
    offset,
  })
    .then((data) => {
      const response = getPaginationData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operations.",
      });
    });
}

async function getTotals(req, res) {
  const userId = req.userId;
  const totalSpends = {
    income: 0,
    outcome: 0,
  };

  try {
    const allOperations = await Operation.findAll({ where: { userId } });

    allOperations.forEach((operation) => {
      totalSpends[operation.type] += parseInt(operation.amount, 10);
    });

    return res.status(200).json({
      money: {
        ...totalSpends,
        rest: totalSpends.income - totalSpends.outcome,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
}

async function updateOperation(req, res) {
  const id = req.params.id;
  const { categoryId, concept, amount, dateOperation } = req.body;

  try {
    const operation = await Operation.findOne({ where: { id } });

    operation.categoryId = categoryId;
    operation.concept = concept;
    operation.amount = amount;
    operation.dateOperation = dateOperation;

    await operation.save();

    return res.json(operation);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
}

async function getOperation(req, res) {
  const id = req.params.id;
  const { categoryId, concept, amount, dateOperation } = req.body;

  try {
    const operation = await Operation.findOne({ where: { id } });

    return res.json(operation);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
}

async function deleteOperation(req, res) {
  const id = req.params.id;
  try {
    const operation = await Operation.findOne({ where: { id } });

    await operation.destroy();

    return res.status(200).send({ message: "Operation deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
}

async function getByType(req, res) {
  const { type } = req.body;
  try {
    const operations = await Operation.findAll({
      where: { type },
    });

    return res.status(200).json(operations);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  create,
  getOperations,
  updateOperation,
  deleteOperation,
  getByType,
  getTotals,
  getOperation,
};
