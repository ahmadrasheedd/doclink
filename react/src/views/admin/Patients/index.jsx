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
} from '@chakra-ui/react';
import axios from 'axios';


function PatientTable() {
  const [patients, setPatients] = useState([]);

  useEffect(()=>{

    const getPatients = async ()=>{
      const res = axios.get(`http://localhost:8000/patients/${localStorage.getItem('clinicId')}`);
      if((await res).status === 200){
        setPatients((await res).data)
      }
    }

    getPatients();


  }, []);
  return (
    <Box p={5} marginTop="100px">
      
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Patients Information</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Actions</Th>

            </Tr>
          </Thead>
          <Tbody>
            {patients.map((patient) => (
              <Tr key={patient.id}>
                <Td>{patient.id}</Td>
                <Td>{patient.name}</Td>
                <Td>{patient.age}</Td>
                <Td>{patient.email}</Td>
                <Td>{patient.address}</Td>
                <Td><Button
                onClick={()=>{
                  
                }}
                className='' backgroundColor={'blue.500'}>contact</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PatientTable;
