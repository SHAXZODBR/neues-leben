"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/contexts/language-context"
import Image from "next/image"

type LanguageOption = {
  code: Language
  name: string
  nativeName: string
  countryCode: string
}

const languages: LanguageOption[] = [
  { code: "ru", name: "Russian", nativeName: "Русский", countryCode: "ru" },
  { code: "en", name: "English", nativeName: "English", countryCode: "gb" },
  { code: "uz", name: "Uzbek", nativeName: "O'zbek", countryCode: "uz" },
  { code: "de", name: "German", nativeName: "Deutsch", countryCode: "de" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (languageCode: Language) => {
    setLanguage(languageCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Image
            src={`https://flagcdn.com/w20/${currentLanguage.countryCode}.png`}
            alt={currentLanguage.name}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <span>{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`gap-2 ${language === lang.code ? "bg-muted" : ""}`}
          >
            <Image
              src={`https://flagcdn.com/w20/${lang.countryCode}.png`}
              alt={lang.name}
              width={20}
              height={15}
              className="rounded-sm"
            />
            {lang.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
