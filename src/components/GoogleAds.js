'use client';

import Script from 'next/script';

export default function GoogleAds({ GA_MEASUREMENT_ID }) {
    return (
        <>
            
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2421830929324855"
     crossorigin="anonymous"></script>
        </>
    );
}
