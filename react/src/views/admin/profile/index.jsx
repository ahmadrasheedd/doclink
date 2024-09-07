import React, { useEffect, useState } from "react";
import { Box, Grid, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import axios from "axios";

// Custom components
import Banner from "views/admin/profile/components/Banner";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar2.png";

export default function Overview() {
  // States for the data returned from the API
  const [userName, setUserName] = useState("");
  const [clinicCategory, setClinicCategory] = useState("");
  const [uniquePatients, setUniquePatients] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);

  // States for the form inputs
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch the data when the component loads
  useEffect(() => {
    const userId = localStorage.getItem('userId');; // Replace this with the actual userId you want to fetch
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user-info/${userId}`);
        if (res.status === 200) {
          const { user_name, clinic_category, unique_patients, total_reservations, user_email, user_phone } = res.data;

          // Set the state with the data
          setUserName(user_name);
          setClinicCategory(clinic_category);
          setUniquePatients(unique_patients);
          setTotalReservations(total_reservations);
          setEmail(user_email);
          setPhone(user_phone);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Function to handle form submission for updating user details
  const handleUpdateUserDetails = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Replace with actual user ID
      const res = await axios.put(`http://localhost:8000/update-user/${userId}`, {
        name: userName,
        phone,
        email,
        password,
      });
      if (res.status === 200) {
        alert("User details updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name={userName}
          job={clinicCategory} // Use the clinic category as the user's job title
          posts={uniquePatients}
          following={totalReservations}
        />

        {/* Form to update user details */}
        <Box gridArea="1 / 2 / 2 / 3" p={4} bg="white" borderRadius="md" boxShadow="md">
          <FormControl mb={4}>
            <FormLabel>User Name</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </FormControl>

          <Button colorScheme="blue" onClick={handleUpdateUserDetails}>
            Save
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
