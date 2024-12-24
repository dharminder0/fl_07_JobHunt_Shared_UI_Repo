import {
  AccessTimeOutlined,
  Download,
  DownloadOutlined,
  Edit,
  Email,
  EmailOutlined,
  LinkedIn,
  Phone,
  Timelapse,
  TimeToLeaveOutlined,
} from "@mui/icons-material";
import { Button, Chip, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const skills = ["React js", "jQuery", "Angular", "React native", "Android"];
const certifications = ["AWS", "Azure", "Scrum Master", "PMP"];
export default function BenchPreview() {
  const PrintDocument = () => {
    const printContent = document.getElementById("printSection");
    if (printContent) {
      const originalContent = document.body.innerHTML; // Backup original body content
      document.body.innerHTML = printContent.outerHTML; // Replace body with print content

      window.print(); // Open print dialog

      document.body.innerHTML = originalContent; // Restore original content
      window.location.reload(); // Reload to avoid DOM inconsistencies
    } else {
      console.error(`Element with ID printSection not found.`);
    }
  };

  return (
    <>
      {/* body */}
      <div
        className="w-full flex overflow-auto h-[calc(100%-38px)] flex-wrap"
        id="printSection"
      >
        <div className="p-6 w-[70%] mx-auto space-y-4 border-e">
          <div className="flex justify-between">
            <div className="flex">
              <img
                src={"/assets/images/Avatar.png"}
                alt="resource image"
                style={{ height: 60, width: 60 }}
              />
              <div className="ms-2">
                <p className="text-title font-bold">Raj Pathar</p>
                <p className="text-base">Software Associate</p>
                <p className="text-base">
                  <AccessTimeOutlined fontSize="inherit" /> 8 years
                </p>
              </div>
            </div>
            <div>
              <Button
                startIcon={<DownloadOutlined fontSize="inherit" />}
                onClick={PrintDocument}
              >
                Download
              </Button>
            </div>
          </div>

          <div>
            <p className="text-title font-bold group/item flex items-center mb-1">
              Objective
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <p className="text-base">
              A highly motivated front-end developer with 4+ years of experience
              in creating interactive and responsive web applications.
              Proficient in Bootstrap, JavaScript, and jQuery, and skilled in
              using modern frameworks like React and React Native for both web
              and mobile development.
            </p>
          </div>

          <div>
            <p className="text-title font-bold group/item flex items-center mb-1">
              Summary
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <ul className="text-base list-disc ps-4">
              <li>
                Develop and maintain React Native applications for iOS and
                Android, improving mobile user experience.
              </li>
              <li>
                Create and optimize React web applications, utilizing TypeScript
                and JavaScript for responsive, interactive user interfaces.
              </li>
              <li>
                Implement REST APIs to connect applications to back-end
                services, enhancing functionality.
              </li>
              <li>
                Leverage HTML, CSS, Bootstrap, and jQuery to build responsive
                web interfaces.
              </li>
              <li>
                Use Git and GitHub for version control, ensuring efficient
                collaboration and code management.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-title font-bold group/item flex items-center mb-1">
              Technical Skills
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <ul className="text-base list-disc ps-4">
              <li>
                Frontend Technologies: Bootstrap, JavaScript, jQuery, HTML, CSS,
                SCSS, TypeScript, JavaScript
              </li>
              <li>Frameworks & Libraries: React, React Native</li>
              <li>Mobile Development: iOS, Android</li>
              <li>Version Control: GitHub, Bitbucket</li>
            </ul>
          </div>

          <div className="text-base space-y-2">
            <p className="text-title font-bold group/item flex items-center mb-2">
              Projects
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <p className="text-base font-bold">Title: Yomentor</p>{" "}
            <p className="text-base">Role: Frontend Development</p>
            <p>Description:</p>
            <p>
              An AI-powered platform designed for students preparing for
              competitive exams like CAT, JEE, and NEET. The platform generates
              customized tests based on user-selected subjects, topics,
              difficulty levels, and question types.
            </p>
            <p>Responsibilities:</p>
            <ul className="text-base list-disc ps-4">
              <li>
                Frontend Technologies: Bootstrap, JavaScript, jQuery, HTML, CSS,
                SCSS, TypeScript, JavaScript
              </li>
              <li>Frameworks & Libraries: React, React Native</li>
              <li>Mobile Development: iOS, Android</li>
              <li>Version Control: GitHub, Bitbucket</li>
            </ul>
            <p className="text-base font-bold mt-6">Title: Treatians </p>{" "}
            <p className="text-base">Role: Frontend Development</p>
            <p>Description:</p>
            <p>
              Treatians is an innovative medical tourism facilitator that unites
              top healthcare services, facilities, and doctors from across India
              on one seamless digital platform. We empower health-seekers to
              effortlessly book consultations, treatments, and medical travel,
              eliminating the hassle of navigating multiple providers. Our
              commitment to transparency, affordability, and quality ensures a
              value-driven healthcare experience, eradicating unfair pricing and
              enhancing patient satisfaction.
            </p>
            <p>Responsibilities:</p>
            <ul className="text-base list-disc ps-4">
              <li>
                Frontend Technologies: Bootstrap, JavaScript, jQuery, HTML, CSS,
                SCSS, TypeScript, JavaScript
              </li>
              <li>Frameworks & Libraries: React, React Native</li>
              <li>Mobile Development: iOS, Android</li>
              <li>Version Control: GitHub, Bitbucket</li>
            </ul>
          </div>
        </div>
        <div className="p-4 w-[30%] mx-auto space-y-4 bg-gray-100">
          <div className="space-y-2 mt-12">
            <p className="text-title group/item flex items-center">
              Contact Detail
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <ul>
              <li>
                <Link
                  className="text-base hover:text-indigo-700"
                  to={"mailto:raj@fleekitsolutions.com"}
                >
                  <EmailOutlined fontSize="inherit" className="me-1" />
                  raj@fleekitsolutions.com
                </Link>
              </li>
              <li>
                <Link
                  className="text-base hover:text-indigo-700"
                  to={"tel:9111292929"}
                >
                  <Phone fontSize="inherit" className="me-1" />
                  9111292929
                </Link>
              </li>
              <li>
                <Link
                  className="text-base hover:text-indigo-700"
                  to={"https://www.linkedin.com/in/bertjan-wolfs-24593b59"}
                >
                  <LinkedIn fontSize="inherit" className="me-1" />
                  https://www.linkedin.com/in/bertjan-wolfs-24593b59
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-title group/item flex items-center">
              Certifications
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {certifications.map((item) => (
              <>
                <Chip
                  label={item}
                  variant="outlined"
                  sx={{ fontSize: 12 }}
                  className="my-1 me-1"
                />
              </>
            ))}
          </div>
          <div>
            <p className="text-title group/item flex items-center">
              Top Skills
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {skills.map((item) => (
              <>
                <Chip
                  label={item}
                  variant="outlined"
                  sx={{ fontSize: 12 }}
                  className="my-1 me-1"
                />
              </>
            ))}
          </div>

          <div>
            <p className="text-title group/item flex items-center">
              Education
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700">
                  <IconButton
                    aria-label="edit"
                    sx={{ marginLeft: 1 }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <p className="text-base mt-2">
              BTech in Computer Science and Engineering
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
