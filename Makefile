.PHONY: prepare sync_version

APP_VERSION := $(shell cat src/manifest.json | jq -r .version)

prepare: sync_version
	@echo "Preparing Zip file for Upload"
	@cd src && zip -qq -r ../Meet_Simultaneous_Interpretation.zip . && cd ../
	@echo "Zip file created: Meet_Simultaneous_Interpretation.zip"

sync_version:
	@echo "Syncing Versions: $(APP_VERSION)"
	@sed -i "" "s/versionNumber\">\(.*\)</versionNumber\">v$(APP_VERSION)</g" src/injection/injected_script.js