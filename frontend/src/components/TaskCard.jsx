import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import {
  Calculator,
  CheckCircle2,
  Circle,
  Calendar,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deletetask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Nhiệm vụ đã được xóa thành công.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi xóa nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Nhiệm vụ đã được cập nhật thành "${updateTaskTitle}".`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    }
  };

  const toggleTaskCompletedStatus = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(
          `Nhiệm vụ "${task.title}" đã được đánh dấu là hoàn thành.`,
        );
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(
          `Nhiệm vụ "${task.title}" đã được đánh dấu là chưa hoàn thành.`,
        );
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-70",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompletedStatus}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị hoặc chỉnh sửa title */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              type="text"
              placeholder="Cần phải làm gì ?"
              className="flex-1 h-12 text-base border-boder/50 focus:border-primary/50 focus:ring-primary/20 "
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
                updateTask();
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngày tạo & ngày hoàn thành */}
          <div className=" flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút chỉnh và xóa */}
        <div className="hidden gap-2 group-hover:inline animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút delete */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deletetask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
