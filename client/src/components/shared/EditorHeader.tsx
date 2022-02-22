import { useState } from "react";
import Link from "next/link";
import { FaDev } from "react-icons/fa";

import { Button } from "..";

const EditorHeader = () => {
  return (
    <header className="flex article-header">
      <div className="flex justify-between items-center article-header-container">
        <div className="flex items-center article-header-container-left">
          <Link href="/" passHref>
            <div className="article-header-container-left__logo flex justify-center items-center">
              <FaDev size="2.6rem" />
            </div>
          </Link>

          <div className="article-header-container-left__head">create post</div>
        </div>

        <div className="flex items-center article-header-container-right">
          <div className="article-edit">Edit</div>
          <div className="article-preview">Preview</div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
