const fs = require('fs');
const remark = require('remark');
const builder = require('unist-builder');
const visit = require('unist-util-visit');
const after = require('unist-util-find-after');
const select = require('unist-util-select');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        reject(error);
      }
      resolve(content);
    });
  });
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (error, content) => {
      if (error) {
        reject(error);
      }
      resolve(content);
    });
  });
}

function processMarkdown(content) {
  const processor = remark()
    .use(() => {
      return (ast, file) => {
        const headings = select(ast, 'heading');
        
        // Remove reference defintions from headings
        // Increment heading depth by 1
        headings.forEach(heading => {
          heading.depth = heading.depth + 1;
          heading.children = heading.children
            .map(text => {
              text.value = text.value.replace(/\s\{#(.*)\}/g, '');
              return text;
            });
        });

        // Replace meta data with correspinding markdown block
        const metaDatas = select(ast, 'html[value^=<pre class="metadata">]');
        metaDatas.forEach(metaData => {
          const replacement = metaData.value
            .split('\n')
            .filter(line => line.indexOf('H1: ') === 0)
            .map(value => builder('heading', {depth: 1}, [
              builder('text', {
                value: value.replace('H1: ', '')
              })
            ]
          ))[0];

          const abstract = metaData.value
            .split('\n')
            .filter(line => line.indexOf('Abstract: ') === 0)
            .map(value => builder('paragraph', [builder('text', {value: value.replace('Abstract: ', '')})]))[0];

          ast.children.splice(ast.children.indexOf(metaData), 1, replacement, abstract);
        });

        const copyRights = select(ast, 'html[value^=<div boilerplate=copyright>]');
        copyRights.forEach(copyRight => {
          ast.children.splice(ast.children.indexOf(copyRight), 1);
        });
      };
    });

  return new Promise((resolve, reject) => {
    resolve(processor.process(content.toString()));
  });
}

function main() {
  return readFile('./index.bs')
    .then(processMarkdown)
    .then(markdown => {
      return writeFile('./readme.md', markdown);
    });
}

main()
  .catch(error => {
    setTimeout(() => {
      throw error;
    }, 0);
  })

// Catch unhandled rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise ', promise, ' reason: ', reason);
  throw reason;
});
