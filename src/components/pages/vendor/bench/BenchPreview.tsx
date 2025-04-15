import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  AccessTimeOutlined,
  DownloadOutlined,
  Edit,
  EmailOutlined,
  LinkedIn,
  Phone,
  PictureAsPdf,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import { Button, Chip, IconButton, TextField } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function BenchPreview({ benchData = {} }: any) {
  const [tempBenchData, setTempBenchData] = React.useState(benchData ?? {});
  const [formStates, setFormStates] = React.useState({
    isOpen: false,
    useForm: "",
  });

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

  const handleFormStates = (useFor: string) => {
    setFormStates({ isOpen: !formStates.isOpen, useForm: useFor });
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (contentRef.current) {
      const doc = new jsPDF({
        format: "a4",
        unit: "px",
      });

      // Adding the fonts.
      doc.setFont("Poppins-Regular", "normal");

      await doc.html(contentRef.current, {
        x: 0,
        y: 0,
        html2canvas: {
          scale: 0.34, // Adjust scale as needed
          windowWidth: 595 , // Match A4 width in px
          windowHeight: 842,
        },
        callback: (doc) => {
          doc.save("document.pdf");
        },
      });
    }
  };

  const downloadDOC = () => {
    if (!contentRef.current) return;

    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Document</title></head><body>";
    const footer = "</body></html>";
    const html = header + contentRef.current.innerHTML + footer;

    const blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.doc";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocx = () => {
    if (!contentRef.current) return;

    const html = `<html><body>${contentRef.current.innerHTML}</body></html>`;
    const blob = htmlDocx.asBlob(html);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "export.docx";
    link.click();

    URL.revokeObjectURL(url); // optional cleanup
  };

  return (
    <>
      {/* body */}
      <div className="w-[70%] flex justify-end space-x-4 px-4">
        <Button
          startIcon={<PictureAsPdfOutlined fontSize="inherit" />}
          onClick={downloadPDF}
        >
          Download Pdf
        </Button>
        <Button
          startIcon={<DownloadOutlined fontSize="inherit" />}
          onClick={handleDownloadDocx}
        >
          Download Doc
        </Button>
      </div>
      <div
        className="w-full flex flex-wrap mx-auto"
        id="printSection"
        ref={contentRef}
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
                    onClick={() => handleFormStates("objective")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {formStates.isOpen && formStates.useForm === "objective" ? (
              <TextField
                value={tempBenchData?.profile?.objective}
                label="Objective"
                fullWidth
                size="small"
                onChange={(e) =>
                  setTempBenchData((prev: any) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      objective: e.target.value,
                    },
                  }))
                }
              />
            ) : (
              <p className="text-base">
                {benchData?.profile?.objective || "-"}
              </p>
            )}
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
                    onClick={() => handleFormStates("summary")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <div className="text-base">
              {formStates.isOpen && formStates.useForm === "summary" ? (
                <div className="space-y-2">
                  {tempBenchData?.summary?.map(
                    (item: string, index: number) => (
                      <TextField
                        key={index}
                        label={`Point ${index + 1}`}
                        fullWidth
                        size="small"
                        value={item}
                        onChange={(e) => {
                          const updated = [...tempBenchData.summary];
                          updated[index] = e.target.value;
                          setTempBenchData((prev: any) => ({
                            ...prev,
                            summary: updated,
                          }));
                        }}
                      />
                    )
                  )}

                  {/* Optional Add Button */}
                  {/* <button
                    className="mt-2 text-sm text-blue-600 underline"
                    onClick={() =>
                      setTempBenchData((prev: any) => ({
                        ...prev,
                        summary: [...prev.summary, ""],
                      }))
                    }
                  >
                    + Add Point
                  </button> */}
                </div>
              ) : (
                benchData?.summary?.length > 0 && (
                  <ul className="text-base list-disc ps-4">
                    {benchData.summary.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )
              )}
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
                    onClick={() => handleFormStates("projects")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {formStates.isOpen && formStates.useForm === "projects"
              ? tempBenchData?.projects?.map((project: any, idx: number) => (
                  <div key={idx} className="!mb-6 space-y-3">
                    <TextField
                      label="Title"
                      fullWidth
                      size="small"
                      value={project.title}
                      onChange={(e) => {
                        const updatedProjects = [...tempBenchData.projects];
                        updatedProjects[idx].title = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          projects: updatedProjects,
                        }));
                      }}
                    />

                    <TextField
                      label="Role"
                      fullWidth
                      size="small"
                      value={project.role}
                      onChange={(e) => {
                        const updatedProjects = [...tempBenchData.projects];
                        updatedProjects[idx].role = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          projects: updatedProjects,
                        }));
                      }}
                    />

                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      minRows={3}
                      size="small"
                      value={project.description}
                      onChange={(e) => {
                        const updatedProjects = [...tempBenchData.projects];
                        updatedProjects[idx].description = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          projects: updatedProjects,
                        }));
                      }}
                    />

                    <p className="text-sm font-medium">Responsibilities:</p>
                    {project.responsibilities.map((item: string, i: number) => (
                      <TextField
                        key={i}
                        label={`Responsibility ${i + 1}`}
                        fullWidth
                        size="small"
                        value={item}
                        onChange={(e) => {
                          const updatedProjects = [...tempBenchData.projects];
                          updatedProjects[idx].responsibilities[i] =
                            e.target.value;
                          setTempBenchData((prev: any) => ({
                            ...prev,
                            projects: updatedProjects,
                          }));
                        }}
                      />
                    ))}
                  </div>
                ))
              : benchData?.projects?.length > 0 &&
                benchData.projects.map((project: any, idx: number) => (
                  <div key={idx} className="mb-6">
                    <p className="text-base font-bold my-1">
                      Title: {project?.title || "-"}
                    </p>
                    <p className="text-base mb-1">
                      Role: {project?.role || "-"}
                    </p>
                    <p className="text-base mb-1">
                      Description: {project?.description || "-"}
                    </p>
                    <p className="text-base font-medium mb-1">
                      Responsibilities:
                    </p>
                    {project?.responsibilities?.length > 0 && (
                      <ul className="text-base list-disc ps-4">
                        {project.responsibilities.map(
                          (item: string, i: number) => (
                            <li key={i}>{item}</li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
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
                    onClick={() => handleFormStates("contact")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            <ul>
              {benchData?.contact_details?.email &&
                (formStates.isOpen && formStates.useForm === "contact" ? (
                  <TextField
                    label="Email"
                    value={tempBenchData?.contact_details?.email}
                    fullWidth
                    size="small"
                    onChange={(e) =>
                      setTempBenchData((prev: any) => ({
                        ...prev,
                        contact_details: {
                          ...prev.contact_details,
                          email: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <li>
                    <a
                      className="text-base hover:text-indigo-700"
                      href={`mailto:${benchData?.contact_details?.email}`}
                    >
                      <EmailOutlined fontSize="inherit" className="me-1" />
                      {benchData?.contact_details?.email}
                    </a>
                  </li>
                ))}
              {benchData?.contact_details?.phone &&
                (formStates.isOpen && formStates.useForm === "contact" ? (
                  <TextField
                    label="Phone"
                    value={tempBenchData?.contact_details?.phone}
                    fullWidth
                    size="small"
                    onChange={(e) =>
                      setTempBenchData((prev: any) => ({
                        ...prev,
                        contact_details: {
                          ...prev.contact_details,
                          phone: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <li>
                    <a
                      className="text-base hover:text-indigo-700"
                      href={`tel:${benchData?.contact_details?.phone}`}
                    >
                      <Phone fontSize="inherit" className="me-1" />
                      {benchData?.contact_details?.phone}
                    </a>
                  </li>
                ))}
              {benchData?.contact_details?.linkedin &&
                (formStates.isOpen && formStates.useForm === "contact" ? (
                  <TextField
                    label="LinkedIn"
                    value={tempBenchData?.contact_details?.linkedin}
                    fullWidth
                    size="small"
                    onChange={(e) =>
                      setTempBenchData((prev: any) => ({
                        ...prev,
                        contact_details: {
                          ...prev.contact_details,
                          linkedin: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
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
                ))}
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
                    onClick={() => handleFormStates("certifications")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {formStates.isOpen && formStates.useForm === "certifications" ? (
              <div className="flex flex-wrap gap-2">
                {tempBenchData?.certifications?.map(
                  (item: string, index: number) => (
                    <TextField
                      key={index}
                      label={`Certification ${index + 1}`}
                      value={item}
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        const updated = [...tempBenchData.certifications];
                        updated[index] = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          certifications: updated,
                        }));
                      }}
                    />
                  )
                )}
              </div>
            ) : (
              benchData?.certifications?.length > 0 &&
              benchData.certifications.map((item: string, index: number) => (
                <Chip
                  key={index}
                  label={item}
                  variant="outlined"
                  sx={{ fontSize: 12 }}
                  className="my-1 me-1"
                />
              ))
            )}
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
                    onClick={() => handleFormStates("top_skills")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {formStates.isOpen && formStates.useForm === "top_skills" ? (
              <div className="flex flex-wrap gap-2">
                {tempBenchData?.top_skills?.map(
                  (item: string, index: number) => (
                    <TextField
                      key={index}
                      label={`Skill ${index + 1}`}
                      value={item}
                      size="small"
                      onChange={(e) => {
                        const updated = [...tempBenchData.top_skills];
                        updated[index] = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          top_skills: updated,
                        }));
                      }}
                    />
                  )
                )}
              </div>
            ) : (
              benchData?.top_skills?.length > 0 &&
              benchData.top_skills.map((item: string, index: number) => (
                <Chip
                  key={index}
                  label={item}
                  variant="outlined"
                  sx={{ fontSize: 12 }}
                  className="my-1 me-1"
                />
              ))
            )}
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
                    onClick={() => handleFormStates("education")}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
            {formStates.isOpen && formStates.useForm === "education" ? (
              <div className="space-y-2">
                {tempBenchData?.education?.map(
                  (item: string, index: number) => (
                    <TextField
                      key={index}
                      label={`Education ${index + 1}`}
                      fullWidth
                      size="small"
                      value={item}
                      onChange={(e) => {
                        const updated = [...tempBenchData.education];
                        updated[index] = e.target.value;
                        setTempBenchData((prev: any) => ({
                          ...prev,
                          education: updated,
                        }));
                      }}
                    />
                  )
                )}
              </div>
            ) : (
              benchData?.education?.length > 0 && (
                <ul className="text-base list-disc ps-4">
                  {benchData.education.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
