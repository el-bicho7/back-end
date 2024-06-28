const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    // find all the categories, including the product
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value including Product
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryId) {
      res.status(404).json({ message: "No category found" })
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    
    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found to edit.' });
      return;
    }

    res.status(200).json({ message: 'Category edited.' });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCateg = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedCateg) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    res.status(200).json(deletedCateg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
