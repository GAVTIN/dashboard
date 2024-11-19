import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Card } from '@mui/material';

const InvitationPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    option: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <Card sx={{ padding: "60px", margin: "40px auto", width: "500px" }}>
      {submitted ? <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto', height: "100%", alignContent: "center" }}>
        <Typography variant="h6" component="h2">Your contact details have been recorded and you will receive link to setup your account for selected ERP in your mail box soon. Thank you for considering our services.</Typography>
        <Button type="submit" variant="contained" color="primary" onClick={handleCancel}>
          Go To Home Page
        </Button>
      </Box> : <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto', height: "100%", alignContent: "center" }}>
        <Typography sx={{ color: "black" }} variant='h4'>Invitation Form</Typography>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined" required>
          <InputLabel id="select-label">Option</InputLabel>
          <Select
            labelId="select-label"
            label="Option"
            name="option"
            value={formData.option}
            onChange={handleChange}
          >
            <MenuItem value="Netsuite">Netsuite</MenuItem>
            <MenuItem value="MS Dynamics">MS Dynamics</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>}
    </Card>
  );
};

export default InvitationPage; 
