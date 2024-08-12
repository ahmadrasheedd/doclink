import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Text, Box, Input, FormLabel, Button, Textarea } from '@chakra-ui/react';
function EmptyComponent() {
    const [clinicName, setClinicName] = useState()
    const [location, setLocation] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        // Define a function to fetch data
        const fetchClinics = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/clinic/${localStorage.getItem("userId")}`);
            setCategory(response.data.category)
            setClinicName(response.data.clinic_name)
            setLocation(response.data.location)
            setDescription(response.data.description)
            setLoading(false);
            
          } catch (err) {
            setError('Failed to fetch clinics');
            setLoading(false);
          }
        };
    
        // Call the fetch function
        fetchClinics();
      }, []); // Empty dependency array to run once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/clinics", {
            clinic_name: clinicName,
            location: location,
            description: description,
            category: category,
            doctor_id: localStorage.getItem("userId")
          });
          console.log('Clinic created successfully', response.data);
          // Optionally, reset the form or provide user feedback here
          setClinicName('');
          setLocation('');
          setDescription('');
          setCategory('');
        } catch (error) {
          console.error('Error creating clinic', error);
          // Optionally, handle the error and provide user feedback here
        }
      };
      if (loading) {
        return <div >Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    return (
        <div>
            <Box marginTop="100px">
                <form onSubmit={handleSubmit}>
                    <FormLabel marginTop="10px">
                         Name
                    </FormLabel>
                    <Input
                        onChange={(e) => {
                            setClinicName(e.target.value)
                        }}
                        value={clinicName}
                        name='clinic name'
                        placeholder='clinic name'

                    />
                    <FormLabel marginTop="10px">
                         Location
                    </FormLabel>
                    <Input
                    value={location}
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                        name='clinic location'
                        placeholder='clinic location'

                    />
                    <FormLabel marginTop="10px">
                         Category
                    </FormLabel>
                    <Input
                    value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        name='clinic category'
                        placeholder='clinic category'

                    />
                    <FormLabel marginTop="10px">
                         Description
                    </FormLabel>
                    <Textarea
                    value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        name='clinic description'
                        placeholder='clinic description'

                    />
                    <Button
                        type='submit'
                        variant='primary'
                        backgroundColor="blue"
                        color="white"
                        marginTop="10px">

                        save
                    </Button>

                </form>




            </Box>
        </div>
    );
}

export default EmptyComponent;
