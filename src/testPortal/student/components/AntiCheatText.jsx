import React from "react";

const block = (e) => e.preventDefault();

/**
 * Wraps question/option text to make casual copying inconvenient: disables
 * text selection, right-click, and copy/cut on THIS content only (answer
 * inputs elsewhere on the page are left fully usable). This is a deterrent,
 * not a security boundary — the real protection is that correct answers and
 * grading logic never leave the server, regardless of what happens here.
 */
const AntiCheatText = ({ as = "div", className = "", children }) => {
  const Tag = as;
  return (
    <Tag
      className={`select-none ${className}`}
      onCopy={block}
      onCut={block}
      onContextMenu={block}
      onDragStart={block}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {children}
    </Tag>
  );
};

export default AntiCheatText;
