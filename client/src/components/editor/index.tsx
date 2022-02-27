import { FC, ReactNode } from "react";

import { classNames } from "src/utils";

type MDEditorProps = {
  children?: ReactNode;
  className?: string;
};

const MDEditor: FC<MDEditorProps> = ({ className }) => {
  return (
    <div className={classNames("md-editor", className)}>
      <div className="md-editor__toolbar"></div>
      <div className="md-editor__title">
        <textarea
          className="text-field"
          placeholder="Write your post content here..."
          autoComplete="off"
          aria-label="Post-Title"
        />
      </div>
    </div>
  );
};

export default MDEditor;
