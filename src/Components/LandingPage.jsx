import { AppBar, Toolbar, Typography, IconButton, Button, Card, CardContent, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Tooltip, Legend, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Accordian from './HeaderFilters';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const COLORS = [
  '#F2F4D1', // 4 shades lighter than #E5E78A
  '#CEF4D1', // 4 shades lighter than #A3E58A
  '#F2D1D1', // 4 shades lighter than #E5A78A
  '#D1F4F4', // 4 shades lighter than #8AE5E7
  '#F2D6D6', // 4 shades lighter than #E58A8A
  '#D6F4AD'  // 4 shades lighter than #8FBF6A
];


const rData = [
  { customerName: 'HRW', contactName: 'John Doe', email: 'john.doe@acme.com', region: 'NA', ImplementationContactEmail: 'impl.contact1@example.com', invitationDate: '2024-01-15', invitedBy: 'HR', status: 'In Progress' },
  { customerName: 'Igneo', contactName: 'Jane Smith', email: 'jane.smith@beta.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact2@example.com', invitationDate: '2024-02-20', invitedBy: 'IG', status: 'Invitation Sent' },
  { customerName: 'Project44 LLC', contactName: 'Alice Johnson', email: 'alice.johnson@gamma.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact3@example.com', invitationDate: '2024-03-05', invitedBy: 'LL', status: 'Submitted' },
  { customerName: 'Molear', contactName: 'Bob Brown', email: 'bob.brown@delta.com', region: 'NA', ImplementationContactEmail: 'impl.contact4@example.com', invitationDate: '2024-04-10', invitedBy: 'ML', status: 'Rejected' },
  { customerName: 'Liftoff Mobile', contactName: 'Charlie Davis', email: 'charlie.davis@epsilon.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact5@example.com', invitationDate: '2024-05-15', invitedBy: 'LM', status: 'Approved' },
  { customerName: 'Caulipower', contactName: 'Diana Evans', email: 'diana.evans@zeta.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact6@example.com', invitationDate: '2024-06-20', invitedBy: 'CP', status: 'In Progress' },
  { customerName: 'Property Guru', contactName: 'Frank Green', email: 'frank.green@eta.com', region: 'NA', ImplementationContactEmail: 'impl.contact7@example.com', invitationDate: '2024-07-25', invitedBy: 'ID', status: 'Invitation Sent' },
  { customerName: 'IDRC', contactName: 'Grace Harris', email: 'grace.harris@theta.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact8@example.com', invitationDate: '2024-08-30', invitedBy: 'GH', status: 'Submitted' },
  { customerName: 'Free Wire', contactName: 'Henry Jackson', email: 'henry.jackson@iota.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact9@example.com', invitationDate: '2024-09-05', invitedBy: 'FW', status: 'Rejected' },
  { customerName: 'True Phone(TP Global)', contactName: 'Ivy King', email: 'ivy.king@kappa.com', region: 'NA', ImplementationContactEmail: 'impl.contact10@example.com', invitationDate: '2024-10-10', invitedBy: 'TP', status: 'Approved' },
  { customerName: 'BLUEVOYANT LLC', contactName: 'Steve Walker', email: 'steve.walker@upsilon.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact11@example.com', invitationDate: '2024-08-30', invitedBy: 'BL', status: 'Live' },
  { customerName: 'Sensei AG', contactName: 'Steve Walker', email: 'steve.walker@upsilon.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact12@example.com', invitationDate: '2024-08-30', invitedBy: 'SA', status: 'Live' },
  { customerName: 'Aqua Expedition', contactName: 'Steve Walker', email: 'steve.walker@upsilon.com', region: 'NA', ImplementationContactEmail: 'impl.contact13@example.com', invitationDate: '2024-08-30', invitedBy: 'AE', status: 'Live' },
  { customerName: 'ACME Technology', contactName: 'Steve Walker', email: 'steve.walker@upsilon.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact14@example.com', invitationDate: '2024-08-30', invitedBy: 'AT', status: 'Live' },
  { customerName: 'Auterion Group Inc', contactName: 'Jack Lee', email: 'jack.lee@lambda.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact15@example.com', invitationDate: '2024-11-15', invitedBy: 'AG', status: 'In Progress' },
  { customerName: 'TurnItIn', contactName: 'Karen Miller', email: 'karen.miller@mu.com', region: 'NA', ImplementationContactEmail: 'impl.contact16@example.com', invitationDate: '2024-12-20', invitedBy: 'TI', status: 'Invitation Sent' },
  { customerName: 'AINS LLC', contactName: 'Leo Nelson', email: 'leo.nelson@nu.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact17@example.com', invitationDate: '2024-01-25', invitedBy: 'AL', status: 'Submitted' },
  { customerName: 'Tarana Wireless INC', contactName: 'Mia Owens', email: 'mia.owens@xi.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact18@example.com', invitationDate: '2024-02-30', invitedBy: 'TW', status: 'Rejected' },
  { customerName: 'Crysos Corporation', contactName: 'Nick Parker', email: 'nick.parker@omicron.com', region: 'NA', ImplementationContactEmail: 'impl.contact19@example.com', invitationDate: '2024-03-05', invitedBy: 'CC', status: 'Approved' },
  { customerName: 'Accion Lab Pvt Ltd', contactName: 'Olivia Quinn', email: 'olivia.quinn@pi.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact20@example.com', invitationDate: '2024-04-10', invitedBy: 'AP', status: 'In Progress' },
  { customerName: 'Accenda Loyalty', contactName: 'Paul Roberts', email: 'paul.roberts@rho.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact21@example.com', invitationDate: '2024-05-15', invitedBy: 'AL', status: 'Invitation Sent' },
  { customerName: 'Sigma Technologies', contactName: 'Quinn Scott', email: 'quinn.scott@sigma.com', region: 'NA', ImplementationContactEmail: 'impl.contact22@example.com', invitationDate: '2024-06-20', invitedBy: 'ST', status: 'Submitted' },
  { customerName: 'Tau Networks', contactName: 'Rachel Turner', email: 'rachel.turner@tau.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact23@example.com', invitationDate: '2024-07-25', invitedBy: 'TN', status: 'Rejected' },
  { customerName: 'Dupsilon Innovations', contactName: 'Steve Walker', email: 'steve.walker@upsilon.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact24@example.com', invitationDate: '2024-08-30', invitedBy: 'UI', status: 'Approved' },
  { customerName: 'Ilon Innovations', contactName: 'Micky Walker', email: 'steve.walker@upsilon.com', region: 'NA', ImplementationContactEmail: 'impl.contact25@example.com', invitationDate: '2024-08-30', invitedBy: 'SW', status: 'Live' },
  { customerName: 'Mil Innovations', contactName: 'Milian Walker', email: 'steve.walker@upsilon.com', region: 'EMEA', ImplementationContactEmail: 'impl.contact26@example.com', invitationDate: '2024-08-30', invitedBy: 'UI', status: 'Live' },
  { customerName: 'Dwayn Innovations', contactName: 'Steve Van', email: 'steve.walker@upsilon.com', region: 'ASIA', ImplementationContactEmail: 'impl.contact27@example.com', invitationDate: '2024-08-30', invitedBy: 'SV', status: 'Live' },
];

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 4)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "14px",
      margin: "0 auto"
    },
    children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
  };
}

