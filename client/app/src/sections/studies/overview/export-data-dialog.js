import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormGroup,TextField,
  FormControlLabel,
  Divider,
  DialogActions,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const participantsData = [
    { id: 'HUA_01', gender: 'Female', date_of_birth: '1985-04-12', height: 165, weight: 60, status: 'registered' },
    { id: 'HUA_02', gender: 'Male', date_of_birth: '1990-07-21', height: 175, weight: 80, status: 'registered' },
    // ...additional participant records
  ];
  const Gyroscope= [
      { timestamp: '2023-01-01T00:00:00Z', x: 0.1, y: 0.2, z: 0.3, timezone: '+5:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T00:01:00Z', x: 0.1, y: 0.2, z: 0.3, timezone: '-4:30', participant: 'HUA_02', device: 'SamsungS22' },
      // ...additional gyroscope records
    ];
    const Accelerometer= [
      { timestamp: '2023-01-01T01:01:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '-4:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T01:02:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '-4:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T01:03:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '+5:30', participant: 'HUA_02', device: 'SamsungS22' },
      { timestamp: '2023-01-01T01:05:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '+5:30', participant: 'HUA_02', device: 'SamsungS22' },
      // ...additional accelerometer records
    ]
  
  const study_details = [{
    _id: {
        $oid: "65785575225b7d56b3c9e476"
    },
    study_id: "HUA",
    title: "Test Hua",
    description: "Test",
    no_participants: 10,
    owners: [
        {
            id: "65784ea81e63bb4d7637641b",
            email: "christoszal@gmail.com",
            full_name: "Christos Zalachoris"
        }
    ],
    study_coordinators: [],
    study_assistants: []
}]
  const surveyData = [
    { participant: 'HUA_01', surveyId: 'SUR_01', response: 'Yes' },
    { participant: 'HUA_02', surveyId: 'SUR_01', response: 'No' },
    // ...additional survey records
  ];
  
  const biteDetectionData = [
    { participant: 'HUA_01', first_ts: '2023-01-01T01:05:00Z', last_ts: '2023-01-01T01:08:00Z',date: '2023-01-01', biteCount: 20 },
    { participant: 'HUA_02', first_ts: '2023-01-01T01:05:00Z', last_ts: '2023-01-01T01:08:00Z', date: '2023-01-01', biteCount: 20 },

    // ...additional bite detection records
  ];
  
  const stepsData = [
    { participant: 'HUA_01', year: 2016, month:10, week:22,day:12,hour:12, steps: 120 },
    { participant: 'HUA_02', year: 2016, month:10, week:23,day:18,hour:12, steps: 120 },
  ];
  
  const mealPicturesData = [
    { participant: 'HUA_01', date: '2023-01-01', meal: 'Lunch', pictureUrl: 'http://example.com/pic1.jpg' },
    { participant: 'HUA_02', date: '2023-01-01', meal: 'Dinner', pictureUrl: 'http://example.com/pic2.jpg' },
  ];

  

const ExportDataDialog = ({ onClose }) => {
  const [exportType, setExportType] = useState('csv');
  const [selectedData, setSelectedData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);


  const dataCategories = {
    'Timeseries Data': ['Gyroscope Time Series', 'Accelerometer Time Series', 'Steps Time Series'],
    'Eating Behavioral Data': ['Bite Detection Count', 'Meal Pictures'],
    'Survey Data': ['Mobile Questionnaires','REDCap Quessionaires'],

  };
  const handleExportTypeChange = (event) => {
    setExportType(event.target.value);
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedData({
      ...selectedData,
      [category]: selectedData[category]?.includes(value)
        ? selectedData[category].filter(item => item !== value)
        : [...(selectedData[category] || []), value]
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedData({});
    } else {
      const allData = {};
      Object.keys(dataCategories).forEach(category => {
        allData[category] = dataCategories[category];
      });
      setSelectedData(allData);
    }
    setSelectAll(!selectAll);
  };
// Helper function to convert JSON to CSV
const jsonToCSV = (json) => {
  const rows = json.map(item => Object.values(item).join(','));
  const header = Object.keys(json[0]).join(',');
  return [header, ...rows].join('\r\n');
};

// Helper function to create an Excel workbook from JSON
const jsonToExcelWorkbook = (json, sheetName) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(json);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return workbook;
};

// Function to create a blob from Excel workbook
const workbookToBlob = (workbook) => {
  const wbout = XLSX.write(workbook, {bookType:'xlsx', type:'binary'});
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  return new Blob([s2ab(wbout)], {type:"application/octet-stream"});
};

 
  const handleExportClick = async () => {
    const zip = new JSZip();
    
    // Add root-level files for study and participant details
    const studyDetailsContent = exportType === 'csv' ? jsonToCSV(study_details) : workbookToBlob(jsonToExcelWorkbook(study_details, 'Study Details'));
    const participantsContent = exportType === 'csv' ? jsonToCSV(participantsData) : workbookToBlob(jsonToExcelWorkbook(participantsData, 'Participants'));
  
    zip.file("study_details." + (exportType === 'csv' ? 'csv' : 'xlsx'), studyDetailsContent);
    zip.file("participants." + (exportType === 'csv' ? 'csv' : 'xlsx'), participantsContent);
  
    // Handle data for each participant
    for (const participant of participantsData) {
      const participantId = participant.id;
  
      if (exportType === 'csv') {
        const participantFolder = zip.folder(participantId);
        participantFolder.file("gyroscope.csv", jsonToCSV(filterTimeSeriesData(Gyroscope, participantId)));
        participantFolder.file("accelerometer.csv", jsonToCSV(filterTimeSeriesData(Accelerometer, participantId)));
      } else {
        // Create a new Excel workbook for each participant
        const workbook = jsonToExcelWorkbook(filterTimeSeriesData(Gyroscope, participantId), 'Gyroscope');
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(filterTimeSeriesData(Accelerometer, participantId)), 'Accelerometer');
  
        // Add the Excel file to the zip
        const participantBlob = workbookToBlob(workbook);
        zip.file(`${participantId}.xlsx`, participantBlob);
      }
    }
  
    // Generate and download the zip file
    const content = await zip.generateAsync({type: "blob"});
    saveAs(content, "study_data.zip");
    onClose();
  };
  
  const exportToZip = async () => {
    const zip = new JSZip();
  
    // Loop through each participant
    participantsData.forEach(participant => {
      // Create a new folder for each participant inside the zip
      const participantFolder = zip.folder(participant.id);
  
      // Create a new workbook for each participant
      const workbook = XLSX.utils.book_new();
  
      // Add sheets for each data type
      addDataToWorkbook(workbook, 'Gyroscope', filterTimeSeriesData('Gyroscope', participant.id));
      addDataToWorkbook(workbook, 'Accelerometer', filterTimeSeriesData('Accelerometer', participant.id));
      addDataToWorkbook(workbook, 'Survey Data', filterDataByParticipant(surveyData, participant.id));
      addDataToWorkbook(workbook, 'Bite Detection', filterDataByParticipant(biteDetectionData, participant.id));
      addDataToWorkbook(workbook, 'Steps Data', filterDataByParticipant(stepsData, participant.id));
      addDataToWorkbook(workbook, 'Meal Pictures', filterDataByParticipant(mealPicturesData, participant.id));
  
      // Convert workbook to a binary string (blob)
      const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
      // Add the Excel file to the participant's folder
      participantFolder.file(`${participant.id}.xlsx`, blob);
    });
  
    // Add study details and participant table to the main directory of the zip
    // Example: zip.file("studyDetails.txt", "Study Details here");
  
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "studyData.zip");
  };
  
  const addDataToWorkbook = (workbook, sheetName, data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  };
  
  const filterTimeSeriesData = (data, participantId) => {
    return data.filter(item => item.participant === participantId);
  };
  
  const filterDataByParticipant = (data, participantId) => {
    return data.filter(record => record.participant === participantId);
  };
  

  

  return (
    <Box>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Export Study Data
        </Typography>

        {/* Export Type Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="export-type-label">Export Type</InputLabel>
          <Select
            labelId="export-type-label"
            id="export-type-select"
            value={exportType}
            label="Export Type"
            onChange={handleExportTypeChange}
          >
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ my: 2 }} />

        {/* Data Categories */}
        <Typography variant="subtitle1" gutterBottom>
          Select Date Range
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6} >
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Choose Data Categories
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={selectAll} onChange={handleSelectAllChange} />}
          label="Select All"
          sx={{ mb: 2 }}
        />

<Grid container spacing={2}>

          {Object.entries(dataCategories).map(([category, items]) => (
            <Grid item xs={12} sm={6} key={category}>
              <Typography variant="subtitle1">{category}</Typography>
              <FormGroup>
                {items.map(item => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={selectedData[category]?.includes(item) || false}
                        onChange={() => handleCheckboxChange(category, item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </Grid>
          ))}
        </Grid>
      </DialogContent>


      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleExportClick}>
          Export
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ExportDataDialog;
