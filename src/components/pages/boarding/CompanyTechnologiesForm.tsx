import React, { useState } from "react";
import {
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  TextField,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import MenuDrpDwn from "../../../components/shared/MenuDrpDwn";

const technologies = {
  web: [
    "Java",
    "Node.js",
    "React.js",
    "Angular.js",
    "Dot Net",
    "Python",
    "Mern",
    "PHP",
    "Mean",
    ".NET + Angular8+",
    "Magento",
    "Salesforce",
    "Other",
  ],
  app: [
    "Android",
    "iOS",
    "React Native",
    "Flutter",
    "Ionic",
    "HTML",
    "CSS",
    "JavaScript",
    "PostgreSQL",
    "Django",
    "Linux",
    "Apache",
    "AWS",
    "Other",
  ],
  other: [
    "UI/UX",
    "QA (Automation+Manual)",
    "Big Data",
    "Tableau",
    "BMC Helix",
    "Servicenow",
    "DBT",
    "Snowflake",
    "Salesforce",
    "Sr Data Engineer",
    "ROR",
    "MS Dynamic CRM 365",
    "Other",
  ],
};

const CompanyTechnologiesForm = () => {
  // Form state
  const [webTech, setWebTech] = useState<string[]>([]);
  const [appTech, setAppTech] = useState<string[]>([]);
  const [otherTech, setOtherTech] = useState<string[]>([]);
  const [otherWebDetail, setOtherWebDetail] = useState("");
  const [otherAppDetail, setOtherAppDetail] = useState("");
  const [otherOtherDetail, setOtherOtherDetail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validation
    if (
      webTech.length === 0 ||
      appTech.length === 0 ||
      otherTech.length === 0
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Submit form data
    const formData = {
      webTechnologies: webTech,
      appTechnologies: appTech,
      otherTechnologies: otherTech,
      additionalDetails: {
        web: otherWebDetail,
        app: otherAppDetail,
        other: otherOtherDetail,
      },
    };

    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg m-auto p-6 bg-white rounded-lg h-auto"
    >
      {/* <Typography variant="h5" className="font-bold mb-4">
        Technical Expertise
      </Typography> */}

      {/* Web Technologies */}
      <FormControl size="small" fullWidth margin="normal" required>
        <InputLabel id="web-tech-label">Web Technologies</InputLabel>
        <Select
          labelId="web-tech-label"
          multiple
          value={webTech}
          onChange={(e) => setWebTech(e.target.value as string[])}
          input={<OutlinedInput label="Web Technologies" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {technologies.web.map((tech) => (
            <MenuItem key={tech} value={tech}>
              <Checkbox  size="small" checked={webTech.indexOf(tech) > -1} />
              <ListItemText primary={tech} classes={{primary:'!text-base'}} />
            </MenuItem>
          ))}
        </Select>
        {webTech.includes("Other") && (
          <TextField
            margin="normal"
            fullWidth
            label="Other Web Technologies"
            value={otherWebDetail}
            onChange={(e) => setOtherWebDetail(e.target.value)}
          />
        )}
      </FormControl>

      {/* App Technologies */}
      <FormControl size="small" fullWidth margin="normal" required>
        <InputLabel id="app-tech-label">App Technologies</InputLabel>
        <Select
          labelId="app-tech-label"
          multiple
          value={appTech}
          input={<OutlinedInput label="App Technologies" />}
          onChange={(e) => setAppTech(e.target.value as string[])}
          renderValue={(selected) => selected.join(", ")}       
        >
          {technologies.app.map((tech) => (
            <MenuItem key={tech} value={tech}>
              <Checkbox  size="small" checked={appTech.indexOf(tech) > -1} />
              <ListItemText primary={tech} classes={{primary:'!text-base'}} />
            </MenuItem>
          ))}
        </Select>
        {appTech.includes("Other") && (
          <TextField
            margin="normal"
            fullWidth
            label="Other App Technologies"
            value={otherAppDetail}
            onChange={(e) => setOtherAppDetail(e.target.value)}
          />
        )}
      </FormControl>

      {/* Other Technologies */}
      <FormControl size="small" fullWidth margin="normal" required>
        <InputLabel id="other-tech-label">Other Technologies</InputLabel>
        <Select
          labelId="other-tech-label"
          multiple
          value={otherTech}
          input={<OutlinedInput label="Other Technologies" />}
          onChange={(e) => setOtherTech(e.target.value as string[])}
          renderValue={(selected) => selected.join(", ")}
        >
          {technologies.other.map((tech) => (
            <MenuItem key={tech} value={tech}>
              <Checkbox size="small" checked={otherTech.indexOf(tech) > -1} />
              <ListItemText primary={tech} classes={{primary:'!text-base'}}/>
            </MenuItem>
          ))}
        </Select>
        {otherTech.includes("Other") && (
          <TextField
            margin="normal"
            fullWidth
            label="Other Technologies"
            value={otherOtherDetail}
            onChange={(e) => setOtherOtherDetail(e.target.value)}
          />
        )}
      </FormControl>

      {/* Error Message */}
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Submit Button */}
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button> */}
    </form>
  );
};

export default CompanyTechnologiesForm;

