const StyleDictionary = require('style-dictionary');

// Register custom transform for CSS variables
StyleDictionary.registerTransform({
  name: 'css/variables',
  type: 'value',
  matcher: function(prop) {
    return true; // Apply to all properties
  },
  transformer: function(prop) {
    return prop.value;
  }
});

// Configure CSS variables format
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function(dictionary, config) {
    return `/**
 * Generated CSS Variables
 * Do not edit directly
 */
:root {
${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
}`;
  }
});

// Customize property name format
StyleDictionary.registerTransform({
  name: 'name/kebab',
  type: 'name',
  matcher: function(prop) {
    return true;
  },
  transformer: function(prop) {
    // tf-color-text-default
    return `tf-${prop.path.join('-')}`;
  }
});

module.exports = {
  source: ['design-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['name/kebab', 'css/variables'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    }
  }
};