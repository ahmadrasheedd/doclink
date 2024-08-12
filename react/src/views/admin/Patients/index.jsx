import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
} from '@chakra-ui/react';

const patients = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    condition: 'Flu',
    date: "20/7/2024"
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    gender: 'Female',
    condition: 'Cold',
    date: "19/7/2024"
  },
  // Add more patients here
];

function PatientTable() {
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
              <Th>Gender</Th>
              <Th>Date</Th>
              <Th>Condition</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((patient) => (
              <Tr key={patient.id}>
                <Td>{patient.id}</Td>
                <Td>{patient.name}</Td>
                <Td>{patient.age}</Td>
                <Td>{patient.gender}</Td>
                <Td>{patient.date}</Td>
                <Td>{patient.condition}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PatientTable;
