build:
	rm -rf dist
	mkdir dist
	cp src/manifest.json dist/
	cp src/popup.html dist/
	cp -r src/assets dist/
	tsc --build