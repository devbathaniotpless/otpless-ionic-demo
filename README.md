# Ionic

Integrating One Tap OTPLESS Sign In into your React Native Application using our SDK is a streamlined process. This guide offers a comprehensive walkthrough, detailing the steps to install the SDK and seamlessly retrieve user information.

1. Install **OTPless SDK** Dependency

```
npm install otpless-ionic
```

2. Configure **AndroidManifest.xml**

`Android`

- Add an intent filter inside your Main Activity code block.

```xml
<intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.BROWSABLE" />
<data
	android:host="otpless"
	android:scheme= "${applicationId}.otpless"/>
</intent-filter>
```

- Change your activity launchMode to singleTop and exported true for your Main Activity.

```xml
android:launchMode="singleTop"
android:exported="true"
```

- 1.**Handle Callback**

- Import the OTPLESS Ionic plugin by adding this code to your MainActivity.java.

```java
import com.otpless.ionic.OtplessPlugin;
import android.os.Bundle;
```

- Register OTPLESS plugin in onCreate function of your main activity.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
	registerPlugin(OtplessPlugin.class);
	super.onCreate(savedInstanceState);
}
```

- 2.**Handle Backpress**

- Add this code to your onBackPressed() method to handle in your main activity.

```java
@Override
public void onBackPressed() {
	if (OtplessPlugin.onBackPressed(this)) return;
	super.onBackPressed();
}
```

`iOS`

- Go to your project's root folder in the terminal and run.

```json
pod install
```

- Copy-paste the following code into your info.plist file.

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
    <key>CFBundleURLSchemes</key>
    <array>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER).otpless</string>
    </array>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>otpless</string>
    </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>whatsapp</string>
    <string>otpless</string>
    <string>gootpless</string>
    <string>com.otpless.ios.app.otpless</string>
    <string>googlegmail</string>
</array>
```

- Add the code in your App delegate to handle redirection from external auth services

```swift
import OtplessSDK

//add this inside of class
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if Otpless.sharedInstance.isOtplessDeeplink(url: url){
        Otpless.sharedInstance.processOtplessDeeplink(url: url)
        return true
     }

        super.application(app, open: url, options: options)
        return true
   }
```

3. **Configure Sign up/Sign in**

- Import the OTPLESS package on your page.

```tsx
import { OtplessManager } from "otpless-ionic";
```

- Add this code to handle callback from OTPLESS SDK.

```tsx
const manager = new OtplessManager();
// This code will be used to detect the whatsapp installed status in users device
// If you are using WHATSAPP login then its reqiured to add this code to hide the OTPless functionality
const isWhatsappInstalled = async () => {
  const hasWhatsapp = await manager.isWhatsappInstalled();
  console.log(hasWhatsapp);
};
const openLoginPage = async () => {
  try {
    const extras = {
      method: "get",
      params: {
        cid: "HRIRBIIKXMKEOTDDA8VV4HP2V24454X8", //Add your own CID value provided in the docs otpless.com/platforms/ionic
        uxmode: "anf",
      },
    };
    isWhatsappInstalled();
    const data = await manager.startWithCallback(extras);

    if (data.data === null || data.data === undefined) {
      console.error(data.errorMessage);
    } else {
      updateString(data.data.token);
      // TODO: Add your logic here
      // For example, setRedirectToHome(true) to redirect to the home page
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
//You can add your custom button
<button onClick={openLoginPage} className="button">
  Login
</button>;
```

[Check out function](https://github.com/devbathaniotpless/otpless-ionic-demo/blob/autoclick-demo/src/pages/Home.tsx#L13)

**Demo**
[Demo Video](demo_video.mp4)

# Thank You

# [Visit OTPless](https://otpless.com/platforms/ionic)
