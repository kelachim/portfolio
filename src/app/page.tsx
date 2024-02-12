"use client";
import { Playfair_Display } from "next/font/google";
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { SiLinkedin, SiGithub, SiFramer, SiRust, SiTailwindcss, SiPostgresql, SiTypescript, SiGit, SiDocker, SiNextdotjs, SiSupabase, SiVuedotjs } from "react-icons/si";
import i18n, { changeLanguage } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import Link from "next/link";

export const cormorant = Playfair_Display({
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
      }
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });


export default function Home() {
  const { t } = useTranslation();
  const aboutText = t('aboutText');
  const words = aboutText.split(" ");

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  const [revealedWords, setRevealedWords] = useState(Array(words.length).fill(false));
  const [lang, setLang] = useState<"Czech" | "English">("Czech");

  const spanVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const newRevealedWords = words.map((_, i) => value >= i / words.length + Number.EPSILON);
      setRevealedWords(newRevealedWords);
    });


    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, words]);

  useEffect(() => {
    changeLanguage(lang == "Czech" ? 'cs' : 'en')
  }, [lang])
  return (
    <div>
      <main className='bg-black h-screen w-screen text-2xl flex justify-center'>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
        onClick={() => setLang(lang == "Czech" ? "English" : "Czech")} 
        className='px-5 py-3 text-2xl cursor-pointer z-50 hover:[text-shadow:0px_0px_4px_var(--tw-shadow-color)] shadow-white fixed p-5 top-0 right-0'
        >
        {lang === "English" ? "🇨🇿" : "🇬🇧"}
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
              <img src="/keyboard.png" alt="kb" className="select-none drag-none pointer-events-none" />
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
      <section className="h-[300vh]" id="intro" ref={sectionRef}>
        <div className="h-screen sticky top-0">
          <AnimatePresence>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex h-full items-center justify-center transition-all">
              <motion.p
                className="absolute mx-auto max-w-4xl text-center text-[6vw] bg-clip-text bg-gradient-to-b from-white to-white/20 sm:text-4xl"
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="m-[0.35rem] sm:m-3 inline-block"
                    variants={spanVariants}
                    initial="hidden"
                    animate={revealedWords[i] ? "visible" : "hidden"}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </AnimatePresence>
        </div>
      </section>
      <main className='w-screen bg-black flex items-center flex-col text-center xl:text-left'>
        <div className="text-[3rem] p-1 xs:p-12 block w-full lg:w-2/3">
          {t('myProjects')}
        </div>
        <div className="flex justify-center items-center flex-wrap w-full lg:w-10/12">
          <div className="w-full xs:w-[30rem] bg-gradient-to-bl from-neutral-900 to-neutral-950 border-neutral-700 border-[1.5px] rounded-xl p-2 xs:p-3 m-3 flex flex-col justify-start items-center">
          <div className="h-[14rem] w-full rounded-xl bg-cover bg-no-repeat bg-left" 
            style={{backgroundImage: 'url("/project_doucovani.png")'}}
          />            
            <div className="p-2 text-xl">
              Douc.info
            </div>
            <div className="p-1 text-center text-neutral-400 sm:h-20">
              {t("doucovaniDesc")}
            </div>
            <div className="py-2 flex gap-2 flex-wrap items-center justify-center">
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiNextdotjs className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Next.js</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTypescript className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Typescript</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTailwindcss className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">TailwindCSS</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiPostgresql className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Postgres</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiSupabase className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Supabase</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiGit className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Git</h1>
              </span>
            </div>
          </div>
          <div className="w-[30rem] bg-gradient-to-bl from-neutral-900 to-neutral-950 border-neutral-700 border-[1.5px] rounded-xl p-2 xs:p-3 m-3 flex flex-col justify-start items-center">
            <img src="/project_portfolio.png" alt="" className="w-full h-[14rem] block rounded-xl object-cover bg-black" />
            <div className="p-2 text-xl">
              Portfolio
            </div>
            <div className="p-2 text-center text-neutral-400 sm:h-20">
              {t("portfolioDesc")}
            </div>
            <div className="py-2 flex gap-2 flex-wrap items-center justify-center">
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiNextdotjs className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Next.js</h1>
              </span>
              <span className=" text-white flex items-center justify-center p-1 px-2 rounded-full">
                <SiTypescript className="inline-block w-6 h-6 text-white" />
                <h1 className="inline-block px-2 text-lg">Typescript</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTailwindcss className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">TailwindCSS</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiPostgresql className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Postgresql</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiDocker className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Docker</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiFramer className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Framer</h1>
              </span>
            </div>
          </div>
          <div className="w-[30rem] bg-gradient-to-bl from-neutral-900 to-neutral-950 border-neutral-700 border-[1.5px] rounded-xl p-2 xs:p-3 m-3 flex flex-col justify-start items-center">
            <img src="/viceverse.png" alt="" className="w-full h-[14rem] block rounded-xl object-cover bg-black" />
            <div className="p-2 text-xl">
              Viceverse.cz
            </div>
            <div className="p-1 text-center text-neutral-400 sm:h-20">
              {t("viceverseDesc")}
            </div>
            <div className="py-2 flex gap-2 flex-wrap items-center justify-center">
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiVuedotjs className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Vue.js</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTypescript className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Typescript</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTailwindcss className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">TailwindCSS</h1>
              </span> 
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiFramer className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Framer</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiGit className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Git</h1>
              </span>
            </div>
          </div>
          <div className="w-[30rem] bg-gradient-to-bl from-neutral-900 to-neutral-950 border-neutral-700 border-[1.5px] rounded-xl p-2 xs:p-3 m-3 flex flex-col justify-start items-center">
            <img src="/project_usb.png" alt="" className="w-full h-[14rem] block rounded-xl object-cover bg-black" />
            <div className="p-2 text-xl">
              Usb-Guard
            </div>
            <div className="p-1 text-center text-neutral-400 sm:h-20">
              {t("usbGuardDesc")}
            </div>
            <div className="py-2 flex gap-2 flex-wrap items-center justify-center">
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiNextdotjs className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Next.js</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiRust className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Rust</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTypescript className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Typescript</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiTailwindcss className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">TailwindCSS</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiPostgresql className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Postgresql</h1>
              </span>
              <span className=" flex items-center justify-center p-1 px-2 rounded-full">
                <SiDocker className="inline-block w-6 h-6" />
                <h1 className="inline-block px-2 text-lg">Docker</h1>
              </span>
            </div>
          </div>
        </div>
      </main>
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
