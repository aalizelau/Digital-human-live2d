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
  { code: 'en-US', name: 'English' },
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
        <SelectTrigger className="w-[180px] bg-black bg-opacity-50 border border-purple-500 text-white">
          <Globe className="w-4 h-4 mr-2 text-purple-400" />
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border border-purple-500">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="hover:bg-purple-900">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>
    );
  }
