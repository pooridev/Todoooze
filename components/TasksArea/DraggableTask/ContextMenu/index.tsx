import * as ReactContextMenu from "@radix-ui/react-context-menu";
import { FC } from "react";

import { DeleteIcon, WritingIcon } from "../../../shared/Icon";
import style from "./ContextMenu.module.css";

type Props = {
  taskId: string;
};

const ContextMenu: FC<Props> = ({ taskId }) => {
  return (
    <ReactContextMenu.Content className={style.Content} alignOffset={-5}>
      <ReactContextMenu.Item className={style.Item}>
        <DeleteIcon width="18" height="18" />
        <span className="flex-1 mr-2">Delete</span>
      </ReactContextMenu.Item>
      <ReactContextMenu.Separator className="h-px my-1 bg-neutral-200 dark:bg-neutral-700" />
      <ReactContextMenu.Item className={style.Item}>
        <WritingIcon width="20" height="15" />
        <span className="flex-1 mr-2">Edit</span>
      </ReactContextMenu.Item>
    </ReactContextMenu.Content>
  );
};

export default ContextMenu;
