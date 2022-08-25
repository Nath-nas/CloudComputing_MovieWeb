/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                new: ["DM Sans", "sans-serif"],
            },
            colors: {
                primary: "#ff3d71",
            },
        },
    },
    plugins: [],
};
