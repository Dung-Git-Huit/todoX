import React from "react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
function AddTask({ handleNewTaskAdd }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm thành công!`);
        handleNewTaskAdd();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ:", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ. Vui lòng thử lại sau.");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập nội dung nhiệm vụ!");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50  focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setNewTaskTitle(even.target.value)}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
          onKeyPress={handleKeyPress}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
}

export default AddTask;
