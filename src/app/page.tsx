"use client";
import WordList from "./wordlist"
import Projects from "./projects"
import { Playfair_Display } from "next/font/google"
import { useState, Fragment } from "react"
import { motion } from "framer-motion"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { SiLinkedin, SiGithub } from "react-icons/si"
import { IoMdArrowDropdown } from "react-icons/io";
import i18n, { changeLanguage } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { Listbox, Transition } from '@headlessui/react'
import Link from "next/link"
import data from "./projects.json"

const cormorant = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
});
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'cs',
    resources: {
      en: {
        translation: require('../../public/locales/en.json')  
      },
      cs: {
        translation: require('../../public/locales/cs.json')
      },
      de: {
        translation: require('../../public/locales/de.json')
      }
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });
  
const language = [
  { lang: 'English' },
  { lang: 'Čeština' },
  { lang: 'Deutsch' },
]

export default function Home() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(language[1])

  function handleSelect(selected: { lang: string }) {
    if(selected.lang === 'English') {
      changeLanguage('en');
    } else if(selected.lang === 'Čeština') {
      changeLanguage('cs'); 
    }else {
      changeLanguage('de');
    }
    setSelected(selected);
  }  
 
  return (
    <div>
      <main className='bg-black h-screen w-screen text-2xl flex justify-center'>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
        className='px-5 py-3 text-2xl cursor-pointer z-50 hover:[text-shadow:0px_0px_4px_var(--tw-shadow-color)] shadow-white text-white fixed p-5 top-0 right-32'
        >
          <div className="fixed w-32">
            <Listbox value={selected} onChange={handleSelect}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.lang}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <IoMdArrowDropdown
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {language.map((language, languageIdx) => (
                      <Listbox.Option
                        key={languageIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-4 ${
                            active ? 'bg-white text-black' : 'text-white'
                          }`
                        }
                        value={language}
                      >
                        {language.lang}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </motion.div>
        <div className='flex justify-center items-center absolute w-screen h-screen overflow-x-hidden'>
          <div className='absolute h-[380px] xs:h-[500px] md:h-[700px] w-[380px] xs:w-[500px] md:w-[700px] flex justify-center items-center flex-col text-[5rem] md:text-[9rem] xs:text-[7rem]'>
            <motion.span
              className="opacity-0 block text-center p-[2.1rem] xs:p-[3.2rem] md:p-[4.2rem] bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-black"
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
              style={cormorant.style}
            >
              <span
                className={cormorant.className}
              >
                Michal
              </span>
            </motion.span>
            <motion.span
              className="opacity-0 block text-center p-[2.1rem] xs:p-[3.2rem] md:p-[4.2rem] bg-clip-text text-transparent bg-gradient-to-t from-white via-neutral-400 to-black"
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
              style={cormorant.style}
            >
              <span className={cormorant.className}>
                Hrbáček
              </span>
            </motion.span>
            <motion.div
              className='w-full h-full absolute opacity-0'
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.25, delay: 0.5 }}
            >
              <img src="/portfolio/keyboard.png" alt="kb" className="select-none drag-none pointer-events-none" />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="flex justify-center items-center"
          animate={{
            opacity: 1
          }}
          initial={{
            opacity: 0
          }}
          transition={{
            delay: 1,
            duration: 1,
            ease: "backIn"
          }}>
          <motion.div
            className="bottom-0 absolute h-[19%] flex justify-center items-center flex-col"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut"
            }}
          >
            <div className="rounded-full px-5 p-2 border-neutral-300 text-neutral-200 border-[2px] border-solid">
              {t('contact')}
            </div>
            <MdOutlineKeyboardArrowDown color="white" className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </main>
       <WordList />
       <Projects projects={data} />
      <div className="fixed left-10 bottom-0 hidden items-center md:flex">
        <div className="h-[200px] w-[1px] bg-neutral-300">
        </div>
        <div className="absolute top-0 -ml-3.5">
          <Link href={"https://www.linkedin.com/in/michal-hrb%C3%A1%C4%8Dek-0946a823b/"}>
            <SiLinkedin  className="h-7 w-7 bg-black" />
          </Link>
          <Link href={"https://github.com/kelachim"}>
            <SiGithub className="h-7 w-7 my-4 bg-black" />
          </Link>
        </div>
      </div>
      <div className="fixed top-2 left-2 flex items-center md:hidden border-neutral-700 bg-black border-[1px] rounded-full p-2">
          <Link href={"https://www.linkedin.com/in/michal-hrb%C3%A1%C4%8Dek-0946a823b/"}>
            <SiLinkedin  className="h-7 w-7 mx-1 bg-black" />
          </Link>
          <Link href={"https://github.com/kelachim"}>
            <SiGithub className="h-7 w-7 mx-1 bg-black" />
          </Link>
      </div>
    </div>
  )
}
