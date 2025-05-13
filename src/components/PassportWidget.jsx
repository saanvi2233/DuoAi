import React, { useEffect } from 'react';

const PassportWidget = () => {
  useEffect(() => {
    // Ensure the Bedrock widget is available
    if (window.BedrockPassport) {
      window.BedrockPassport.init({
        baseUrl: 'https://api.bedrockpassport.com',
        tenantId: 'orange-v8l9vn8yln',
        subscriptionKey: 'e3460967e6ac4bdf9a172994bdea98ab',
        authCallbackUrl: 'http://localhost:3000/auth/callback'
      });
    }
  }, []);

  return <div id="bedrock-widget" />;
};

export default PassportWidget;
