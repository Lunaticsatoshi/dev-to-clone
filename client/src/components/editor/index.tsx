import { FC, ReactNode } from "react";
import { useField } from "formik";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { RiHeading, RiDoubleQuotesL } from "react-icons/ri";
import { BsCode, BsImage } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";

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
      <div className="md-editor__toolbar flex justify-center items-center">
        <div className="toolbar-items flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="item">
              <i>
                <AiOutlineBold />
              </i>
            </div>
            <div className="item">
              <i>
                <AiOutlineItalic />
              </i>
            </div>
            <div className="item">
              <i>
                <AiOutlineLink />
              </i>
            </div>
            <div className="item">
              <i>
                <AiOutlineOrderedList />
              </i>
            </div>
            <div className="item">
              <i>
                <AiOutlineUnorderedList />
              </i>
            </div>
            <div className="item">
              <i>
                <AiOutlineUnorderedList />
              </i>
            </div>
            <div className="item">
              <i>
                <RiHeading />
              </i>
            </div>
            <div className="item">
              <i>
                <RiDoubleQuotesL />
              </i>
            </div>
            <div className="item">
              <i>
                <BsCode />
              </i>
            </div>
            <div className="item">
              <i>
                <BsImage />
              </i>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="item">
              <i>
                <FiMoreVertical />
              </i>
            </div>
          </div>
        </div>
      </div>
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
