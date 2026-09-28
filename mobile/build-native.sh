#!/usr/bin/env bash
set -euo pipefail
npm install
if [ "${1:-android}" = "android" ]; then
  npx cap add android || true
  npx cap sync android
  echo "Android project prepared in mobile/android. Open it in Android Studio to create a signed APK/AAB."
elif [ "${1:-android}" = "ios" ]; then
  npx cap add ios || true
  npx cap sync ios
  echo "iOS project prepared in mobile/ios. Open it in Xcode on macOS to archive/sign it."
else
  echo "Usage: ./build-native.sh android|ios"
  exit 2
fi
