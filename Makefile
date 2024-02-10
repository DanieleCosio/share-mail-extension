build:
	rm -rf dist
	mkdir dist
	cp src/manifest.json dist/
	cp -r src/assets dist/
	tsc --build