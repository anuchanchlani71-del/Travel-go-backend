// const path = require("path");
// const multer = require("multer");

// // CAB UPLOAD
// const cabstorage = multer.diskStorage({
//  destination:"uploads/cabs",
//  filename:(req,file,cb)=>{
//    cb(
//     null,
//     file.fieldname + "_" + Date.now() +
//     path.extname(file.originalname)
//    )
//  }
// });

// const cabuploads = multer({
//  storage:cabstorage
// });


// // USER UPLOAD
// const userstorage = multer.diskStorage({
//  destination:"uploads/users",
//  filename:(req,file,cb)=>{
//    cb(
//     null,
//     file.fieldname + "_" + Date.now() +
//     path.extname(file.originalname)
//    )
//  }
// });

// const useruploads = multer({
//  storage:userstorage
// });

// module.exports = {
//  cabuploads,
//  useruploads
// };


// //bus upload

// const imagestorage=multer.diskStorage({

//     destination:(req,file,cb)=>{
//         cb(null,"uploads/bus")
//     },

//     filename:(req,file,cb)=>{
//         cb(
//             null,
//             file.fieldname +
//             "_" +
//             Date.now() +
//             path.extname(file.originalname)
//         )
//     }
// })




// module.exports.fileupload=multer({
//     storage:imagestorage
// })








// const destinationStorage = multer.diskStorage({
//   destination: "uploads/destinations",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// const destinationUpload = multer({
//   storage: destinationStorage
// });



// module.exports = {
//   cabuploads,
//   useruploads,
//   fileupload,
//   destinationUpload
// };


const path = require("path");
const multer = require("multer");


// ======================
// 🟢 CAB UPLOAD
// ======================
const cabStorage = multer.diskStorage({
  destination: "uploads/cabs",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const cabuploads = multer({
  storage: cabStorage
});


// ======================
// 🟢 USER UPLOAD
// ======================
const userStorage = multer.diskStorage({
  destination: "uploads/users",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const useruploads = multer({
  storage: userStorage
});


// ======================
// 🟢 BUS / GENERAL UPLOAD
// ======================
const busStorage = multer.diskStorage({
  destination: "uploads/bus",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileupload = multer({
  storage: busStorage
});


// ======================
// 🟢 DESTINATION UPLOAD (SLIDER IMAGES)
// ======================
const destinationStorage = multer.diskStorage({
  destination: "uploads/destinations",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const destinationUpload = multer({
  storage: destinationStorage
});


// ======================
// ✅ SINGLE EXPORT (IMPORTANT)
// ======================
module.exports = {
  cabuploads,
  useruploads,
  fileupload,
  destinationUpload
};