import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  AccessTimeOutlined,
  DownloadOutlined,
  Edit,
  EmailOutlined,
  LinkedIn,
  Phone,
} from "@mui/icons-material";
import { Button, Chip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const skills = ["React js", "jQuery", "Angular", "React native", "Android"];
const certifications = ["AWS", "Azure", "Scrum Master", "PMP"];
export default function BenchPreview({ benchData = {} }: any) {
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
      <div className="w-full flex flex-wrap" id="printSection">
        <div className="p-6 w-[70%] mx-auto space-y-4 border-e">
          <div className="flex justify-between">
            <div className="flex">
              <img
                src={"/assets/images/Avatar.png"}
                alt="resource image"
                style={{ height: 60, width: 60 }}
              />
              <div className="ms-2">
                <p className="text-title font-bold">
                  {benchData?.profile?.name || "-"}
                </p>
                <p className="text-base">{benchData?.profile?.title || "-"}</p>
                <p className="text-base">
                  <AccessTimeOutlined fontSize="inherit" />{" "}
                  {benchData?.profile?.experience || "-"}
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
            <p className="text-base">{benchData?.profile?.objective || "-"}</p>
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
            <div className="text-base">
              <HtmlRenderer content={benchData?.summary} />
            </div>
          </div>

          {/* <div>
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
          </div> */}

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
            {benchData?.projects?.length > 0 &&
              benchData?.projects?.map((project: any, idx: number) => (
                <>
                  <p className="text-base font-bold">
                    Title: {project?.title || "-"}
                  </p>{" "}
                  <p className="text-base">Role: {project?.role || "-"}</p>
                  <p>Description: {project?.description || "-"}</p>
                  <p>Responsibilities:</p>
                  {project?.responsibilities?.length > 0 && (
                    <ul className="text-base list-disc ps-4">
                      {project?.responsibilities.map(
                        (item: any, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  )}
                </>
              ))}
            {/* <p className="text-base font-bold mt-6">Title: Treatians </p>{" "}
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
            </ul> */}
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
              {benchData?.contact_details?.email && (
                <li>
                  <a
                    className="text-base hover:text-indigo-700"
                    href={`mailto:${benchData?.contact_details?.email}`}
                  >
                    <EmailOutlined fontSize="inherit" className="me-1" />
                    {benchData?.contact_details?.email}
                  </a>
                </li>
              )}
              {benchData?.contact_details?.phone && (
                <li>
                  <a
                    className="text-base hover:text-indigo-700"
                    href={`tel:${benchData?.contact_details?.phone}`}
                  >
                    <Phone fontSize="inherit" className="me-1" />
                    {benchData?.contact_details?.phone}
                  </a>
                </li>
              )}
              {benchData?.contact_details?.linkedin && (
                <li>
                  <a
                    className="text-base hover:text-indigo-700"
                    href={benchData?.contact_details?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn fontSize="inherit" className="me-1" />
                    {benchData?.contact_details?.linkedin}
                  </a>
                </li>
              )}
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
            {benchData?.certifications?.length > 0 &&
              benchData?.certifications?.map((item: any) => (
                <>
                  <Chip
                    key={item}
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
            {benchData?.top_skills?.length > 0 &&
              benchData?.top_skills?.map((item: any) => (
                <>
                  <Chip
                    key={item}
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
            {benchData?.education?.length > 0 &&
              benchData?.education?.map((item: any, index: number) => (
                <p className="text-base mt-2" key={index}>
                  {item}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
