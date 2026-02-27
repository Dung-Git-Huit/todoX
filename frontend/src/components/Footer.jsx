import React from "react";
function Footer({ completedTasksCount = 2, activeTasksCount = 3 }) {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} việc
                {activeTasksCount > 0 &&
                  `, còn ${activeTasksCount} việc đang chờ bạn hoàn thành`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                Bạn có {activeTasksCount} việc cần hoàn thành. Hãy bắt đầu làm
                việc nào!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}
export default Footer;
