import { useState } from 'react';
import styles from '@/styles/LanguageSelector.module.css';

export default function LanguageSelector({ onLanguageChange }) {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="language">Choose Language:</label>
      <select id="language" value={language} onChange={handleLanguageChange}>
        <option value="EN">English</option>
        <option value="zh-CN">Mandarin</option>
        <option value="Yue">Cantonese</option>
      </select>
    </div>
  );
}