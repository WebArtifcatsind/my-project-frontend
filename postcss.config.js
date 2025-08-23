


import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcssCustomProperties from 'postcss-custom-properties'; // Import the new plugin

export default {
  plugins: [
    postcssCustomProperties(), // Add it to your plugins list
    tailwindcss(),
    autoprefixer(),
  ],
};

// import tailwindcss from '@tailwindcss/postcss';
// import autoprefixer from 'autoprefixer';

// export default {
//   plugins: [tailwindcss(), autoprefixer()],
// };