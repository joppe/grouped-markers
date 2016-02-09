SHELL := /bin/bash

PWD := $(shell pwd)
KARMA_BIN := node_modules/karma/bin/karma
KARMA_CONFIG := $(PWD)/test/karma.conf.js

npm:
	@echo "Install node packages"
	npm install

bower:
	@echo "Install bower packages"
	bower install

babel:
	@echo "Transpile javascript"
	$(PWD)/node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system

babel-demo:
	@echo "Transpile demo javascript"
	$(PWD)/node_modules/babel/bin/babel.js demo/src --stage 1 --out-dir demo/js --modules system

babel-watch:
	@echo "Transpile javascript & watch for changes"
	$(PWD)/node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system  --watch

babel-watch-demo:
	@echo "Transpile demo javascript & watch for changes"
	$(PWD)/node_modules/babel/bin/babel.js demo/src --stage 1 --out-dir demo/js --modules system  --watch

bundle:
	@echo "Bundle the javascript"
	@node ./bundle.js

sass:
	@echo "Compile sass"
	sass --force --scss demo/sass/main.scss demo/css/main.css

setup: npm bower babel babel-demo sass

karma_test:
	@echo "Start karma test"
	@node $(KARMA_BIN) start $(KARMA_CONFIG) --single-run --no-auto-watch --reporters dots

clean:
	@echo "Cleanup installed files"
	@cd dist && ls | grep -v .gitkeep | xargs rm -rf
