import { useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Chip,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TextField, Button, MenuItem } from "@mui/material";

const AddBenchForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    experience: "",
    skills: [] as string[],
    location: "",
    availability: "immediate",
    cv: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const newSkill = inputElement.value?.trim();
    if (e.key === "Enter" && newSkill) {
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData({
          ...formData,
          skills: [...formData.skills, newSkill],
        });
        e.currentTarget.value = "";
      }
      e.preventDefault();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex flex-col my-auto">
      <Button
      className="!mr-2"
        variant="outlined"
        onClick={toggleDrawer(true)}
        startIcon={<Add />}
      >
        Import Bench
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: "calc(100vw - 250px)" }}>
          <div className="p-4 border-b">
            <h2 className="text-heading">Add Bench</h2>
          </div>

          <div className="p-4 w-[50%] mx-auto">
            <form onSubmit={handleSubmit} className="w-full p-4">
              {/* First Row: First Name, Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
              </div>

              {/* Role Dropdown */}
              <div className="mb-4">
                <TextField
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="frontend developer">
                    Frontend Developer
                  </MenuItem>
                  <MenuItem value="backend developer">
                    Backend Developer
                  </MenuItem>
                </TextField>
              </div>

              {/* Gender, Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="non-binary">Non-binary</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer not to say">
                    Prefer not to say
                  </MenuItem>
                </TextField>
                <TextField
                  label="Experience (Years)"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
              </div>

              {/* Skill Set */}
              <div className="mb-4">
                <TextField
                  label="Add Skill"
                  placeholder="Type a skill and press Enter"
                  onKeyDown={handleSkillKeyPress}
                  fullWidth
                  size="small"
                />
                <Box mt={1} display="flex" flexWrap="wrap">
                  {formData.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => removeSkill(skill)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </div>

              {/* Location */}
              <div className="mb-4">
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
              </div>

              {/* Availability Radio Buttons */}
              <div>
                <label className="text-base mb-2">Available From:</label>
                <RadioGroup
                  row
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="immediate"
                    control={<Radio color="primary" />}
                    label="Immediate"
                  />
                  <FormControlLabel
                    value="later"
                    control={<Radio color="primary" />}
                    label="Later"
                  />
                  <FormControlLabel
                    value="not available"
                    control={<Radio color="primary" />}
                    label="Not Available"
                  />
                </RadioGroup>
              </div>

              {/* CV Upload */}
              <div className="mb-6">
                <label htmlFor="cv-upload" className="text-base">
                  Upload CV:
                </label>
                <input
                  type="file"
                  name="cv"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className="block mt-2 text-sm text-gray-500 cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:text-base
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              "
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AddBenchForm;
