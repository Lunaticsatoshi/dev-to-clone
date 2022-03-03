import { FC, ReactNode } from "react";
import { useField } from "formik";

import { classNames } from "src/utils";

type MDEditorProps = {
  children?: ReactNode;
  className?: string;
  name: string;
};

const MDEditor: FC<MDEditorProps> = ({ className, ...props }) => {
  const [field] = useField(props);
  return (
    <div className={classNames("md-editor", className)}>
      <div className="md-editor__toolbar"></div>
      <div className="md-editor__title">
        <textarea
          className={classNames("text-field")}
          placeholder="Write your post content here..."
          autoComplete="off"
          aria-label="Post-Title"
          {...field}
          {...props}
        />
      </div>
    </div>
  );
};

export default MDEditor;
