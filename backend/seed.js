const pool = require("./db");
const seedDatabase = async () => {
    try {
        console.log("Memulai proses seeding database...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                category_id INT REFERENCES categories(id) ON DELETE SET NULL,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                price DECIMAL(12, 2) NOT NULL,
                image_url TEXT
            );
        `);

        await pool.query(
            `TRUNCATE TABLE products, categories RESTART IDENTITY CASCADE`,
        );

        await pool.query(`
            INSERT INTO categories (name, description) VALUES
            ('Sepatu', 'Koleksi sepatu sneakers'),
            ('Pakaian', 'Kemeja dan kaos pria');
        `);

        await pool.query(`
            INSERT INTO products (category_id, name, slug, price,image_url) VALUES
            (1, 'Sepatu Sneakers Putih', 'sepatu-sneakers-putih',250000, 'sepatu.jpg'),
            (2, 'Kemeja Flannel Kotak', 'kemeja-flannel-kotak',180000, 'kemeja.jpg');
        `);

        console.log("Seeding selesai! Tabel dan Data Dummy berhasil dibuat.");
    } catch (err) {
        console.error("Error saat seeding:", err);
    } finally {
        pool.end();
    }
};

seedDatabase();
