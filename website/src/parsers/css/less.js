import defaultParserInterface from './utils/defaultParserInterface';
import pkg from 'postcss-less/package.json';

const ID = 'postcss-less';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['source']),

  loadParser(callback) {
    require(['postcss/lib/parse', 'postcss-less/lib/'], (builtIn, less) => {
      callback({
        'built-in': builtIn,
        less: less.parse
      });
    });
  },

  parse(parsers, code, options) {
    return defaultParserInterface.parse.call(
      this,
      parsers[options.parser],
      code,
    );
  },

  nodeToRange({ source: range }) {
    if (!range || !range.end) return;
    return [
      this.getOffset(range.start),
      this.getOffset(range.end) + 1,
    ];
  },

  opensByDefault(node, key) {
    return key === 'nodes';
  },

  _ignoredProperties: new Set(['parent', 'input']),

  getDefaultOptions() {
    return {
      parser: 'less',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['parser', ['built-in', 'less']],
      ],
    };
  },
};
