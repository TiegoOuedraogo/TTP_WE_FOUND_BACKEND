const express= require ('express');
const Product =require ('../api/productsModels');

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found.' });
        }
    }
    catch(error) {
        return res.status(500).json(error.message);
    }
});

router.post('/:id/reviews', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: 'Review is successfully saved thank you for your time.',
        });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category||"";
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res
                .status(200)
                .send(updatedProduct);
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send(deletedProduct);
    } else {
        res.send('Error in Deletion.');
    }
});

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category||"",
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews || "0",
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res
            .status(201)
            .send(newProduct);
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
});