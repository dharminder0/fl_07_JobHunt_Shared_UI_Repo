import React from "react";

interface HtmlRendererProps {
  content: any;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ content }) => {
  return (
    <div className="prose max-w-full">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default HtmlRenderer;
