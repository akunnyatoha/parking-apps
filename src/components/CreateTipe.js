import { React, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'


const CreateTipe = () => {

    const [nama_tipe, setNameType] = useState("");
    const [harga, setHarga] = useState("");
    

    const insertTipeKendaraan = async(e)=> {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:5000/api/types/`, {
                nama_tipe,
                harga
            });
            alert("Data berhasil ditambahkan")
        } catch (err) {
            alert(err)
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Card style={{width: '400px'}} className='mt-5'>
            <Card.Header className='text-center'>
                Add Tipe Kendaraan
            </Card.Header>
            <Card.Body>
                <div>
                    <Form onSubmit={insertTipeKendaraan}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipe</Form.Label>
                            <Form.Control type="text" name='nama_tipe' onChange={(e) => {setNameType(e.target.value)}} id='nama_tipe' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Harga/Jam</Form.Label>
                            <Form.Control type="number" onChange={(e) => {setHarga(e.target.value)}} name='harga' id='harga' />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='mt-3'>
                    <Card.Link className='btn btn-primary' href='/'>
                        Cancel
                    </Card.Link>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CreateTipe