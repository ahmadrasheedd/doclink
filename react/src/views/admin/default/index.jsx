// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import React, { useEffect, useState } from "react";
import IconBox from "components/icons/IconBox";
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import axios from "axios";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [earnings, setEarnings] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [uniquePatients, setUniquePatients] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      try {
        const res = await axios.get(`http://localhost:8000/user-info/${userId}`);
        if (res.status === 200) {
          const { unique_patients, total_reservations } = res.data;
          setUniquePatients(unique_patients);
          setTotalReservations(total_reservations);

          // Calculate earnings assuming $50 per reservation
          const costPerReservation = 50;
          setEarnings(total_reservations * costPerReservation);
        }
      } catch (error) {
        console.error("Error fetching user clinic stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap='20px' mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value={`$${earnings.toFixed(2)}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Total Reservations'
          value={totalReservations}
        />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Unique Patients'
          value={uniquePatients}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <WeeklyRevenue />
      </SimpleGrid>
    </Box>
  );
}
