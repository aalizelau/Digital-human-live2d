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
      <div className="relative">
        <label htmlFor="language-select" className="sr-only">
          Choose Language
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-40 bg-black bg-opacity-50 text-white border border-purple-500 rounded-md px-4 py-2 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="en" className="bg-black text-white">
            English
          </option>
          <option value="zh-CN" className="bg-black text-white">
            Mandarin
          </option>
          <option value="Yue" className="bg-black text-white">
            Cantonese
          </option>
        </select>
      </div>
    );
  }
