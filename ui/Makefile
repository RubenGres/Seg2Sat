install-node:
	./install-node.sh

build-client:
	cd frontend && npm install && npm run build && rm -rf ../static && cp -r build/ ../static/

build-dev:
	cd frontend && npm install && NODE_ENV=development npm run build && rm -rf ../static 2>&1 && cp -rv build/ ../static/

run-dev:
	FLASK_DEBUG=development python app.py

run-prod:
	python app.py & python gradio-app.py

run-mock:
	python app.py & python gradio-mock-app.py

stop-server:
	killall python

all: run-prod

mock: run-mock
