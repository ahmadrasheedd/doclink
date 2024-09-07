import React, { useEffect, useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Button,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Modal,
    ModalOverlay,
    Input,
    Textarea,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure ,
} from '@chakra-ui/react';
import axios from 'axios';

function ReservationsTable() {
    const [reservations, setReservations] = useState([]);
    const [title, setTitle] = useState();
    const [patientId, setPatientId] = useState();
    const [reservationId, setReservationId] = useState();
    const [patientName, setPatientName] = useState();
    const [description, setDescription] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async () => {
        const res = axios.post(`http://localhost:8000/add-condition/${localStorage.getItem('clinicId')}`,
            {
                title: title,
                description: description,
                patient_id: patientId,
                patient_name: patientName,
                reservation_id: reservationId,
            }
        );
        if (res === 200) {
            console.log(res.data)
        }
    }

    useEffect(() => {
        const getReservations = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/reservations/${localStorage.getItem('clinicId')}`);
                if (res.status === 200) {
                    setReservations(res.data);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        getReservations();
        console.log(reservations)
    }, []);

    return (
        <Box p={5} marginTop="100px">
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Reservations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Patient Name</Th>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reservations.map((reservation) => (
                            <Tr key={reservation.id}>
                                <Td>{reservation.id}</Td>
                                <Td>{reservation.patient_name}</Td>
                                <Td>{reservation.date}</Td>
                                <Td>{reservation.time}</Td>
                                <Td>

                                    <Button
                                        onClick={() => {
                                            setPatientId(reservation.patient_id)
                                            setPatientName(reservation.patient_name)
                                            setReservationId(reservation.id)
                                            onOpen()

                                        }}
                                        backgroundColor={'blue.500'}
                                    >
                                        Diagnose Condition
                                    </Button>
                                    
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Diagnose Condition</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                        <Input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            type="text" placeholder='add condition title' />
                        </div>
                        <div >
                            <Textarea
                            marginTop={'2'}
                            cols={45}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            placeholder='add condition description' name="description" id="description">
                        </Textarea>
                        </div>
                        
                        
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button backgroundColor={'blue.600'} onClick={() => {
                            handleSubmit()
                            onClose()
                        }} variant='ghost'>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ReservationsTable;
