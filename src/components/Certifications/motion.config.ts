export const motionTokens = {
    // Luxury Easing: Smooth start, ultra-smooth end
    easingLuxury: [0.22, 1, 0.36, 1],

    // Durations
    durationFast: 0.4,
    durationBase: 0.6,
    durationSlow: 0.8,

    // Staggering
    staggerFast: 0.05,
    staggerBase: 0.1,
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: motionTokens.staggerBase,
            duration: motionTokens.durationSlow,
            ease: motionTokens.easingLuxury,
        },
    },
};