const LandingPage = () => {
  // const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState(rData);
  const navigate = useNavigate();
  const columns = useMemo(() => {
    const columnIds = ['Customer Name', 'Contact Name', 'Email Address', 'Region', 'Implementation Contact', 'Invitation Sent Date', 'Invited By', 'Status'];
    return columnIds.map((id) => ({
      headerName: id,
      flex: 1,
      textAlign: "center",
      field: id,
      sortable: true,
      headerClass: "my-header-class",
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: (params) => {
        if (params.colDef.field === 'Status') {
          if (params.data.status === "In Progress") {
            return {
              color: "white",
              // backgroundColor: "#2F65B8",
              backgroundColor: "#D1D35A",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          } else if (params.data.status === "Invitation Sent") {
            return {
              color: "white",
              // backgroundColor: "#14AE5C",
              backgroundColor: "#91D56E",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          } else if (params.data.status === "Rejected") {
            return {
              color: "white",
              backgroundColor: "#D18B6E",
              // backgroundColor: "red",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          } else if (params.data.status === "Submitted") {
            return {
              color: "white",
              // backgroundColor: "#ca5d19",
              backgroundColor: "#7AC7C8",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          } else if (params.data.status === "Approved") {
            return {
              color: "white",
              // backgroundColor: " #CC9F02",
              backgroundColor: " #D16E6E",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          } else if (params.data.status === "Live") {
            return {
              color: "white",
              backgroundColor: "#7A9A4A",
              // backgroundColor: "#6a994e",
              borderRadius: "23px",
              textAlign: "center",
              width: "150 !important",
              paddingBottom: "5px",
              height: "80%",
              marginTop: "3px",
              marginBottom: "5px",
              lineHeight: "25px",
              fontWeight: "500"
            };
          }
        }
      },
      cellRenderer: (id === 'Invited By' || id === 'Customer Name' || id === 'Contact Name' || id === 'Email Address' || id === 'Status' || id === 'Invitation Sent Date' || id === 'Region' || id === 'Implementation Contact') ? (params) => {
        if (id === 'Invited By') return <Avatar {...stringAvatar(params.data.contactName)} />
        if (id === 'Customer Name') return <div>{params.data.customerName}</div>
        if (id === 'Contact Name') return <div>{params.data.contactName}</div>
        if (id === 'Email Address') return <div>{params.data.email}</div>
        if (id === 'Region') return <div>{params.data.region}</div>
        if (id === 'Implementation Contact') return <div>{params.data.ImplementationContactEmail}</div>
        if (id === 'Invitation Sent Date') return <div>{params.data.invitationDate}</div>
        if (id === 'Status') return <div>{params.data.status}</div>
      } : null
    }));
  }, []);

  const tabFilter = ['Live', 'In Progress', 'Invitation Sent', 'Submitted', 'Rejected', 'Approved', 'All']

  const data = [
    { name: 'Live', value: rData?.filter(x => x.status === 'Live').length },
    { name: 'In Progress', value: rData?.filter(x => x.status === 'In Progress').length },
    { name: 'Sent', value: rData?.filter(x => x.status === 'Invitation Sent').length },
    { name: 'Submitted', value: rData?.filter(x => x.status === 'Submitted').length },
    { name: 'Rejected', value: rData?.filter(x => x.status === 'Rejected').length },
    { name: 'Approved', value: rData?.filter(x => x.status === 'Approved').length },
    { name: 'Total Requests', value: rData?.length },
  ];

  const barData = [
    { name: 'Netsuite', Requests: 200 },
    { name: 'MS Dynamics', Requests: 100 }
  ];

  const lineData = [
    { name: '2024', Numbers: 200 },
    { name: '2023', Numbers: 100 },
    { name: '2022', Numbers: 150 },
    { name: '2021', Numbers: 85 },
    { name: '2020', Numbers: 35 }
  ];

  const handleInvite = () => {
    navigate('/invite')
  }

  const imageRenderer = (params) => (
    <img src={params.value} alt="Invited By" style={{ width: '50px', cursor: 'pointer' }} onClick={() => alert('User Summary')} />
  );

  const statusRenderer = (params) => (
    <span>
      <span style={{ backgroundColor: COLORS[data.findIndex(d => d.name === params.value)], borderRadius: '50%', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
      {params.value}
    </span>
  );

  const tableRenderer = (val) => {
    let tRData;
    if (val === 6) {
      tRData = rData;
    }
    else {
      tRData = rData.filter(x => x.status === tabFilter[val]);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRowData(tRData);
    }, 1000)
  }

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #64b5f6, #1976d2)'}}>
        <Toolbar sx={{width: "55vw", justifyContent: "space-between"}}>
          <IconButton color="inherit" aria-label="logo">
            {/* <img src={xorLog} alt="Logo" style={{ width: '140px', mixBlendMode: "multiply" }} /> */}
            COMPANY
          </IconButton>
          <Typography position="center" variant="h6" sx={{ fontWeight: "600", background: 'inherit' }}>
            INVITATION DASHBOARD
          </Typography>
          {/* <Button variant='contained' sx={{ fontSize: "14px", backgroundColor: "#0077b6", boxShadow: "2px 2px 2px -1x grey" }} onClick={handleInvite}>Invite</Button> */}
        </Toolbar>
      </AppBar>
      <Card style={{ margin: '2px' }}>
        <Accordian data={data} tableRenderer={tableRenderer} />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ background: 'linear-gradient(to right,#64b5f6, #1976d2)', color: "white" }}>
            <Typography style={{ fontWeight: "600", flexGrow: 1, textAlign: 'left', background: 'inherit', fontStretch: "condensed" }}>
              STATISTICS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <BarChart width={300} height={300} data={barData}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Requests" name="ERP UTILIZATION" fill="#00b4d8" />
                </BarChart>
                <LineChart width={600} height={300} data={lineData}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="name" reversed />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="bump" name="REQUEST PROGRESSION" dataKey="Numbers" stroke="#48cae4" />
                </LineChart>
              </div>
            </CardContent>
          </AccordionDetails>
        </Accordion>
        <Box sx={{margin: "10px"}}>
          <Button variant='contained' sx={{ fontSize: "14px", background: 'linear-gradient(to right,#64b5f6, #1976d2)', float: "right", marginBottom: "10px", color: "black" }} onClick={handleInvite}>Invite</Button>
        </Box>
      </Card>
      <div className="ag-theme-alpine" style={{ height: "600px", width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          frameworkComponents={{ imageRenderer, statusRenderer }}
        />
      </div>
    </div>
  );
};

export default LandingPage;

