const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://localhost:27017";
const dbName = "Poizon";

let db;
let mongoClient;

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then(
        (client) => {
            mongoClient = client
            db = client.db(dbName);
        }
    );

const insertProduct = async (product) => {
    const collection = db.collection("Products");
    const exists = Boolean(
        await collection.findOne({ productId: product.productId })
    );
    if (!exists) await collection.insertOne(product);
};

const insertProductVariant = async (product) => {
    const collection = db.collection("ProductVariants");
    const exists = Boolean(
        await collection.findOne({ variantId: product.variantId })
    );
    if (!exists) await collection.insertOne(product);
};

const insertCategory = async (category) => {
    const collection = db.collection("Categories");
    const exists = Boolean(
        await collection.findOne({ id: category.id })
    );
    if (!exists) await collection.insertOne(category);
};

const insertBrand = async (brand) => {
    const collection = db.collection("Brands");
    const exists = Boolean(await collection.findOne({ id: brand.id }));
    if (!exists) await collection.insertOne(brand);
};

const close = () => {
    mongoClient.close()
}

module.exports = { init, insertProduct, insertCategory, insertBrand, insertProductVariant, close };
