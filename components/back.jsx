import React from 'react';
import styles from '@/styles/Home.module.css'

function MyComponent() {
  function handleGoBack() {
    window.location.href = document.referrer;
  }

  return (
    <div className={styles.backButton}>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default MyComponent;