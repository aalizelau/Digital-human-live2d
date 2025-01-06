"use client";

import LanguageSelector from '../LanguageSelector/LanguageSelector.component';
import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';
import { GraduationCap } from 'lucide-react'; 

const HeaderContainer = () => {
    const {selectedLanguage, handleLanguageChange,} = useContext(VoiceAssistantContext);
    
    return (
      <header className="bg-white bg-opacity-90 backdrop-blur-sm border-b border-orange-500 border-opacity-20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {/* <Image
              src="/placeholder.svg"
              alt="Futuristic AI Logo"
              width={40}
              height={40}
              className="mr-2"
            /> */}
            <span className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              <GraduationCap className="w-8 h-8 mr-2 text-orange-400" />
              ChatCAMPUS
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