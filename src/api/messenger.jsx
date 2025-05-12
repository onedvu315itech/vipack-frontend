import React, { useEffect } from 'react';

const MessengerChat = () => {
    useEffect(() => {
        const loadMessengerScript = () => {
            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            script.async = true;
            script.onload = () => {
                window.FB.init({
                    appId: '1120506806372568',
                    xfbml: true,
                    version: 'v14.0'
                });
            };
            document.body.appendChild(script);
        };

        loadMessengerScript();
    }, []);

    return (
        <div>
            <div
                className="fb-customerchat"
                attribution="setup_tool"
                page_id="410597275474446"
                theme_color="#0084ff"
                logged_in_greeting="Chào bạn! Chúng tôi có thể giúp gì cho bạn?"
                logged_out_greeting="Chào bạn! Hãy liên hệ với chúng tôi."
            ></div>
        </div>
    );
};

export default MessengerChat;