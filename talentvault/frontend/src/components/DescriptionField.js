import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

const DescriptionField = ({ jobDescription, setJobDescription, error }) => {
  const [text, setText] = useState(jobDescription);

  const handleChange = (value) => {
    setText(value);
    setJobDescription(value);
  };

  return (
    <div className="jobdescriptiondiv">
      <label>Job Description</label>
      <ReactQuill
        theme="snow"
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className={`jobdescriptionbox ${error && !text ? "error" : ""}`}
      />
    </div>
  );
};

export default DescriptionField;
