const { promises } = require("dns");
const { init, insertProduct, insertCategory, insertBrand, insertProductVariant, close } = require("./db")
const fs = require('fs');
const path = require('path')

async function main() {
    await init()
    try {
        const fileFolder = './files/';
        const files = fs.readdirSync(fileFolder)
        let counter = 1
        for (let file of files) {
            if (counter == 4) break
            console.log(`Processing ${counter}/${files.length} file...`)
            const filePath = path.join(fileFolder, file)
            const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            for (const category of json.categories) {
                await insertCategory(category)
            }

            for (const brand of json.brands) {
                await insertBrand(brand)
            }

            for (const product of json.products) {
                if (product.productId == product.variantId) await insertProduct(product)
                else await insertProductVariant(product)
            }

            counter++
        }
    }
    catch (e) {
        console.log(`Finished with error: "${e}"`)
    }
    finally {
        close()
    }
}

main()