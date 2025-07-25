import { getCVDetailById } from "../../../../components/sharedService/apiService";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
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
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// import htmlDocx from "html-docx-js/dist/html-docx";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useSafeLocation } from "../../../../components/hooks/useSafeLocation";

const html2pdf = require("html2pdf.js");
const htmlDocx = require("html-docx-js/dist/html-docx");

type BenchPreviewProps = {
  benchData?: any;
};

export type BenchPreviewHandles = {
  downloadPDF: () => void;
  handleDownloadDocx: () => void;
  getBenchData: () => any;
};

const BenchPreview = forwardRef<BenchPreviewHandles, BenchPreviewProps>(
  (props, ref) => {
    // const { benchData = {} } = props;
    const [benchData, setBenchData] = useState(props.benchData);
    const [tempBenchData, setTempBenchData] = React.useState(benchData ?? {});

    // Expose this method to the parent
    useImperativeHandle(ref, () => ({
      downloadPDF,
      handleDownloadDocx,
      getBenchData: () => {
        return tempBenchData;
      },
    }));

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
      setFormStates({
        isOpen: !formStates.isOpen || formStates.useForm !== useFor,
        useForm: useFor,
      });
    };

    const contentRef = useRef<HTMLDivElement>(null);
    const downloadPDF = async () => {
      if (contentRef.current) {
        const element = contentRef.current;

        if (element) {
          const opt = {
            margin: 0,
            filename: "document.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2, // Increase for better quality
              useCORS: true,
              allowTaint: false,
            },
            jsPDF: {
              unit: "mm",
              format: "a4",
              orientation: "portrait",
            },
          };

          setTimeout(() => {
            html2pdf().set(opt).from(element).save();
          }, 300);
        }
      }
    };

    const handleDownloadDocx = () => {
      if (contentRef.current) {
        const html = contentRef.current.innerHTML;
        const doc = htmlDocx.asBlob(
          `<!DOCTYPE html><html><head><meta charset="utf-8"> <style>
        body {
          font-family: 'Cambria', sans-serif;
        }
      </style></head><body>${html}</body></html>`
        );
        const url = URL.createObjectURL(doc);
        const link = document.createElement("a");
        link.href = url;
        link.download = "skills.docx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    const location = useSafeLocation();
    const pathSegments = location?.pathname.split("/");

    useEffect(() => {
      if (pathSegments) {
        const id = parseInt(pathSegments[pathSegments?.length - 1]);
        if (id && id > 0) {
          getCVDetailsById(id);
        }
      }
    }, []);

    const getCVDetailsById = (id: any) => {
      getCVDetailById(id).then((result: any) => {
        setBenchData(result);
        setTempBenchData(result);
      });
    };

    return (
      <>
        {/* body */}
        <div className="w-[70%] flex justify-end space-x-4 px-4">
          {/* <Button
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
        </Button> */}
        </div>
        <div
          className="w-full h-full flex flex-wrap mx-auto"
          id="printSection"
          ref={contentRef}
        >
          <div className="p-6 w-[70%] mx-auto space-y-4 border-e">
            <div className="flex justify-between">
              <div className="flex">
                {!tempBenchData?.avatar ? (
                  <AccountCircleOutlined
                    fontSize="large"
                    className="text-secondary-text"
                    sx={{ height: 60, width: 60 }}
                  />
                ) : (
                  <img
                    src={tempBenchData?.avatar}
                    alt={tempBenchData?.profile?.name}
                    style={{ height: 60, width: 60 }}
                    className="rounded-full"
                  />
                )}
                <div className="ms-2">
                  <p className="text-title font-bold">
                    {tempBenchData?.profile?.name || "-"}
                  </p>
                  <p className="text-base">
                    {tempBenchData?.profile?.title || "-"}
                  </p>
                  <p className="text-base">
                    <AccessTimeOutlined fontSize="inherit" />{" "}
                    {tempBenchData?.profile?.experience || "-"}
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
                  {tempBenchData?.profile?.objective || "-"}
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
                  tempBenchData?.summary?.length > 0 && (
                    <ul className="text-base list-disc ps-4">
                      {tempBenchData.summary.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  )
                )}
              </div>
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
                      {project.responsibilities.map(
                        (item: string, i: number) => (
                          <TextField
                            key={i}
                            label={`Responsibility ${i + 1}`}
                            fullWidth
                            size="small"
                            value={item}
                            onChange={(e) => {
                              const updatedProjects = [
                                ...tempBenchData.projects,
                              ];
                              updatedProjects[idx].responsibilities[i] =
                                e.target.value;
                              setTempBenchData((prev: any) => ({
                                ...prev,
                                projects: updatedProjects,
                              }));
                            }}
                          />
                        )
                      )}
                    </div>
                  ))
                : tempBenchData?.projects?.length > 0 &&
                  tempBenchData.projects.map((project: any, idx: number) => (
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
                {tempBenchData?.contact_details?.email &&
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
                        href={`mailto:${tempBenchData?.contact_details?.email}`}
                      >
                        <EmailOutlined fontSize="inherit" className="me-1" />
                        {tempBenchData?.contact_details?.email}
                      </a>
                    </li>
                  ))}
                {tempBenchData?.contact_details?.phone &&
                  (formStates.isOpen && formStates.useForm === "contact" ? (
                    <TextField
                      label="Phone"
                      value={tempBenchData?.contact_details?.phone}
                      fullWidth
                      size="small"
                      className="!my-2"
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
                        href={`tel:${tempBenchData?.contact_details?.phone}`}
                      >
                        <Phone fontSize="inherit" className="me-1" />
                        {tempBenchData?.contact_details?.phone}
                      </a>
                    </li>
                  ))}
                {tempBenchData?.contact_details?.linkedin &&
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
                        href={tempBenchData?.contact_details?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedIn fontSize="inherit" className="me-1" />
                        {tempBenchData?.contact_details?.linkedin}
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
                <div className="flex flex-wrap">
                  {tempBenchData?.certifications?.length > 0 &&
                    tempBenchData.certifications.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          // className="my-1 me-1 text-base border-1 border px-3 py-1 rounded-full border-gray-400 line-clamp-2"
                          className="my-1 me-1 text-base"
                        >
                          {item}
                          {index === tempBenchData?.certifications?.length - 1
                            ? ""
                            : ", "}
                        </div>
                      )
                    )}
                </div>
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
                <div className="flex flex-wrap items-center">
                  {tempBenchData?.top_skills?.length > 0 &&
                    tempBenchData.top_skills.map(
                      (item: string, index: number) => (
                        <div key={index} className="my-1 me-1 text-base">
                          {item}
                          {index === tempBenchData?.top_skills?.length - 1
                            ? ""
                            : ", "}
                        </div>
                      )
                    )}
                </div>
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
                tempBenchData?.education?.length > 0 && (
                  <ul className="text-base list-disc ps-4">
                    {tempBenchData.education.map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default BenchPreview;
