// const fs = require('fs');
// const csv = require('csv-parser');
// const mongoose = require('mongoose');
// const Recipe = require('./models/Recipes');
// require('dotenv').config();
// const cliProgress = require('cli-progress');
// const path = require('path');

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipes';

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch((err) => {
//   console.error('❌ MongoDB connection error:', err.message);
//   process.exit(1);
// });

// const FILE_PATH = './full_dataset.csv'; // Adjust as needed
// const BATCH_SIZE = 1000;
// let batch = [];
// let totalRows = 0;

// // Setup progress bar
// const progressBar = new cliProgress.SingleBar({
//   format: 'Progress [{bar}] {percentage}% | Rows: {value}/{total}',
//   barCompleteChar: '\u2588',
//   barIncompleteChar: '\u2591',
//   hideCursor: true,
// }, cliProgress.Presets.shades_classic);

// // Helper to parse fields safely into arrays
// const parseList = (value) => {
//   if (!value) return [];
//   try {
//     return JSON.parse(value);
//   } catch (err) {
//     return value.split(/[|;,\n]/).map(s => s.trim()).filter(Boolean);
//   }
// };

// // Step 1: Count total rows first (needed for progress bar)
// fs.createReadStream(FILE_PATH)
//   .pipe(csv())
//   .on('data', () => totalRows++)
//   .on('end', () => {
//     // Step 2: Begin actual import
//     progressBar.start(totalRows, 0);

//     fs.createReadStream(FILE_PATH)
//       .pipe(csv())
//       .on('data', async function (row) {
//         batch.push({
//           title: row.title,
//           ingredients: parseList(row.ingredients),
//           directions: parseList(row.directions),
//           link: row.link,
//           source: row.source,
//           NER: parseList(row.NER),
//         });

//         if (batch.length >= BATCH_SIZE) {
//           this.pause();
//           try {
//             await Recipe.insertMany(batch, { ordered: false });
//           } catch (error) {
//             console.error('⚠️ Insert error:', error.message);
//           }
//           progressBar.increment(batch.length);
//           batch = [];
//           this.resume();
//         }
//       })
//       .on('end', async () => {
//         if (batch.length) {
//           try {
//             await Recipe.insertMany(batch, { ordered: false });
//             progressBar.increment(batch.length);
//           } catch (error) {
//             console.error('⚠️ Final batch insert error:', error.message);
//           }
//         }

//         progressBar.stop();
//         console.log('🎉 Import completed');
//         mongoose.disconnect();
//       });
//   });
// // This script imports a CSV file into a MongoDB collection.
// // It uses the csv-parser library to read the CSV file, mongoose for MongoDB operations,
// // and cli-progress for a progress bar during the import process.


// // Run this code with node importCSV.js
// // This is used for importing data from a CSV file into MongoDB.
// // It reads a CSV file, processes each row, and inserts the data into a MongoDB collection.
// // The code includes error handling, progress tracking, and batch processing for efficiency.
// // Do not delete this code as it is essential for importing the dataset into the database.
// // Run it again only if data base recipes collection is empty or you want to re-import the data.
// // Make sure to adjust the FILE_PATH and MONGO_URI as needed in your environment.