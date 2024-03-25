import React from "react";
import { SubTask } from "./types/types";

interface SubtaskCompletionBarProps {
  subtasks: SubTask[];
}

const SubtaskCompletionBar: React.FC<SubtaskCompletionBarProps> = ({
  subtasks,
}) => {
  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    if (!subtasks || subtasks.length === 0) {
      return 100;
    }

    const completedSubtasks = subtasks.filter((subtask) => subtask.completed);
    return (completedSubtasks.length / subtasks.length) * 100;
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="mt-2">
      {/* <strong className="block mb-2">Subtask Completion:</strong> */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              {`${completionPercentage.toFixed(2)}%`}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="w-40 bg-white rounded-full">
            <div
              className="bg-teal-500 leading-none py-1 text-xs text-center text-white rounded-full"
              style={{ width: `${Math.max(2.5, completionPercentage)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtaskCompletionBar;
