build-chrome:
	rm -rf dist
	mkdir dist
	cp src/manifest.chrome.json dist/manifest.json
	cp src/popup.html dist/
	cp -r src/assets dist/
	node build/build.js

dev-chrome:
	rm -rf dist
	mkdir dist
	cp src/manifest.chrome.json dist/manifest.json
	cp src/popup.html dist/
	cp -r src/assets dist/
	node build/build.js --dev --chrome