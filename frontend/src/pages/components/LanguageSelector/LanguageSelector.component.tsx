import React from 'react';
import styles from '@/styles/LanguageSelector.module.css';

// Define props interface
interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ 
    selectedLanguage,
    onLanguageChange
  }: LanguageSelectorProps) {
  return (
    <div className={styles.languageSelector}>
      <label htmlFor="language-select">Choose Language:</label>
      <select 
        id="language" 
        value={selectedLanguage} 
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="zh-CN">Mandarin</option>
        <option value="Yue">Cantonese</option>
      </select>
    </div>
  );
}
