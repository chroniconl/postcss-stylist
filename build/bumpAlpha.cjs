
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');

function bumpAlphaVersion() {
    // Read package.json
    let packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Extract and validate alpha version
    const versionMatch = packageData.version.match(/^(\d+\.\d+\.\d+)-alpha\.(\d+)$/);
    if (!versionMatch) {
        console.error("Invalid alpha version format in package.json");
        return;
    }

    const [, baseVersion, alphaNumber] = versionMatch;
    const newAlphaNumber = parseInt(alphaNumber, 10) + 1;

    // Update package.json
    packageData.version = `${baseVersion}-alpha.${newAlphaNumber}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
    console.log(`Alpha version bumped to: ${packageData.version}`);
}

bumpAlphaVersion();