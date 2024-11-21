"use client";

import LanguageSelector from '../LanguageSelector/LanguageSelector.component';
import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';

const HeaderContainer = () => {
    const {selectedLanguage, handleLanguageChange,} = useContext(VoiceAssistantContext);
    
    return (
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {/* <Image
              src="/placeholder.svg"
              alt="Futuristic AI Logo"
              width={40}
              height={40}
              className="mr-2"
            /> */}
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              NeoLearn AI
            </span>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
         />
        </div>
      </header>
    );
  }

export default HeaderContainer;