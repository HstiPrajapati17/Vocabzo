import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import BottomNav from './BottomNav';

const AppShell = ({
  children,
  currentPage,
  navigate,
  user,
  onLogout,
  previewLanguage,
  lessonCount,
  completedCount,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="h_app_shell">
      <Sidebar
        currentPage={currentPage}
        navigate={navigate}
        onLogout={onLogout}
        onMoreClick={() => setShowMore(!showMore)}
      />

      <div className="h_shell_body">
        <main className="h_shell_center">
          {children}
        </main>

        <RightPanel
          user={user}
          previewLanguage={previewLanguage}
          currentPage={currentPage}
          navigate={navigate}
          lessonCount={lessonCount}
          completedCount={completedCount}
        />
      </div>

      <BottomNav
        currentPage={currentPage}
        navigate={navigate}
        onLogout={onLogout}
      />

      {showMore && (
        <div className="h_more_overlay" onClick={() => setShowMore(false)}>
          <div className="h_more_menu" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => { navigate('courses'); setShowMore(false); }}>Courses</button>
            <button type="button" onClick={() => { navigate('profile'); setShowMore(false); }}>Settings</button>
            <button type="button" className="text-danger" onClick={() => { onLogout(); setShowMore(false); }}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
