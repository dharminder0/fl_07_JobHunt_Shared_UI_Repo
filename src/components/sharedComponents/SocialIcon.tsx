import React, { JSX } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Mapping social platform names to their corresponding MUI icons
const platformIcons: { [key: string]: JSX.Element } = {
  facebook: <FacebookIcon fontSize="small" color="primary" />,
  linkedin: <LinkedInIcon fontSize="small" color="primary" />,
  github: <GitHubIcon fontSize="small" color="primary" />,
  twitter: <TwitterIcon fontSize="small" color="primary" />,
  instagram: <InstagramIcon fontSize="small" color="primary" />,
  youtube: <YouTubeIcon fontSize="small" color="primary" />,
};

interface SocialIconProps {
  platform: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform }) => {
  return platformIcons[platform.toLowerCase()]; // Default to GitHub if unknown
};

export default SocialIcon;
