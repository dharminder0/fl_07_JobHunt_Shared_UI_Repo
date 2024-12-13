import React from "react";
import { Box, Typography, Button, Paper, Divider, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RequirementDescription() {
  return (
    <Box>
      {/* Header */}
      {/* <Box className="flex justify-between items-start mb-4">
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
        </Box> */}

      <div>
        {/* Description */}
        <div className="mb-4 mt-2">
          <p className="text-gray-600 text-base">
            Stripe is looking for a Social Media Marketing expert to help manage
            our online networks. You will be responsible for monitoring our
            social media channels, creating content, finding effective ways to
            engage the community and incentivize others to engage on our
            channels.
          </p>
        </div>

        {/* Responsibilities */}
        <Box className="mb-4">
          <p className="text-title mb-2">Responsibilities</p>
          <ul className="list-none space-y-1">
            {[
              "Community engagement to ensure that is supported and actively represented online",
              "Focus on social media content development and publication",
              "Marketing and strategy support",
              "Stay on top of trends on social media platforms, and suggest content ideas to the team",
              "Engage with online communities",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 text-base"
              >
                {/* <CheckCircleIcon
                  className="text-green-500 mr-2"
                  fontSize="small"
                /> */}
                {item}
              </li>
            ))}
          </ul>
        </Box>

        {/* Who You Are */}
        <Box className="mb-4">
          <p className="text-gray-700 mb-2 text-title">Who You Are</p>
          <ul className="list-none space-y-1">
            {[
              "You get energy from people and building the ideal work environment",
              "You have a sense for beautiful spaces and office experiences",
              "You are a confident office manager, ready for added responsibilities",
              "You're detail-oriented and creative",
              "You're a growth marketer and know how to run campaigns",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 text-base"
              >
                {/* <CheckCircleIcon
                  className="text-green-500 mr-2"
                  fontSize="small"
                /> */}
                {item}
              </li>
            ))}
          </ul>
        </Box>

        {/* Nice-To-Haves */}
        <Box className="mb-6">
          <p className="text-title text-gray-700 mb-2">Nice-To-Haves</p>
          <ul className="list-none space-y-1">
            {[
              "Fluent in English",
              "Project management skills",
              "Copy editing skills",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-600 text-base"
              >
                {/* <CheckCircleIcon
                  className="text-green-500 mr-2"
                  fontSize="small"
                /> */}
                {item}
              </li>
            ))}
          </ul>
        </Box>
      </div>

      {/* Perks & Benefits */}
      {/* <Box>
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
      </Box> */}
    </Box>
  );
}
