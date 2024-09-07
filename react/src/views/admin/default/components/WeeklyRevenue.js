import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdBarChart } from 'react-icons/md';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // State for weekly data
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      const clinicId = localStorage.getItem('clinicId'); // Retrieve the clinic ID from local storage
      try {
        const res = await axios.get(`http://localhost:8000/reservations-by-week/${clinicId}`);
        if (res.status === 200) {
          // Set weekly data from response
          setWeeklyData(res.data);
        }
      } catch (error) {
        console.error("Error fetching weekly revenue:", error);
      }
    };

    fetchWeeklyRevenue();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: weeklyData.map(data => `Week ${data.week}`),
    datasets: [
      {
        label: 'Number of Reservations',
        data: weeklyData.map(data => data.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Week ${tooltipItem.label}: ${tooltipItem.raw} Reservations`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Reservations',
        },
        ticks: {
          // Ensure whole numbers on y-axis
          callback: function(value) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Reservations
        </Text>
        <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button>
      </Flex>

      <Box h='240px' mt='auto'>
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </Box>
    </Box>
  );
}
