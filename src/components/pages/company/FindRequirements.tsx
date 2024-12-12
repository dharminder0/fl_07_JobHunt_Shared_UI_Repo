// App.tsx
import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  Pagination,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
  {
    id: 2,
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
  {
    id: 7,
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways...",
    tags: ["Business", "Blockchain"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app for you business...",
    tags: ["Business"],
    jobs: 7,
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
    tags: ["Business", "Payment gateway"],
    jobs: 7,
    logo: "https://via.placeholder.com/100", // Replace with your logo
  },
];

const FindRequirements = () => {
  const navigate = useNavigate();
  const handleDetails = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="px-6">
      {/* Header */}
      <div className="flex justify-between align-center my-4">
        <Typography variant="h5">My Vendors</Typography>
        <Button variant="contained" color="primary">
          Back to Homepage
        </Button>
      </div>

      {/* Search and Filters */}
      <Grid container spacing={2} alignItems="center" className="mb-4">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company title or keyword"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select fullWidth defaultValue="Florence, Italy" variant="outlined">
            <MenuItem value="Florence, Italy">Florence, Italy</MenuItem>
            <MenuItem value="New York, USA">New York, USA</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body2">
        Popular: Twitter, Microsoft, Apple, Facebook
      </Typography>
      <div className="my-4">
        <Divider />
      </div>

      {/* Sidebar and Companies List */}
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={2} marginTop={1}>
          <Typography variant="body1" fontWeight={600}>
            Resources
          </Typography>
          <div className="grid">
            {["Onsite", "Offsite", "Hybrid"].map((industry, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox />}
                label={industry}
              />
            ))}
          </div>
          <div className="grid mt-2">
            <Typography variant="body1" fontWeight={600}>
              Company Strength
            </Typography>
            {[
              "0-10 (15)",
              "10-50 (26)",
              "50-100 (45)",
              "100-500 (20)",
              "500+ (19)",
            ].map((size, idx) => (
              <FormControlLabel key={idx} control={<Checkbox />} label={size} />
            ))}
          </div>
          <div className="grid mt-2">
            <Typography variant="body1" fontWeight={600}>
              Technologies
            </Typography>
            {["Web Technologies", "App Technologies", "Other Technologies"].map(
              (size, idx) => (
                <FormControlLabel
                  key={idx}
                  control={<Checkbox />}
                  label={size}
                  className="d-block"
                />
              )
            )}
          </div>
        </Grid>

        {/* Company Cards */}
        <Grid item xs={12} md={10}>
          <div className="flex my-2 align-center justify-between">
            <Typography variant="h6" className="mb-4" fontWeight={600}>
              All Vendors
            </Typography>
            <div>
              {" "}
              <svg
                width="206"
                height="27"
                viewBox="0 0 206 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.08663 17.66C4.27063 17.66 3.57196 17.532 2.99063 17.276C2.41463 17.0147 1.97196 16.6227 1.66263 16.1C1.35329 15.5773 1.19863 14.9267 1.19863 14.148C1.19863 14.0413 1.19863 13.9507 1.19863 13.876C1.19863 13.8013 1.19863 13.7107 1.19863 13.604H2.56663C2.56663 13.7053 2.56663 13.7907 2.56663 13.86C2.56663 13.9293 2.56663 14.0173 2.56663 14.124C2.56663 14.94 2.77996 15.5293 3.20663 15.892C3.63329 16.2493 4.25463 16.428 5.07063 16.428C5.91329 16.428 6.55063 16.284 6.98263 15.996C7.41463 15.708 7.63063 15.2413 7.63063 14.596C7.63063 14.1427 7.50529 13.7667 7.25463 13.468C7.00929 13.164 6.66796 12.908 6.23063 12.7C5.79329 12.4867 5.28396 12.292 4.70263 12.116C4.04663 11.9133 3.45996 11.6573 2.94263 11.348C2.43063 11.0387 2.02529 10.6573 1.72663 10.204C1.43329 9.74533 1.28663 9.188 1.28663 8.532C1.28663 7.892 1.44129 7.35067 1.75063 6.908C2.06529 6.46533 2.50263 6.12933 3.06263 5.9C3.62263 5.67067 4.27329 5.556 5.01463 5.556C5.79863 5.556 6.47863 5.67867 7.05463 5.924C7.63596 6.164 8.08396 6.532 8.39863 7.028C8.71863 7.51867 8.87863 8.13733 8.87863 8.884C8.87863 9.00133 8.87863 9.10267 8.87863 9.188C8.87863 9.268 8.87863 9.36667 8.87863 9.484H7.51063C7.51063 9.38267 7.51063 9.292 7.51063 9.212C7.51063 9.132 7.51063 9.04133 7.51063 8.94C7.51063 8.16133 7.29996 7.60933 6.87863 7.284C6.45729 6.95333 5.84396 6.788 5.03863 6.788C4.26529 6.788 3.66796 6.924 3.24663 7.196C2.82529 7.468 2.61463 7.91333 2.61463 8.532C2.61463 8.996 2.74263 9.38 2.99863 9.684C3.25996 9.98267 3.61463 10.2387 4.06263 10.452C4.51063 10.66 5.02263 10.86 5.59863 11.052C6.29729 11.2813 6.89729 11.5427 7.39863 11.836C7.90529 12.124 8.29196 12.484 8.55863 12.916C8.83063 13.348 8.96663 13.892 8.96663 14.548C8.96663 15.204 8.80929 15.764 8.49463 16.228C8.18529 16.692 7.73996 17.0467 7.15863 17.292C6.58263 17.5373 5.89196 17.66 5.08663 17.66ZM15.0293 17.652C14.1759 17.652 13.4213 17.4627 12.7653 17.084C12.1146 16.7 11.6026 16.1773 11.2293 15.516C10.8613 14.8493 10.6773 14.092 10.6773 13.244C10.6773 12.396 10.8613 11.644 11.2293 10.988C11.6026 10.332 12.1146 9.81733 12.7653 9.444C13.4213 9.07067 14.1759 8.884 15.0293 8.884C15.8826 8.884 16.6346 9.07067 17.2853 9.444C17.9413 9.81733 18.4533 10.332 18.8212 10.988C19.1946 11.644 19.3813 12.396 19.3813 13.244C19.3813 14.092 19.1946 14.8493 18.8212 15.516C18.4533 16.1773 17.9413 16.7 17.2853 17.084C16.6346 17.4627 15.8826 17.652 15.0293 17.652ZM15.0293 16.404C15.6159 16.404 16.1333 16.2733 16.5813 16.012C17.0293 15.7507 17.3786 15.3827 17.6293 14.908C17.8853 14.4333 18.0133 13.8787 18.0133 13.244C18.0133 12.6093 17.8853 12.06 17.6293 11.596C17.3786 11.1267 17.0293 10.7667 16.5813 10.516C16.1333 10.26 15.6159 10.132 15.0293 10.132C14.4479 10.132 13.9306 10.26 13.4773 10.516C13.0293 10.7667 12.6773 11.1267 12.4213 11.596C12.1706 12.06 12.0453 12.6093 12.0453 13.244C12.0453 13.8787 12.1706 14.4333 12.4213 14.908C12.6773 15.3827 13.0293 15.7507 13.4773 16.012C13.9306 16.2733 14.4479 16.404 15.0293 16.404ZM21.5053 17.5V9.004H22.8653V11.612L22.4173 11.452C22.4493 11.1373 22.5293 10.828 22.6573 10.524C22.7853 10.2147 22.9613 9.93733 23.1853 9.692C23.4146 9.44133 23.6999 9.244 24.0413 9.1C24.3826 8.95067 24.7826 8.876 25.2413 8.876C25.5826 8.876 25.8599 8.90533 26.0733 8.964C26.2919 9.01733 26.4279 9.06 26.4813 9.092L26.1293 10.428C26.0759 10.3907 25.9666 10.3427 25.8013 10.284C25.6413 10.2253 25.4119 10.196 25.1133 10.196C24.6706 10.196 24.3026 10.276 24.0093 10.436C23.7213 10.596 23.4919 10.8093 23.3213 11.076C23.1559 11.3373 23.0386 11.6227 22.9693 11.932C22.8999 12.2413 22.8653 12.548 22.8653 12.852V17.5H21.5053ZM31.3028 17.628C31.0414 17.628 30.7854 17.5987 30.5348 17.54C30.2841 17.4813 30.0574 17.3773 29.8548 17.228C29.6574 17.0733 29.5001 16.8573 29.3828 16.58C29.2654 16.2973 29.2068 15.9347 29.2068 15.492C29.2068 15.38 29.2068 15.2653 29.2068 15.148C29.2068 15.0253 29.2068 14.8973 29.2068 14.764V10.204H27.1348V9.004H28.4628C28.6441 9.004 28.7854 8.99867 28.8868 8.988C28.9881 8.972 29.0601 8.93733 29.1028 8.884C29.1508 8.82533 29.1801 8.73733 29.1908 8.62C29.2014 8.49733 29.2068 8.32933 29.2068 8.116V6.188H30.5748V9.004H33.2308V10.204H30.5748V14.324C30.5748 14.4413 30.5748 14.556 30.5748 14.668C30.5748 14.78 30.5748 14.884 30.5748 14.98C30.5748 15.4333 30.6281 15.788 30.7348 16.044C30.8468 16.3 31.0948 16.428 31.4788 16.428C31.6334 16.428 31.7801 16.4147 31.9188 16.388C32.0574 16.3613 32.1614 16.3347 32.2308 16.308V17.492C32.1401 17.524 32.0121 17.5533 31.8468 17.58C31.6868 17.612 31.5054 17.628 31.3028 17.628ZM43.126 17.66C42.47 17.66 41.8567 17.5 41.286 17.18C40.7153 16.8547 40.2513 16.4093 39.894 15.844C39.542 15.2787 39.366 14.6333 39.366 13.908C39.366 13.892 39.366 13.8787 39.366 13.868C39.366 13.8573 39.366 13.844 39.366 13.828L40.342 13.804C40.342 13.8147 40.342 13.828 40.342 13.844C40.342 13.8547 40.342 13.8653 40.342 13.876C40.342 14.3347 40.462 14.7533 40.702 15.132C40.9473 15.5107 41.2673 15.812 41.662 16.036C42.0567 16.26 42.4807 16.372 42.934 16.372C43.686 16.372 44.31 16.116 44.806 15.604C45.3073 15.0867 45.558 14.3 45.558 13.244C45.558 12.1827 45.31 11.3987 44.814 10.892C44.318 10.38 43.6913 10.124 42.934 10.124C42.4807 10.124 42.0567 10.236 41.662 10.46C41.2673 10.6787 40.9473 10.9747 40.702 11.348C40.462 11.7213 40.342 12.14 40.342 12.604L39.366 12.572C39.366 11.8413 39.542 11.1987 39.894 10.644C40.2513 10.0893 40.7153 9.65733 41.286 9.348C41.8567 9.03333 42.47 8.876 43.126 8.876C43.814 8.876 44.4487 9.04667 45.03 9.388C45.6113 9.724 46.078 10.2173 46.43 10.868C46.782 11.5187 46.958 12.3107 46.958 13.244C46.958 14.1933 46.7847 14.9987 46.438 15.66C46.0913 16.316 45.6273 16.8147 45.046 17.156C44.4647 17.492 43.8247 17.66 43.126 17.66ZM38.974 17.5V4.996H40.342V17.5H38.974ZM48.8238 21.084C48.6104 21.084 48.4158 21.0707 48.2398 21.044C48.0638 21.0227 47.9544 21.0013 47.9118 20.98V19.796C47.9811 19.828 48.0958 19.8547 48.2558 19.876C48.4158 19.8973 48.5758 19.908 48.7358 19.908C49.0771 19.908 49.3651 19.836 49.5998 19.692C49.8344 19.5533 50.0318 19.3613 50.1918 19.116C50.3518 18.876 50.4824 18.604 50.5838 18.3L50.8398 17.548L47.9118 9.004H49.3358L51.6878 16.324H51.4958L53.7998 9.004H55.1998L52.0878 18.228C51.9118 18.7453 51.6984 19.22 51.4478 19.652C51.2024 20.084 50.8718 20.4307 50.4558 20.692C50.0451 20.9533 49.5011 21.084 48.8238 21.084ZM56.931 17.708C56.6697 17.708 56.4483 17.62 56.267 17.444C56.091 17.2627 56.003 17.0413 56.003 16.78C56.003 16.524 56.091 16.3053 56.267 16.124C56.4483 15.9427 56.6697 15.852 56.931 15.852C57.187 15.852 57.4057 15.9427 57.587 16.124C57.7683 16.3053 57.859 16.524 57.859 16.78C57.859 17.0413 57.7683 17.2627 57.587 17.444C57.4057 17.62 57.187 17.708 56.931 17.708ZM56.939 11.244C56.6777 11.244 56.4563 11.156 56.275 10.98C56.099 10.7987 56.011 10.5773 56.011 10.316C56.011 10.06 56.099 9.84133 56.275 9.66C56.4563 9.47867 56.6777 9.388 56.939 9.388C57.195 9.388 57.4137 9.47867 57.595 9.66C57.7763 9.84133 57.867 10.06 57.867 10.316C57.867 10.5773 57.7763 10.7987 57.595 10.98C57.4137 11.156 57.195 11.244 56.939 11.244Z"
                  fill="#7C8493"
                />
                <path
                  d="M80.4 5.7H83.368V17.5H81.72V6.916L81.768 6.932L78.992 17.5H76.608L73.808 6.924L73.856 6.9V17.5H72.2V5.7H75.168L77.816 16.38H77.736L80.4 5.7ZM89.8181 17.66C88.9435 17.66 88.1701 17.4707 87.4981 17.092C86.8315 16.7133 86.3088 16.1933 85.9301 15.532C85.5568 14.8653 85.3701 14.1027 85.3701 13.244C85.3701 12.3907 85.5568 11.636 85.9301 10.98C86.3088 10.3187 86.8315 9.804 87.4981 9.436C88.1701 9.06267 88.9435 8.876 89.8181 8.876C90.6928 8.876 91.4635 9.06267 92.1301 9.436C92.8021 9.804 93.3248 10.3187 93.6981 10.98C94.0768 11.636 94.2661 12.3907 94.2661 13.244C94.2661 14.1027 94.0768 14.8653 93.6981 15.532C93.3248 16.1933 92.8021 16.7133 92.1301 17.092C91.4635 17.4707 90.6928 17.66 89.8181 17.66ZM89.8181 16.172C90.3515 16.172 90.8208 16.052 91.2261 15.812C91.6315 15.572 91.9488 15.2333 92.1781 14.796C92.4075 14.3533 92.5221 13.836 92.5221 13.244C92.5221 12.6573 92.4075 12.148 92.1781 11.716C91.9488 11.284 91.6315 10.9507 91.2261 10.716C90.8208 10.4813 90.3515 10.364 89.8181 10.364C89.2901 10.364 88.8208 10.4813 88.4101 10.716C88.0048 10.9507 87.6875 11.284 87.4581 11.716C87.2288 12.148 87.1141 12.6573 87.1141 13.244C87.1141 13.836 87.2288 14.3533 87.4581 14.796C87.6875 15.2333 88.0048 15.572 88.4101 15.812C88.8208 16.052 89.2901 16.172 89.8181 16.172ZM99.5425 17.668C99.0358 17.668 98.5585 17.612 98.1105 17.5C97.6625 17.388 97.2678 17.2253 96.9265 17.012C96.5905 16.7933 96.3265 16.524 96.1345 16.204C95.9478 15.884 95.8545 15.5133 95.8545 15.092C95.8545 15.0547 95.8545 15.0173 95.8545 14.98C95.8545 14.9373 95.8545 14.9027 95.8545 14.876H97.5825C97.5825 14.9027 97.5825 14.9267 97.5825 14.948C97.5825 14.9693 97.5825 14.9987 97.5825 15.036C97.5825 15.4253 97.7612 15.7213 98.1185 15.924C98.4812 16.1213 98.9718 16.22 99.5905 16.22C99.9532 16.22 100.284 16.1827 100.583 16.108C100.887 16.0333 101.127 15.9187 101.303 15.764C101.484 15.6093 101.575 15.412 101.575 15.172C101.575 14.7827 101.383 14.5053 100.999 14.34C100.62 14.1747 100.044 14.028 99.2705 13.9C98.8492 13.8253 98.4412 13.7293 98.0465 13.612C97.6572 13.4947 97.3052 13.34 96.9905 13.148C96.6812 12.9507 96.4332 12.708 96.2465 12.42C96.0652 12.1267 95.9745 11.7747 95.9745 11.364C95.9745 10.8307 96.1345 10.3773 96.4545 10.004C96.7745 9.63067 97.2065 9.348 97.7505 9.156C98.2945 8.964 98.8945 8.868 99.5505 8.868C100.185 8.868 100.772 8.972 101.311 9.18C101.855 9.38267 102.292 9.67867 102.623 10.068C102.953 10.452 103.119 10.924 103.119 11.484C103.119 11.5053 103.119 11.5293 103.119 11.556C103.119 11.5827 103.119 11.6067 103.119 11.628H101.399C101.399 11.6067 101.399 11.588 101.399 11.572C101.399 11.556 101.399 11.5373 101.399 11.516C101.399 11.2387 101.311 11.012 101.135 10.836C100.959 10.66 100.729 10.5293 100.447 10.444C100.169 10.3533 99.8732 10.308 99.5585 10.308C99.2705 10.308 98.9798 10.34 98.6865 10.404C98.3985 10.4627 98.1585 10.5667 97.9665 10.716C97.7745 10.86 97.6785 11.0573 97.6785 11.308C97.6785 11.564 97.7718 11.7693 97.9585 11.924C98.1452 12.0733 98.4092 12.1987 98.7505 12.3C99.0918 12.396 99.4892 12.484 99.9425 12.564C100.359 12.6387 100.764 12.7347 101.159 12.852C101.553 12.964 101.908 13.1133 102.223 13.3C102.543 13.4867 102.796 13.7267 102.983 14.02C103.175 14.3133 103.271 14.6733 103.271 15.1C103.271 15.5427 103.169 15.924 102.967 16.244C102.764 16.564 102.487 16.8307 102.135 17.044C101.788 17.252 101.391 17.4067 100.943 17.508C100.5 17.6147 100.033 17.668 99.5425 17.668ZM108.674 17.644C108.392 17.644 108.109 17.6147 107.826 17.556C107.549 17.4973 107.293 17.3907 107.058 17.236C106.829 17.076 106.645 16.8493 106.506 16.556C106.368 16.2627 106.298 15.8787 106.298 15.404C106.298 15.292 106.298 15.1747 106.298 15.052C106.298 14.9293 106.298 14.804 106.298 14.676V10.444H104.258V9.004H105.33C105.56 9.004 105.738 8.996 105.866 8.98C106 8.95867 106.096 8.91333 106.154 8.844C106.218 8.76933 106.258 8.652 106.274 8.492C106.29 8.332 106.298 8.11333 106.298 7.836V6.196H108.034V9.004H110.634V10.444H108.034V14.212C108.034 14.3187 108.034 14.4253 108.034 14.532C108.034 14.6387 108.034 14.7373 108.034 14.828C108.034 15.2547 108.085 15.5907 108.186 15.836C108.293 16.0813 108.533 16.204 108.906 16.204C109.066 16.204 109.218 16.1907 109.362 16.164C109.506 16.1373 109.616 16.108 109.69 16.076V17.492C109.594 17.5293 109.458 17.564 109.282 17.596C109.106 17.628 108.904 17.644 108.674 17.644ZM116.292 17.5V9.004H118.028V11.716L117.564 11.508C117.602 11.1613 117.69 10.8307 117.828 10.516C117.967 10.2013 118.151 9.92133 118.38 9.676C118.615 9.42533 118.903 9.228 119.244 9.084C119.586 8.94 119.98 8.868 120.428 8.868C120.77 8.868 121.044 8.89467 121.252 8.948C121.466 9.00133 121.596 9.044 121.644 9.076L121.276 10.708C121.223 10.6707 121.114 10.6227 120.948 10.564C120.788 10.5053 120.564 10.476 120.276 10.476C119.839 10.476 119.476 10.5533 119.188 10.708C118.9 10.8627 118.671 11.068 118.5 11.324C118.33 11.58 118.207 11.86 118.132 12.164C118.063 12.4627 118.028 12.764 118.028 13.068V17.5H116.292ZM123.502 13.86V12.508H129.758L129.518 12.908C129.518 12.876 129.518 12.844 129.518 12.812C129.518 12.7747 129.518 12.7427 129.518 12.716C129.518 12.284 129.425 11.8867 129.238 11.524C129.051 11.156 128.771 10.8627 128.398 10.644C128.03 10.42 127.569 10.308 127.014 10.308C126.459 10.308 125.971 10.428 125.55 10.668C125.134 10.9027 124.809 11.2387 124.574 11.676C124.345 12.108 124.23 12.628 124.23 13.236C124.23 13.8547 124.342 14.388 124.566 14.836C124.79 15.2787 125.113 15.62 125.534 15.86C125.955 16.1 126.459 16.22 127.046 16.22C127.457 16.22 127.811 16.18 128.11 16.1C128.414 16.0147 128.662 15.9027 128.854 15.764C129.051 15.6253 129.201 15.476 129.302 15.316C129.403 15.1507 129.462 14.988 129.478 14.828H131.206C131.174 15.1747 131.059 15.5187 130.862 15.86C130.67 16.196 130.395 16.5027 130.038 16.78C129.686 17.052 129.254 17.2707 128.742 17.436C128.235 17.596 127.651 17.676 126.99 17.676C126.105 17.676 125.329 17.4893 124.662 17.116C123.995 16.7427 123.475 16.2253 123.102 15.564C122.729 14.8973 122.542 14.1347 122.542 13.276C122.542 12.4013 122.731 11.6333 123.11 10.972C123.489 10.3107 124.014 9.796 124.686 9.428C125.358 9.05467 126.129 8.868 126.998 8.868C127.883 8.868 128.649 9.05467 129.294 9.428C129.945 9.80133 130.446 10.316 130.798 10.972C131.15 11.628 131.326 12.3827 131.326 13.236C131.326 13.3373 131.323 13.4547 131.318 13.588C131.313 13.7213 131.305 13.812 131.294 13.86H123.502ZM135.093 4.996V17.5H133.381V4.996H135.093ZM138.033 13.86V12.508H144.289L144.049 12.908C144.049 12.876 144.049 12.844 144.049 12.812C144.049 12.7747 144.049 12.7427 144.049 12.716C144.049 12.284 143.956 11.8867 143.769 11.524C143.583 11.156 143.303 10.8627 142.929 10.644C142.561 10.42 142.1 10.308 141.545 10.308C140.991 10.308 140.503 10.428 140.081 10.668C139.665 10.9027 139.34 11.2387 139.105 11.676C138.876 12.108 138.761 12.628 138.761 13.236C138.761 13.8547 138.873 14.388 139.097 14.836C139.321 15.2787 139.644 15.62 140.065 15.86C140.487 16.1 140.991 16.22 141.577 16.22C141.988 16.22 142.343 16.18 142.641 16.1C142.945 16.0147 143.193 15.9027 143.385 15.764C143.583 15.6253 143.732 15.476 143.833 15.316C143.935 15.1507 143.993 14.988 144.009 14.828H145.737C145.705 15.1747 145.591 15.5187 145.393 15.86C145.201 16.196 144.927 16.5027 144.569 16.78C144.217 17.052 143.785 17.2707 143.273 17.436C142.767 17.596 142.183 17.676 141.521 17.676C140.636 17.676 139.86 17.4893 139.193 17.116C138.527 16.7427 138.007 16.2253 137.633 15.564C137.26 14.8973 137.073 14.1347 137.073 13.276C137.073 12.4013 137.263 11.6333 137.641 10.972C138.02 10.3107 138.545 9.796 139.217 9.428C139.889 9.05467 140.66 8.868 141.529 8.868C142.415 8.868 143.18 9.05467 143.825 9.428C144.476 9.80133 144.977 10.316 145.329 10.972C145.681 11.628 145.857 12.3827 145.857 13.236C145.857 13.3373 145.855 13.4547 145.849 13.588C145.844 13.7213 145.836 13.812 145.825 13.86H138.033ZM154.623 9.004L151.871 17.5H149.567L146.743 9.004H148.535L150.855 16.772H150.583L152.831 9.004H154.623ZM158.658 17.668C158.018 17.668 157.455 17.5667 156.97 17.364C156.49 17.1613 156.117 16.8707 155.85 16.492C155.583 16.1133 155.45 15.6573 155.45 15.124C155.45 14.5533 155.599 14.0813 155.898 13.708C156.202 13.3347 156.618 13.0467 157.146 12.844C157.679 12.636 158.285 12.5 158.962 12.436C159.97 12.3347 160.679 12.236 161.09 12.14C161.506 12.044 161.714 11.8867 161.714 11.668C161.714 11.6627 161.714 11.6573 161.714 11.652C161.714 11.22 161.53 10.892 161.162 10.668C160.794 10.444 160.269 10.332 159.586 10.332C158.866 10.332 158.309 10.46 157.914 10.716C157.525 10.9667 157.33 11.3667 157.33 11.916H155.626C155.626 11.2653 155.794 10.7133 156.13 10.26C156.471 9.80667 156.941 9.46267 157.538 9.228C158.135 8.988 158.821 8.868 159.594 8.868C160.303 8.868 160.949 8.97733 161.53 9.196C162.117 9.40933 162.583 9.72933 162.93 10.156C163.277 10.5827 163.45 11.1133 163.45 11.748C163.45 11.86 163.45 11.972 163.45 12.084C163.45 12.1907 163.45 12.3 163.45 12.412V15.804C163.45 16.0013 163.458 16.1933 163.474 16.38C163.49 16.5613 163.519 16.724 163.562 16.868C163.61 17.0333 163.666 17.1693 163.73 17.276C163.799 17.3827 163.855 17.4573 163.898 17.5H162.17C162.138 17.468 162.09 17.4013 162.026 17.3C161.967 17.1933 161.914 17.0707 161.866 16.932C161.818 16.7987 161.781 16.6467 161.754 16.476C161.733 16.3 161.722 16.1107 161.722 15.908L162.042 16.132C161.882 16.4413 161.639 16.7107 161.314 16.94C160.994 17.1693 160.607 17.348 160.154 17.476C159.706 17.604 159.207 17.668 158.658 17.668ZM159.018 16.228C159.514 16.228 159.965 16.1507 160.37 15.996C160.781 15.836 161.109 15.596 161.354 15.276C161.599 14.9507 161.722 14.5427 161.722 14.052V12.644L162.13 13.18C161.789 13.3133 161.37 13.4227 160.874 13.508C160.383 13.588 159.877 13.6547 159.354 13.708C158.634 13.772 158.093 13.8973 157.73 14.084C157.367 14.2653 157.186 14.5693 157.186 14.996C157.186 15.4067 157.335 15.716 157.634 15.924C157.938 16.1267 158.399 16.228 159.018 16.228ZM171.606 17.5V13.58C171.606 13.3507 171.606 13.156 171.606 12.996C171.606 12.836 171.606 12.6867 171.606 12.548C171.606 12.132 171.542 11.7667 171.414 11.452C171.286 11.132 171.075 10.884 170.782 10.708C170.489 10.5267 170.097 10.436 169.606 10.436C169.174 10.436 168.782 10.5427 168.43 10.756C168.083 10.9693 167.806 11.26 167.598 11.628C167.395 11.9907 167.294 12.404 167.294 12.868L166.55 12.5C166.55 11.812 166.713 11.196 167.038 10.652C167.363 10.1027 167.798 9.668 168.342 9.348C168.891 9.028 169.491 8.868 170.142 8.868C170.814 8.868 171.387 8.99867 171.862 9.26C172.342 9.516 172.707 9.884 172.958 10.364C173.214 10.8387 173.342 11.4067 173.342 12.068C173.342 12.3133 173.342 12.5853 173.342 12.884C173.342 13.1827 173.342 13.4707 173.342 13.748V17.5H171.606ZM165.558 17.5V9.004H167.294V17.5H165.558ZM178.94 17.644C178.657 17.644 178.375 17.6147 178.092 17.556C177.815 17.4973 177.559 17.3907 177.324 17.236C177.095 17.076 176.911 16.8493 176.772 16.556C176.633 16.2627 176.564 15.8787 176.564 15.404C176.564 15.292 176.564 15.1747 176.564 15.052C176.564 14.9293 176.564 14.804 176.564 14.676V10.444H174.524V9.004H175.596C175.825 9.004 176.004 8.996 176.132 8.98C176.265 8.95867 176.361 8.91333 176.42 8.844C176.484 8.76933 176.524 8.652 176.54 8.492C176.556 8.332 176.564 8.11333 176.564 7.836V6.196H178.3V9.004H180.9V10.444H178.3V14.212C178.3 14.3187 178.3 14.4253 178.3 14.532C178.3 14.6387 178.3 14.7373 178.3 14.828C178.3 15.2547 178.351 15.5907 178.452 15.836C178.559 16.0813 178.799 16.204 179.172 16.204C179.332 16.204 179.484 16.1907 179.628 16.164C179.772 16.1373 179.881 16.108 179.956 16.076V17.492C179.86 17.5293 179.724 17.564 179.548 17.596C179.372 17.628 179.169 17.644 178.94 17.644Z"
                  fill="#25324B"
                />
                <path
                  d="M202.667 11.167L198 15.8337L193.333 11.167"
                  stroke="#4640DE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <Grid container spacing={3}>
            {companies.map((company, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={idx}
                onClick={() => handleDetails(company.id)}
              >
                <div className="h-100 border p-4 rounded-md cursor-pointer">
                  <div className="flex align-center mb-4">
                    <img
                      src={"/assets/images/Companylogo.png"}
                      alt={company.name}
                      className="me-3"
                      style={{ width: 50, height: 50 }}
                    />
                    <div>
                      <Typography variant="h6">{company.name}</Typography>
                      <Typography variant="caption">
                        {company.jobs} Jobs
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="body2" className="mb-2">
                    {company.description}
                  </Typography>
                  <div className="flex flex-wrap">
                    {company.tags.map((tag, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        className="p-1 border rounded"
                        marginTop={1}
                        marginRight={1}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination count={10} color="primary" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FindRequirements;
