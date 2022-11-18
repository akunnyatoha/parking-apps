const router = require('express').Router();
const mysql = require('../connection');


//Insert Kendaraan
router.post('/', async(req, res) => {
    const request = req.body;
    const sqlQuery = "INSERT INTO kendaraan VALUES(?, ?, ?, ?, ?, ?)";
    const values = [
        request.id,
        request.tipe_id,
        request.nomor_plat,
        request.time_in,
        request.time_out,
        request.total,
    ];
    mysql.query(sqlQuery, values, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });

    // mysql.query(sqlQuery, values, (err, result) => {
    //     if(err) {
    //         res.status(500).json(err);
    //     } else {
    //         res.status(200).json(result);
    //     }
    // });
});


//GET ALL KENDARAAN
router.get('/', async(req, res) => {
    const sqlQuery = "SELECT kendaraan.id, tipe_kendaraan.nama_tipe, kendaraan.nomor_plat, kendaraan.time_in, kendaraan.time_out, kendaraan.total FROM tipe_kendaraan INNER JOIN kendaraan ON tipe_kendaraan.id = kendaraan.tipe_id"

    mysql.query(sqlQuery, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//GET TIPE BY FILTER
router.get('/tipeKendaraan', async(req, res) => {
    const sqlQuery = `SELECT tipe_kendaraan.nama_tipe, tipe_kendaraan.harga FROM tipe_kendaraan WHERE nama_tipe = '${req.query.nama_tipe}'`;

    mysql.query(sqlQuery, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//GET KENDARAAN BY TYPE
router.get('/:nama_tipe', async(req, res) => {
    const sqlQuery = `SELECT tipe_kendaraan.nama_tipe, kendaraan.nomor_plat, kendaraan.time_in, kendaraan.time_out, kendaraan.total FROM tipe_kendaraan INNER JOIN kendaraan ON tipe_kendaraan.id = kendaraan.tipe_id AND tipe_kendaraan.nama_tipe = '${req.params.nama_tipe}'`;

    mysql.query(sqlQuery, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});


module.exports = router;