import {React, useEffect, useState } from 'react'
import { Container, Card, Table, Form, Button,  } from 'react-bootstrap'
import axios from 'axios'

const ContentReport = () => {

    const [kendaraan, setKendaraan] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/kendaraans/")
        .then((response) => {
            // console.log(response.data);
            setKendaraan(response.data);
        })
    }, []);

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Container className='mt-5'>
        <Card>
            <Card.Header className='text-center'>
                <h5>Table Report</h5>
            </Card.Header>
            <Card.Body>
                <div className='mb-2'>
                    <Form className='w-50'>
                        <Form.Group className='d-flex justify-content-center align-items-center'>
                            <Form.Control type='text' name='search' id='search' placeholder='Fitur filternya ga keburu' />
                            <Button className='m-2'>Cari</Button>
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <Table striped bordered hover className='text-center'>
                        <thead style={{backgroundColor:'black', color: 'white'}}>
                            <tr>
                                <th>No</th>
                                <th>Tipe Kendaraan</th>
                                <th>No. Plat</th>
                                <th>Time_In</th>
                                <th>Time_Out</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kendaraan.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nama_tipe}</td>
                                    <td>{item.nomor_plat}</td>
                                    <td>{item.time_in}</td>
                                    <td>{item.time_out}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Card.Link href='/transaksi' className='btn btn-primary'>
                        Transaksi
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
        </Container>
    </div>
  )
}

export default ContentReport