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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';

function PatientHistoryTable() {
  const [histories, setHistories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]); // Multiple conditions can be selected
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getPatientHistory = async () => {
      const res = await axios.get(`http://localhost:8000/patients-with-conditions/${localStorage.getItem('clinicId')}`);
      if (res.status === 200) {
        setHistories(res.data);
      }
    };

    getPatientHistory();
  }, []);

  const handleViewCondition = (conditions) => {
    setSelectedConditions(conditions); // Set all conditions for the selected patient
    onOpen(); // Open the modal
  };

  return (
    <Box p={5} marginTop="100px">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Patient History</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {histories.map((history) => (
              <Tr key={history.patient_id}>
                <Td>{history.patient_id}</Td>
                <Td>{history.patient_name}</Td>
                <Td>{history.date}</Td>
                <Td>{history.time}</Td>
                <Td>
                  <Button
                    backgroundColor={'blue.500'}
                    onClick={() => handleViewCondition(history.conditions)}
                  >
                    View Condition
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal to show condition details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Condition Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedConditions && selectedConditions.length > 0 ? (
              selectedConditions.map((condition, index) => (
                <Box key={index} mb={4}>
                  <Heading  size="md">{condition.title}</Heading>
                  <p mt={5}>{condition.description}</p>
                </Box>
              ))
            ) : (
              <p>No condition available.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PatientHistoryTable;
