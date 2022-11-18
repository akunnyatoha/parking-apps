import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { Card,Container,Table } from 'react-bootstrap'
import { tipeKendaraan } from '../data'

const Content = () => {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/types/")
        .then((response) => {
            // console.log(response.data);
            setTypes(response.data);
        });
    }, []);

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Container className='mt-5'>
        <Card>
            <Card.Header className='text-center'>
                <h5>Table Tipe kendaraan</h5>
            </Card.Header>
            <Card.Body>
                <div>
                    <Table striped bordered hover className='text-center'>
                        <thead style={{backgroundColor:'black', color: 'white'}}>
                            <tr>
                                <th>No</th>
                                <th>Tipe Kendaraan</th>
                                <th>Harga / Jam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nama_tipe}</td>
                                    <td>{item.harga}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Card.Link href='/addTipe' className='btn btn-primary'>
                        Tambah Data
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
        </Container>
    </div>
  )
}

export default Content