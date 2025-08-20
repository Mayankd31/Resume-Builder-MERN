import React, { useState, useEffect } from "react"
import ThemeSelector from '../components/ThemeSelector.jsx';

const Templates = () => {

  const [showModal, setShowModal] = useState(true); // show immediately on route load

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div>
      {showModal && (
        <ThemeSelector
          selectedTheme={null}
          setSelectedTheme={() => { }}
          resumeData={null}
          onClose={() => setShowModal(false)}
          showBackButton={true}
        />
      )}
    </div>
  )
}

export default Templates