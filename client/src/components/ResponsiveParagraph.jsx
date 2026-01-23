import { useState } from "react";

export default function ResponsiveParagraph({ text, limit = 200 }) {
  const [expanded, setExpanded] = useState(false);

  // Extract text content from React element or use string directly
  const getTextContent = (element) => {
    if (typeof element === "string") {
      return element;
    }
    // If it's a React element, extract text content
    if (element && typeof element === "object") {
      // For React elements, we need to get the text content
      // This is a simple approach - in practice, you might want to use a more robust solution
      const extractText = (node) => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (node && typeof node === "object" && node.props) {
          return extractText(node.props.children);
        }
        return "";
      };
      return extractText(element);
    }
    return "";
  };

  const textContent = getTextContent(text);
  const shouldTruncate = textContent.length > limit;

  return (
    <p className="text-md text-gray-300">
      {/* Mobile / Tablet (truncate with See More) */}
      <span className="block mdl:hidden">
        {expanded ? (
          text
        ) : (
          <>
            {textContent.slice(0, limit) + (shouldTruncate ? "..." : "")}
            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-gray-200 underline block"
              >
                See More
              </button>
            )}
          </>
        )}
        {expanded && shouldTruncate && (
          <button
            onClick={() => setExpanded(false)}
            className="mt-3 text-gray-200 underline block"
          >
            See Less
          </button>
        )}
      </span>

      {/* Desktop (always full text, no truncation) */}
      <span className="hidden mdl:block">{text}</span>
    </p>
  );
}
