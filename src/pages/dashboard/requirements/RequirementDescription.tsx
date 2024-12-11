import React from "react";
import { Box, Typography, Button, Paper, Divider, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RequirementDescription() {
  return (
    <Box className="min-h-screen">
      <Paper className="p-6">
        {/* Header */}
        <Box className="flex justify-between items-start mb-4">
          <Typography variant="h5" className="font-bold text-gray-800">
            Social Media Assistant
          </Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            className="text-purple-600 border-purple-600 hover:bg-purple-50"
          >
            Edit Job Details
          </Button>
        </Box>

        <Divider />

        <div className="flex">
          <div>
            {/* Description */}
            <Box className="mb-6 mt-4">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Description
              </Typography>
              <Typography className="text-gray-600">
                Stripe is looking for a Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </Typography>
            </Box>

            {/* Responsibilities */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Responsibilities
              </Typography>
              <ul className="list-none space-y-2">
                {[
                  "Community engagement to ensure that is supported and actively represented online",
                  "Focus on social media content development and publication",
                  "Marketing and strategy support",
                  "Stay on top of trends on social media platforms, and suggest content ideas to the team",
                  "Engage with online communities",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircleIcon className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Box>

            {/* Who You Are */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Who You Are
              </Typography>
              <ul className="list-none space-y-2">
                {[
                  "You get energy from people and building the ideal work environment",
                  "You have a sense for beautiful spaces and office experiences",
                  "You are a confident office manager, ready for added responsibilities",
                  "You're detail-oriented and creative",
                  "You're a growth marketer and know how to run campaigns",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircleIcon className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Box>

            {/* Nice-To-Haves */}
            <Box className="mb-6">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Nice-To-Haves
              </Typography>
              <ul className="list-none space-y-2">
                {[
                  "Fluent in English",
                  "Project management skills",
                  "Copy editing skills",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircleIcon className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Box>
          </div>
          <div>
            {/* About This Role */}
            <div className="p-6 mb-6 mt-4 border-2 shadow-none">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                About this role
              </Typography>
              <Box className="space-y-4">
                <Typography className="text-gray-600">
                  <strong>5 applied</strong> of 10 capacity
                </Typography>
                <Typography className="text-gray-600">
                  <strong>Apply Before:</strong> July 31, 2021
                </Typography>
                <Typography className="text-gray-600">
                  <strong>Job Posted On:</strong> July 1, 2021
                </Typography>
                <Typography className="text-gray-600">
                  <strong>Job Type:</strong> Full-Time
                </Typography>
                <Typography className="text-gray-600">
                  <strong>Salary:</strong> $75k-$85k USD
                </Typography>
              </Box>
            </div>
            {/* Categories */}
            <div className="p-6 mb-6 mt-4 border-2 shadow-none">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Categories
              </Typography>
              <Box className="flex space-x-2">
                <Chip
                  label="Marketing"
                  className="bg-purple-50 text-purple-600"
                />
                <Chip label="Design" className="bg-green-50 text-green-600" />
              </Box>
            </div>

            {/* Required Skills */}
            <div className="p-6 mb-6 mt-4 border-2 shadow-none">
              <Typography variant="h6" className="font-bold text-gray-700 mb-4">
                Required Skills
              </Typography>
              <Box className="flex space-x-2 flex-wrap">
                {[
                  "Project Management",
                  "Copywriting",
                  "English",
                  "Social Media Marketing",
                  "Copy Editing",
                ].map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    className="bg-blue-50 text-blue-600 mb-2"
                  />
                ))}
              </Box>
            </div>
          </div>
        </div>

        {/* Perks & Benefits */}
        <Box>
          <Typography variant="h6" className="font-bold text-gray-700">
            Perks & Benefits
          </Typography>
          <Box className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {[
              {
                title: "Full Healthcare",
                description: "We believe in thriving communities...",
              },
              {
                title: "Unlimited Vacation",
                description: "Flexible schedule for family and fun.",
              },
              {
                title: "Skill Development",
                description: "Learning and leveling up skills.",
              },
              {
                title: "Team Summits",
                description: "Every 6 months, a team summit.",
              },
              {
                title: "Remote Working",
                description: "Work from home, cafe, or anywhere.",
              },
              {
                title: "Commuter Benefits",
                description: "Time & energy savings.",
              },
              {
                title: "We give back.",
                description: "Donations to support organizations.",
              },
            ].map((perk, index) => (
              <div
                key={index}
                className="p-4 border-2 rounded-md hover:bg-sky-100 curson-pointer"
              >
                <Typography
                  variant="subtitle1"
                  className="font-bold text-gray-600"
                >
                  {perk.title}
                </Typography>
                <Typography variant="subtitle2" className="text-gray-500">
                  {perk.description}
                </Typography>
              </div>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
