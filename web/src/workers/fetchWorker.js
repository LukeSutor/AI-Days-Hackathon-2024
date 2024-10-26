/* eslint-disable no-restricted-globals */
/* global importScripts, turf */
importScripts('https://unpkg.com/@turf/turf/turf.min.js');

self.onmessage = function(event) {
  const { url } = event.data;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Simplify the features
      const simplifiedFeatures = data.features.map(feature => {
        return turf.simplify(feature, { tolerance: 0.001, highQuality: false });
      });

      self.postMessage({ data: { features: simplifiedFeatures } });
    })
    .catch(error => {
      self.postMessage({ error: error.message });
    });
};
/* eslint-enable no-restricted-globals */

// /* eslint-disable no-restricted-globals */
// /* global importScripts, turf */
// importScripts('https://unpkg.com/@turf/turf/turf.min.js');

// self.onmessage = function(event) {
//   const { url } = event.data;
//   console.log(url);

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       // Calculate the area of each feature and filter out invalid or excessively large polygons
//       // const validFeatures = data.features.filter(feature => {
//       //   feature.properties.area = turf.area(feature);
//       //   const bbox = turf.bbox(feature);
//       //   const [minX, minY, maxX, maxY] = bbox;
//       //   const width = maxX - minX;
//       //   const height = maxY - minY;

//       //   // Define thresholds for width and height to exclude excessively large polygons
//       //   const maxDimensionThreshold = 180; // Adjust this threshold as needed

//       //   return turf.booleanValid(feature) && width < maxDimensionThreshold && height < maxDimensionThreshold;
//       // });

//       // // Sort features by area in descending order
//       // // validFeatures.sort((a, b) => b.properties.area - a.properties.area);
//       // validFeatures.sort();

//       // // Remove the largest feature
//       // const remainingFeatures = validFeatures.slice(1);

//       self.postMessage({ data: { features: data.features } });
//     })
//     .catch(error => {
//       self.postMessage({ error: error.message });
//     });
// };
// /* eslint-enable no-restricted-globals */


// /* eslint-disable no-restricted-globals */
// self.onmessage = function(event) {
//     const { url } = event.data;
//     console.log('Current directory:', self.location.pathname);
//     console.log('URL:', url);
  
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         self.postMessage({ data });
//       })
//       .catch(error => {
//         self.postMessage({ error: error.message });
//       });
//   };
//   /* eslint-enable no-restricted-globals */