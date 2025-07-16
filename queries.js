// 🔸 Task 2: Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 11.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// 🔸 Task 3: Advanced Queries

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Use projection: return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort by price (ascending)
db.books.find().sort({ price: 1 })

// Sort by price (descending)
db.books.find().sort({ price: -1 })

// Pagination: first page (limit 5)
db.books.find().limit(5)

// Pagination: second page (skip 5, limit 5)
db.books.find().skip(5).limit(5)

// 🔸 Task 4: Aggregation Pipelines

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: { $subtract: [ { $divide: [ "$published_year", 10 ] }, { $mod: [ { $divide: [ "$published_year", 10 ] }, 1 ] } ] }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.decade": 1 } }
])

// 🔸 Task 5: Indexing

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Explain query performance with index
db.books.find({ author: "George Orwell" }).explain("executionStats")
