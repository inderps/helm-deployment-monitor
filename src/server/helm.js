const childProcess = require('child_process');
const fs = require('fs');

const saveResponseForTests = (fileName, response) => (fs.writeFile(`test/fixtures/${fileName}`, response, () => {})); // eslint-disable-line no-unused-vars

exports.getListOfCharts = () => {
  const listResponse = childProcess.execSync('helm ls').toString();
  // Uncomment this to create brand new fixture
  // saveResponseForTests('getListOfCharts', listResponse);
  const charts = [];

  const arrayWithCommaForNewLine = listResponse.split('\n');
  arrayWithCommaForNewLine.forEach((line, index) => {
    if (index === 0 || index === arrayWithCommaForNewLine.length - 1) return;

    const values = line.split('\t');

    charts.push({
      name: values[0].trim(),
      revision: values[1].trim(),
      updated: values[2].trim(),
      status: values[3].trim(),
    });
  });

  return charts;
};
