import {React, useEffect, useState} from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const CreateKendaraan_ = () => {

    const [selected, setSlected] =useState([]);
    const [harga, setHarga] = useState()
    const [tipe_id, setTipeId] = useState();
    const [nomor_plat, setNomorPlat] = useState("");
    const [time_in, setTimein] = useState("");
    const [time_out, setTimeOut] = useState("");
    const [total, setTotal] = useState("");
    
    useEffect( () => {
        axios.get("http://localhost:5000/api/types/")
        .then((response) => {
            // console.log(response);
            setSlected(response.data);
        });
    }, []);

    
    function selectHandler(e) {
        const type = e.target.value;
        setTipeId(type);

        axios.get(`http://localhost:5000/api/types/${type}`)
        .then((response) => {
            const getHarga = response.data[0];
            setHarga(getHarga.harga);
        });
    }

    const timeOutHandler = (e) => {
        const jamKeluar = e.target.value;
        setTimeOut(jamKeluar);

        if(new Date(time_in).getDate() !== new Date(jamKeluar).getDate()) {
            const getTipe = tipe_id;
            if(getTipe === "1") {
                const pricePerhari = 80000;
                const selisihHari = new Date(jamKeluar).getDate() - new Date(time_in).getDate();
                const selisihJam = new Date(jamKeluar).getHours() - new Date(time_in).getHours();
                const totalPrice = (selisihHari * pricePerhari) + ( selisihJam * harga );
                setTotal(totalPrice);
                console.log(totalPrice);
                console.log(nomor_plat);
            }
        }
    }

    const savedTransaksi = async(e)=> {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:5000/api/kendaraans/`, {
                tipe_id,
                nomor_plat,
                time_in,
                time_out,
                total,
            });
            alert("Data berhasil ditambahkan")
        } catch (err) {
            alert(err)
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
                    <Form onSubmit={savedTransaksi}>
                        <div className='d-flex justify-content-center'>
                            <div className='m-3'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipe Kendaraan</Form.Label>
                                    <Form.Select onChange={selectHandler} aria-label="Default select example" name='nama_tipe' id='nama_tipe'>
                                        <option>----- Select Tipe -----</option>
                                        {selected.map(item => (
                                            <option key={item.id} value={item.id}>{item.nama_tipe}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Harga/Jam</Form.Label>
                                    <div className='d-flex justidy-content-center align-items-center'>
                                        <span style={{fontWeight: 'bold', fontSize: '25px'}}>
                                            {harga}
                                        </span>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jam Masuk</Form.Label>
                                    <Form.Control onChange={(e)=>{setTimein(e.target.value)}} type="datetime-local" name='time_in' id='time_in' />
                            </Form.Group>
                            </div>
                            <div className='m-3'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jam Keluar</Form.Label>
                                    <Form.Control type="datetime-local" onChange={timeOutHandler} name='time_out' id='time_out' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>No.Plat</Form.Label>
                                    <Form.Control onChange={(e)=>{setNomorPlat(e.target.value)}} type="text" name='nomor_plat' id='nomor_plat' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control type="number" value={total} name='total' id='total'  readOnly/>
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

export default CreateKendaraan_