const router = require('express').Router();
const mysql = require('../connection');


//Insert types kendaraan
router.post('/', async(req, res) => {
    const request = req.body;
    const sqlQuery = "INSERT INTO tipe_kendaraan VALUES(?, ?, ?)";
    const values = [
        request.id,
        request.nama_tipe,
        request.harga
    ];

    mysql.query(sqlQuery, values, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//GET ALL TIPE
router.get('/', async(req,res) => {
    const sqlQuery = "SELECT * FROM tipe_kendaraan";
    // const values = req.params.nama_tipe;

    mysql.query(sqlQuery, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//Get type kendaraan by nama_tipe
router.get('/:id', async(req,res) => {
    const sqlQuery = "SELECT * FROM tipe_kendaraan WHERE id=?";
    const values = req.params.id;

    mysql.query(sqlQuery, values, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//Update Type 
// router.put('/:id', async(req, res) => {
//     const sqlQuery = `UPDATE tipe_kendaraan SET nama_tipe=?, harga=? WHERE id='${req.params.id}'`;
//     const values = [
//         req.body.nama_tipe,
//         req.body.harga
//     ];

//     mysql.query(sqlQuery, values, (err, result) => {
//         if(err) {
//             res.status(500).json(err);
//         } else {
//             res.status(200).json(result);
//         }
//     });
// });

module.exports = router;