import { AnimatePresence, motion, useScroll } from "framer-motion";
import { t } from "i18next";
import { useState, useEffect, useRef } from "react";

export default function WordList() {
    const aboutText = t('aboutText');
    const words = aboutText.split(" ");
    const [revealedWords, setRevealedWords] = useState(Array(words.length).fill(false));

    const spanVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((value) => {
            const newRevealedWords = words.map((_, i) => value >= i / words.length + Number.EPSILON);
            setRevealedWords(newRevealedWords);
        });


        return () => {
            unsubscribe();
        };
    }, [scrollYProgress, words]);
    return (
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
    )
}