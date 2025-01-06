"use client";

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from 'lucide-react';

// Define props interface
interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  // { code: 'en-US', name: 'English' },
  { code: 'en-GB', name: 'English' },
  { code: 'cmn-CN', name: 'Mandarin' },
  { code: 'Yue-HK', name: 'Cantonese' },
]

export default function LanguageSelector({ 
    selectedLanguage,
    onLanguageChange
  }: LanguageSelectorProps) {
    return (
        <Select
            value={selectedLanguage}
            onValueChange={(value) => onLanguageChange(value)}
        >
        <SelectTrigger className="w-[180px] bg-white text-gray-800 border border-red-400 border-opacity-30">
          <Globe className="w-4 h-4 mr-2 text-orange-400" />
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-800 border border-white ">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="hover:bg-orange-100">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>
    );
  }
