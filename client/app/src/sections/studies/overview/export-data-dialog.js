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
  const timeSeriesData = {
    Gyroscope: [
      { timestamp: '2023-01-01T00:00:00Z', x: 0.1, y: 0.2, z: 0.3, timezone: '+5:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T00:01:00Z', x: 0.1, y: 0.2, z: 0.3, timezone: '-4:30', participant: 'HUA_02', device: 'SamsungS22' },
      // ...additional gyroscope records
    ],
    Accelerometer: [
      { timestamp: '2023-01-01T01:01:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '-4:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T01:02:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '-4:30', participant: 'HUA_01', device: 'OnePlus8' },
      { timestamp: '2023-01-01T01:03:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '+5:30', participant: 'HUA_02', device: 'SamsungS22' },
      { timestamp: '2023-01-01T01:05:00Z', x: 0.4, y: 0.5, z: 0.6, timezone: '+5:30', participant: 'HUA_02', device: 'SamsungS22' },
      // ...additional accelerometer records
    ]
  };
  
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
    'Survey Data': ['Mobile Questionnaires'],
    'Participant Metrics': ['Participants'],
    'Timeseries Sensor Data': ['Gyroscope Time Series', 'Accelerometer Time Series', 'Magnetometer Time Series'],
    'Behavioral Data': ['Bite Detection Count','Steps Granularity', 'Meal Pictures']
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

  const isCategorySelected = (category) => {
    return selectedData[category]?.length === dataCategories[category].length;
  };

  const downloadCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
  
    data.forEach((rowArray) => {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
  
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const organizeSurveyDataByParticipant = () => {
    const organizedData = {};
  
    surveyData.forEach(survey => {
      if (!organizedData[survey.participant]) {
        organizedData[survey.participant] = [];
      }
      organizedData[survey.participant].push(survey);
    });
  
    return organizedData;
  };
  

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(participantsData), 'Participants');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(timeSeriesData.Gyroscope), 'Gyroscope Time Series');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(timeSeriesData.Accelerometer), 'Accelerometer Time Series');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(timeSeriesData.Magnetometer), 'Magnetometer Time Series');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(surveyData), 'Mobile Questionnaires');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(biteDetectionData), 'Bite Detection Count');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(stepsData), 'Steps Granularity');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(mealPicturesData), 'Meal Pictures');
  
    XLSX.writeFile(workbook, 'StudyData.xlsx');
  };
  
  const handleExportClick = () => {
    if (exportType === 'csv') {
      if (selectedData['Participant Metrics']) {
        // Convert participantsData to CSV format and download
        const csvData = participantsData.map(p => Object.values(p));
        downloadCSV(csvData, "participants.csv");
      }
    }else if (exportType === 'excel') {
        exportToZip()
      }
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
  
  const filterTimeSeriesData = (dataType, participantId) => {
    return timeSeriesData[dataType].filter(record => record.participant === participantId);
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

        {/* Select All Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          }
          label="Select All"
        />

        {/* Data Categories */}
        <Grid container spacing={2}>
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
        <Grid item xs={6}>
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
