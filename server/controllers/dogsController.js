const Dog = require("../models/Dog");

async function index(req, res) {
    try {
        const dogs = await Dog.getAll();
        res.status(200).json({ data: dogs });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

async function show(req, res) {
    try {
        const id = req.params.id;
        const dog = await Dog.show(parseInt(id));
        res.status(200).json({ data: dog });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newDog = await Dog.create(data);
        res.status(201).json({ data: newDog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const dog = await Dog.show(parseInt(id));
        const updateDog = await dog.update(data);
        res.status(200).json({ data: updateDog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const dog = await Dog.show(parseInt(id));
        await dog.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}