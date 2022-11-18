import { React, useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { redirect } from 'react-router-dom';

const CreateKendaraan =  () => {

    const [types, setTypes] = useState([]);
    const [harga, setHarga] = useState([]);
    const [timeIn, setTimein] = useState([]);
    const [totalHarga, setTotalHarga] = useState([]);

    const [nama_tipe, setNameType] = useState("");
    const [nomor_plat, setNomorPlat] = useState("");
    const [time_in, setInTime] = useState("");
    const [time_out, setOutTime] = useState("");
    const [total, setTotal] = useState("");

    function handleTimeIn(e) {
        const time = new Date(e.target.value);
        setInTime(time);
        // console.log(time.getDate());
        setTimein(time);
    }

    function handleTimeOut(e) {
        const hargaPerjam = harga.map(item =>(
            item.harga
        ));
        const typeKendaraan = harga.map(item => (
            item.nama_tipe
        ));
        // console.log(typeKendaraan[0]);
        const timeOut = new Date(e.target.value);
        setOutTime(timeOut);
        if(new Date(timeIn).getDate() < new Date(timeOut).getDate()) {
            if(typeKendaraan[0] === 'mobil') {
                const priceDate = 80000;
                const selisihWaktuHari = new Date(timeOut).getDate() - new Date(timeIn).getDate();
                const selisihWaktuJam = new Date(timeOut).getHours() - new Date(timeIn).getHours();
                // console.log(selisihWaktuHari);
                const pricehari = selisihWaktuHari * priceDate;
                const pricejam = selisihWaktuJam * hargaPerjam[0];
                const totalPrice = pricehari + pricejam;
                setTotalHarga(totalPrice);
                setTotal(totalPrice);
                // const pushTotal = total.map(item=> (item))
                // console.log(total);
            } else if(typeKendaraan[0] === 'motor') {
                const priceDate = 40000;
                const selisihWaktuHari = new Date(timeOut).getDate() - new Date(timeIn).getDate();
                const selisihWaktuJam = new Date(timeOut).getHours() - new Date(timeIn).getHours();
                const pricehari = selisihWaktuHari * priceDate;
                const pricejam = selisihWaktuJam * hargaPerjam[0];
                const totalPrice = pricehari + pricejam;
                setTotalHarga(totalPrice);
                setTotal(totalPrice);
            }
        };

    }

    useEffect( () => {
        axios.get("http://localhost:5000/api/types/")
        .then((response) => {
            console.log(response);
            setTypes(response.data);
        });
    }, []);

    function handleChange(e) {
        const type = e.target.value;
        setNameType(type);
        // console.log(type);
        axios.get(`http://localhost:5000/api/types/${type}`)
        .then((response) => {
            setHarga(response.data);
        });
    }

    const insertKendaraan = async(e) => {
        e.preventDefault()

        try {
            await axios.post(`http://localhost:5000/api/kendaraans/`, {
                nama_tipe,
                nomor_plat,
                time_in,
                time_out,
                total,
            });
            return redirect('/report');
        } catch (err) {
            alert(err);
        }
    }
    
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Card style={{width: '600px'}} className='mt-5'>
            <Card.Header className='text-center'>
                Add Transaksi
            </Card.Header>
            <Card.Body>
                <div>
                    <Form onSubmit={insertKendaraan}>
                        <div className='d-flex justify-content-center'>
                            <div className='m-3'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipe Kendaraan</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={handleChange} name='nama_tipe' id='nama_tipe'>
                                        <option>----- Select Tipe -----</option>
                                        {types.map(item => (
                                            <option key={item.id} value={item.nama_tipe}>{item.nama_tipe}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>No.Plat</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setNomorPlat(e.target.value)} name='nomor_plat' id='nomor_plat' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jam Masuk</Form.Label>
                                    <Form.Control type="datetime-local" onChange={handleTimeIn} name='time_in' id='time_in' />
                            </Form.Group>
                            </div>
                            <div className='m-3'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jam Keluar</Form.Label>
                                    <Form.Control type="datetime-local" onChange={handleTimeOut} name='time_out' id='time_out' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Harga/Jam</Form.Label>
                                    {harga.map(item => (
                                        <div key={item.id} className='d-flex justidy-content-center align-items-center'>
                                            {/* <Form.Control type='number' name='harga' id='harga' value={item.harga}></Form.Control> */}
                                            <span style={{fontWeight: 'bold', fontSize: '25px'}}>
                                                {item.harga}
                                            </span>
                                        </div>
                                    ))}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control type="number" name='total' id='total' value={totalHarga} readOnly/>
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='mt-3'>
                    <Card.Link className='btn btn-primary' href='/report'>
                        Cancel
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CreateKendaraan