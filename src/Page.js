import React, { useState, useEffect, useRef } from 'react';

function Page({page, handleButtonJump}) {
    const [BGpath, setBGpath] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (page.bg) {
            setBGpath(`${process.env.PUBLIC_URL}/assets/images/bg/${page.bg}`); //Update the state with the new image if page.image exists
        }
    }, [page.bg]);

    useEffect(() => {
        if (page.sfx) {
            const sfxPath = `${process.env.PUBLIC_URL}/assets/audio/sfx/${page.sfx}`;
            // Create new audio instance
            const audio = new Audio(sfxPath);
            audio.volume = 0.5; // Adjust volume (0.0-1.0)
            
            audioRef.current = audio;
            
            audio.play().catch(error => {
                console.error('Audio playback failed:', error);
                // Handle browsers that require user interaction first
                document.addEventListener('click', () => audio.play(), { once: true });
            });
        }

        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [page.sfx]);

    const currentBGpath = page.bg ? `${process.env.PUBLIC_URL}/assets/images/bg/${page.bg}` : BGpath;

    return <div>
        {page.sfx && <audio />}
        <img className="bgIMG" src={currentBGpath} alt="Background" />
        <div className ="all-buttons">
            {Array.isArray(page.buttons) && page.buttons.map((item) => (
                <div className="button-wrapper">
                <img src={`${process.env.PUBLIC_URL}/assets/images/UI/Button.PNG`}className="button-background" alt=""/>
                <button key={item.id} onClick={() => handleButtonJump(item.jump)}>
                    {item.text}
                </button>
                </div>
            ))}
        </div>
        <div>
            {
            page.image &&
            <img className="fgIMG" src ={`${process.env.PUBLIC_URL}/assets/images/${page.image} `} onError={(e) => {
                console.error('Failed to load image:', e.target.src);
                e.target.style.display = 'none';
            }} />
            }
        </div>
        <div className="textbox-wrapper">
            <p className="text-container">{page.text}</p>
            {
                !page.class &&
                <img className="textboxIMG" src ={`${process.env.PUBLIC_URL}/assets/images/UI/textBox.PNG`} alt="Text Box" />
            }
        </div>
        
    </div>;
}

export default Page;